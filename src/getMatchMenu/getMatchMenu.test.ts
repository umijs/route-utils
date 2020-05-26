import getMatchMenu from './getMatchMenu';
import transformRoute from '../transformRoute/transformRoute';
import testMenuData from './test.menu';
import test_config_router2 from './test.config.router2';

const routes = [
  {
    path: '/welcome',
    name: 'welcome',
    exact: true,
    unaccessible: false,
  },
  {
    path: '/admin',
    name: 'admin',
    access: 'canAdmin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        exact: true,
        unaccessible: false,
        routes: [
          {
            path: '/admin/sub-page/list',
            name: 'sub-page-list',
            exact: true,
            unaccessible: false,
          },
        ],
      },
    ],
  },
  {
    name: 'list.table.result',
    path: '/list/:id',
    exact: true,
    unaccessible: false,
  },
  {
    name: 'list.table-list',
    path: '/list',
    exact: true,
    unaccessible: false,
  },
  { path: '/', redirect: '/welcome', exact: true, unaccessible: false },
];

const { menuData } = transformRoute(routes, true, ({ id }) => {
  if (id === 'menu.list.table-list') return '查询表格';
  if (id === 'menu.list.table.result') return '数据详情';
  if (id === 'menu.admin') return '管理页';
  if (id === 'menu.admin.sub-page') return '二级管理页';
  if (id === 'menu.admin.sub-page.sub-page-list') return '三级管理页';
  if (id === 'menu.welcome') return '欢迎';
  return id;
});

test('normal', () => {
  const openMenuItems = getMatchMenu('/admin/sub-page', menuData);
  expect(openMenuItems.length).toEqual(2);

  expect(openMenuItems[0].name).toEqual('管理页');
  expect(openMenuItems[1].name).toEqual('二级管理页');
  expect(openMenuItems).toMatchSnapshot();
});

test('three path', () => {
  const openMenuItems = getMatchMenu('/admin/sub-page/list', menuData);
  expect(openMenuItems.length).toEqual(3);

  expect(openMenuItems[0].name).toEqual('管理页');
  expect(openMenuItems[1].name).toEqual('二级管理页');
  expect(openMenuItems[2].name).toEqual('三级管理页');
  expect(openMenuItems).toMatchSnapshot();
});

test('var path', () => {
  const openMenuItems = getMatchMenu('/list/1234', menuData);
  expect(openMenuItems.length).toEqual(1);
  expect(openMenuItems[0].name).toEqual('数据详情');
  expect(openMenuItems).toMatchSnapshot();
});

test('test router', () => {
  const openMenuItems = getMatchMenu('/welcome/repertoryFw', testMenuData);
  expect(openMenuItems).toMatchSnapshot();
});

test('user path test', () => {
  const { menuData: userMenuData } = transformRoute(
    [
      {
        name: '人员组织管理',
        path: '/admin/userMng/',
        children: [
          { name: '人员管理', path: '/admin/userMng/users' },
          { name: '单位管理', path: '/admin/userMng/companies' },
        ],
      },
    ],
    false,
  );
  const openMenuItems = getMatchMenu('/admin/userMng/companies', userMenuData);
  expect(openMenuItems.length).toEqual(2);
  expect(openMenuItems).toMatchSnapshot();
});

test('test_config_router2', () => {
  const { menuData: userMenuData } = transformRoute(test_config_router2, false);
  const openMenuItems = getMatchMenu('/experienceScenario', userMenuData);
  expect(openMenuItems.length).toEqual(1);
  expect(openMenuItems).toMatchSnapshot();
});
