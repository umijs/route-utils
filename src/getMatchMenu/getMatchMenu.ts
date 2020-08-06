import { pathToRegexp } from '@qixian.cs/path-to-regexp';
import { MenuDataItem } from '../types';
import getFlatMenu from '../getFlatMenus/getFlatMenus';
import {
  isUrl,
  stripQueryStringAndHashFromPath,
} from '../transformRoute/transformRoute';

export const getMenuMatches = (
  flatMenuKeys: string[] = [],
  path: string,
): string | undefined =>
  flatMenuKeys
    .filter((item) => {
      if (item === '/' && path === '/') {
        return true;
      }
      if (item !== '/' && item !== '/*' && item && !isUrl(item)) {
        const pathKey = stripQueryStringAndHashFromPath(item);
        try {
          // /a
          if (pathToRegexp(`${pathKey}`, []).test(path)) {
            return true;
          }
          // /a/b/b
          if (pathToRegexp(`${pathKey}(.*)`).test(path)) {
            return true;
          }
        } catch (error) {
          // console.log(error, path);
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
  const menuPathKey = getMenuMatches(flatMenuKeys, pathname || '/');
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
