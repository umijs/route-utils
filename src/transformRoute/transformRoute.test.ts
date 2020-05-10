import transformRoute from './transformRoute';

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
      },
    ],

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

const { menuData, breadcrumb } = transformRoute(routes, false, ({ id }) => {
  if (id === 'menu.list.table-list') return '查询表格';
  if (id === 'menu.admin') return '管理页';
  if (id === 'menu.admin.sub-page') return '二级管理页';
  if (id === 'menu.welcome') return '欢迎';
  return id;
});

test('normal', () => {
  expect(menuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});
