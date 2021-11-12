import { MenuDataItem } from '../types';
import { stripQueryStringAndHashFromPath } from '../transformRoute/transformRoute';

/**
 * 获取打平的 menuData
 * 已 path 为 key
 * @param menuData
 */
export const getFlatMenus = (
  menuData: MenuDataItem[] = [],
): {
  [key: string]: MenuDataItem;
} => {
  let menus: {
    [key: string]: MenuDataItem;
  } = {};
  menuData.forEach((item) => {
    if (!item || !item.key) {
      return;
    }

    menus[stripQueryStringAndHashFromPath(item.path || item.key || '/')] = {
      ...item,
    };
    menus[item.key || item.path || '/'] = { ...item };

    if (item.routes) {
      menus = { ...menus, ...getFlatMenus(item.routes) };
    }
  });
  return menus;
};

export default getFlatMenus;
