import { pathToRegexp } from '@qixian.cs/path-to-regexp';
import { MenuDataItem } from '../types';
import getFlatMenu from '../getFlatMenus/getFlatMenus';
import { isUrl } from '../transformRoute/transformRoute';

/**
 * a-b-c
 * [
 *  "a",
 *  "a-b",
 *  "a-b-c"
 * ]
 * @param menuKey
 */
export const genKeysToArray = (menuKey: string) => {
  const keys = menuKey.split('-');
  const keyArray: string[] = [];
  keys.forEach((key, index) => {
    if (index === 0) {
      keyArray.push(key);
      return;
    }
    keyArray.push(keys.slice(0, index + 1).join('-'));
  });
  return keyArray;
};

export const getMenuMatches = (
  flatMenuKeys: string[] = [],
  path: string,
  flatMenus: {
    [key: string]: MenuDataItem;
  },
): string | undefined =>
  flatMenuKeys
    .filter((item) => {
      // 如果配置了 hideInMenu 就不需要选中了
      if (flatMenus[item].hideInMenu) {
        return false;
      }
      if (item === '/' && path === '/') {
        return true;
      }
      if (item !== '/' && item !== '/*' && item && !isUrl(item)) {
        try {
          // /a
          if (pathToRegexp(`${item}`, []).test(path)) {
            return true;
          }
          // /a/b/b
          if (pathToRegexp(`${item}(.*)`).test(path)) {
            return true;
          }
        } catch (error) {
          console.log(error, path);
        }
      }
      return false;
    })
    .sort((a, b) => {
      // 如果完全匹配放到最后面
      if (a === path) {
        return 10;
      }
      if (b === path) {
        return -10;
      }
      return a.substr(1).split('/').length - b.substr(1).split('/').length;
    })
    .pop();

/**
 * 获取当前的选中菜单列表
 * @param pathname
 * @param menuData
 * @returns MenuDataItem[]
 */
export const getMatchMenu = (
  pathname: string,
  menuData: MenuDataItem[],
): MenuDataItem[] => {
  const flatMenus = getFlatMenu(menuData);
  const flatMenuKeys = Object.keys(flatMenus);
  const menuPathKey = getMenuMatches(flatMenuKeys, pathname || '/', flatMenus);
  if (!menuPathKey) {
    return [];
  }
  const menuItem = flatMenus[menuPathKey] || {
    pro_layout_parentKeys: '',
    key: '',
  };

  // 去重
  const map = new Map();
  const parentItems = (menuItem.pro_layout_parentKeys || [])
    .map((key) => {
      if (map.has(key)) {
        return null;
      }
      map.set(key, true);
      return flatMenus[key];
    })
    .filter((item) => item) as MenuDataItem[];
  if (menuItem.key) {
    parentItems.push(menuItem);
  }
  return parentItems;
};

export default getMatchMenu;
