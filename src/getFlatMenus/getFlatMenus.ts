import type { MenuDataItem } from '../types';
import {
  childrenPropsName,
  stripQueryStringAndHashFromPath,
} from '../transformRoute/transformRoute';

/**
 * 获取打平的 menuData
 * 以 path 为 key
 * @param menuData
 */
export const getFlatMenus = (
  menuData: MenuDataItem[] = [],
): Record<string, MenuDataItem> => {
  let menus: Record<string, MenuDataItem> = {};
  menuData.forEach((item) => {
    if (!item || !item.key) {
      return;
    }
    const routerChildren = item.children || item[childrenPropsName];
    menus[stripQueryStringAndHashFromPath(item.path || item.key || '/')] = {
      ...item,
    };
    menus[item.key || item.path || '/'] = { ...item };

    if (routerChildren) {
      menus = { ...menus, ...getFlatMenus(routerChildren) };
    }
  });
  return menus;
};

export default getFlatMenus;
