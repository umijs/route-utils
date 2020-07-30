import isEqual from 'lodash.isequal';
import memoizeOne from 'memoize-one';
import hash from 'hash.js';
import { pathToRegexp } from '@qixian.cs/path-to-regexp';

import { MenuDataItem, Route, MessageDescriptor } from '../types';

function stripQueryStringAndHashFromPath(url: string) {
  return url.split('?')[0].split('#')[0];
}

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const getKeyByPath = (item: MenuDataItem) => {
  const { path } = item;
  if (path && path !== '/') {
    return path;
  }
  // 如果还是没有，用对象的hash 生成一个
  try {
    return `/${hash.sha256().update(JSON.stringify(item)).digest('hex')}`;
  } catch (error) {
    // dom some thing
  }
};

/**
 * 获取locale，增加了一个功能，如果 locale = false，将不使用国际化
 * @param item
 * @param parentName
 */
const getItemLocaleName = (
  item: MenuDataItem,
  parentName: string,
): string | false => {
  const { name, locale } = item;

  // 如果配置了 locale 并且 locale 为 false或 ""
  if (('locale' in item && locale === false) || !name) {
    return false;
  }
  return item.locale || `${parentName}.${name}`;
};

interface FormatterProps {
  data: MenuDataItem[];
  locale?: boolean;
  formatMessage?: (data: { id: string; defaultMessage?: string }) => string;
  parentName?: string;
  [key: string]: any;
}

/**
 * 如果不是 / 开头的和父节点做一下合并
 * 如果是 / 开头的不作任何处理
 * 如果是 url 也直接返回
 * @param path
 * @param parentPath
 */
const mergePath = (path: string = '', parentPath: string = '/') => {
  if ((path || parentPath).startsWith('/')) {
    return path;
  }
  if (isUrl(path)) {
    return path;
  }
  return `/${parentPath}/${path}`.replace(/\/\//g, '/').replace(/\/\//g, '/');
};

// bigfish 的兼容准话
const bigfishCompatibleConversions = (
  route: MenuDataItem,
  props: FormatterProps,
) => {
  const { menu = {}, indexRoute, path = '', children } = route;
  const {
    name = route.name,
    icon = route.icon,
    hideChildren = route.hideChildren,
    flatMenu = route.flatMenu,
  } = menu as Route; // 兼容平铺式写法
  // 拼接 childrenRoutes, 处理存在 indexRoute 时的逻辑
  const childrenRoutes =
    indexRoute &&
    // 如果只有 redirect,不用处理的
    Object.keys(indexRoute).join(',') !== 'redirect'
      ? [
          {
            path,
            menu,
            ...indexRoute,
          },
        ].concat(children || [])
      : children;

  // 拼接返回的 menu 数据
  const result = {
    ...route,
  } as MenuDataItem;
  if (name) {
    result.name = name;
  }
  if (icon) {
    result.icon = icon;
  }

  if (childrenRoutes && childrenRoutes.length) {
    /** 在菜单中隐藏子项 */
    if (hideChildren) {
      delete result.children;
      return result;
    }

    // 需要重新进行一次
    const routers = formatter(
      {
        ...props,
        data: childrenRoutes,
      },
      route,
    );

    /** 在菜单中只隐藏此项，子项往上提，仍旧展示 */
    if (flatMenu) {
      return routers;
    }

    result.children = routers;
  }

  return result;
};

/**
 *
 * @param props
 * @param parent
 */
function formatter(
  props: FormatterProps,
  parent: Partial<MenuDataItem> = { path: '/' },
): MenuDataItem[] {
  const { data, formatMessage, parentName, locale: menuLocale } = props;
  if (!data || !Array.isArray(data)) {
    return [];
  }
  return data
    .filter((item) => {
      if (!item) return false;
      if (item.routes || item.children) return true;
      if (item.path) return true;
      if (item.layout) return true;
      // 重定向
      if (item.redirect) return false;
      return false;
    })
    .filter((item) => {
      // 是否没有权限查看
      // 这样就不会显示，是一个兼容性的方式
      if (item.unaccessible) {
        delete item.name;
      }
      if (item?.menu?.name || item?.flatMenu || item?.menu?.flatMenu) {
        return true;
      }

      // 显示指定在 menu 中隐藏该项
      // layout 插件的功能，其实不应该存在的
      if (item.menu === false) {
        return false;
      }
      return true;
    })
    .map((item = { path: '/' }) => {
      const path = stripQueryStringAndHashFromPath(
        mergePath(item.path, parent ? parent.path : '/'),
      );
      const { name } = item;
      const locale = getItemLocaleName(item, parentName || 'menu');

      // if enableMenuLocale use item.name,
      // close menu international
      const localeName =
        locale !== false && menuLocale !== false && formatMessage && locale
          ? formatMessage({ id: locale, defaultMessage: name })
          : name;
      const {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        pro_layout_parentKeys = [],
        children,
        icon,
        flatMenu,
        indexRoute,
        ...restParent
      } = parent;

      const finallyItem: MenuDataItem = {
        ...restParent,
        ...item,
        path,

        locale,
        key: item.key || getKeyByPath({ ...item, path }),
        routes: null,
        pro_layout_parentKeys: Array.from(
          new Set([
            ...(item.parentKeys || []),
            ...pro_layout_parentKeys,
            `/${parent.key || ''}`.replace(/\/\//g, '/').replace(/\/\//g, '/'),
          ]),
        ).filter((key) => key && key !== '/'),
      };

      if (localeName) {
        finallyItem.name = localeName;
      } else {
        delete finallyItem.name;
      }
      if (item.routes || item.children) {
        const formatterChildren = formatter(
          {
            ...props,
            data: item.routes || item.children,
            parentName: locale || '',
          },
          finallyItem,
        );
        // Reduce memory usage
        finallyItem.children =
          formatterChildren && formatterChildren.length > 0
            ? formatterChildren
            : undefined;

        if (!finallyItem.children) {
          delete finallyItem.children;
        }
      }
      return bigfishCompatibleConversions(finallyItem, props);
    })
    .flat(1);
}

const memoizeOneFormatter = memoizeOne(formatter, isEqual);

/**
 * 删除 hideInMenu 和 item.name 不存在的
 */
const defaultFilterMenuData = (menuData: MenuDataItem[] = []): MenuDataItem[] =>
  menuData
    .filter(
      (item: MenuDataItem) =>
        item &&
        (item.name || item.children) &&
        !item.hideInMenu &&
        !item.redirect,
    )
    .map((item: MenuDataItem) => {
      if (
        item.children &&
        Array.isArray(item.children) &&
        !item.hideChildrenInMenu &&
        item.children.some((child: MenuDataItem) => child && !!child.name)
      ) {
        const children = defaultFilterMenuData(item.children);
        if (children.length) return { ...item, children };
      }
      return { ...item, children: undefined };
    })
    .filter((item) => item);

/**
 * support pathToRegexp get string
 */
class RoutesMap<V> extends Map<string, V> {
  get(pathname: string) {
    let routeValue;
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of this.entries()) {
      if (
        !isUrl(key as string) &&
        pathToRegexp(key as any, []).test(pathname as any)
      ) {
        routeValue = value;
        break;
      }
    }
    return routeValue;
  }
}
/**
 * 获取面包屑映射
 * @param MenuDataItem[] menuData 菜单配置
 */
const getBreadcrumbNameMap = (
  menuData: MenuDataItem[],
): RoutesMap<MenuDataItem> => {
  // Map is used to ensure the order of keys
  const routerMap = new RoutesMap<MenuDataItem>();
  const flattenMenuData = (data: MenuDataItem[], parent?: MenuDataItem) => {
    data.forEach((menuItem) => {
      if (menuItem && menuItem.children) {
        flattenMenuData(menuItem.children, menuItem);
      }
      // Reduce memory usage
      const path = mergePath(menuItem.path, parent ? parent.path : '/');
      routerMap.set(path, menuItem);
    });
  };
  flattenMenuData(menuData);
  return routerMap;
};

const memoizeOneGetBreadcrumbNameMap = memoizeOne(
  getBreadcrumbNameMap,
  isEqual,
);

const clearChildren = (menuData: MenuDataItem[] = []): MenuDataItem[] => {
  return menuData
    .map((item: MenuDataItem) => {
      if (
        item.children &&
        Array.isArray(item.children) &&
        item.children.length > 0
      ) {
        const children = clearChildren(item.children);
        if (children.length) return { ...item, children };
      }

      const finallyItem = { ...item };
      delete finallyItem.children;
      return finallyItem;
    })
    .filter((item) => item);
};

/**
 * @param routes 路由配置
 * @param locale 是否使用国际化
 * @param formatMessage 国际化的程序
 * @param ignoreFilter 是否筛选掉不展示的 menuItem 项，plugin-layout需要所有项目来计算布局样式
 * @returns { breadcrumb, menuData}
 */
const transformRoute = (
  routes: Route[],
  locale?: boolean,
  formatMessage?: (message: MessageDescriptor) => string,
  ignoreFilter?: boolean,
): {
  breadcrumb: Map<string, MenuDataItem>;
  menuData: MenuDataItem[];
} => {
  const originalMenuData = memoizeOneFormatter({
    data: routes,
    formatMessage,
    locale,
  });
  const menuData = ignoreFilter
    ? clearChildren(originalMenuData)
    : defaultFilterMenuData(originalMenuData);
  // Map type used for internal logic
  const breadcrumb = memoizeOneGetBreadcrumbNameMap(originalMenuData);

  return { breadcrumb, menuData };
};

export default transformRoute;
