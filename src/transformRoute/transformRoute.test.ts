import transformRoute from './transformRoute';

const routes = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        layout: false,
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    menu: { hideChildren: true },
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    path: '/admin2',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    component: './Admin',
    hideInMenu: true,
    routes: [
      {
        path: '/admin/sub-page2',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
    ],
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/',
    name: 'home',
    component: './ListTableList',
  },
  {
    component: './404',
  },
];

test('normal', () => {
  const { menuData, breadcrumb } = transformRoute(routes, true, ({ id }) => {
    if (id === 'menu.list.table-list') return '查询表格';
    if (id === 'menu.admin') return '管理页';
    if (id === 'menu.admin.sub-page') return '二级管理页';
    if (id === 'menu.welcome') return '欢迎';
    return id;
  });
  expect(menuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});

test('normal ignoreFilter', () => {
  const { menuData, breadcrumb } = transformRoute(
    routes,
    true,
    ({ id }) => {
      if (id === 'menu.list.table-list') return '查询表格';
      if (id === 'menu.admin') return '管理页';
      if (id === 'menu.admin.sub-page') return '二级管理页';
      if (id === 'menu.welcome') return '欢迎';
      return id;
    },
    true,
  );
  expect(menuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});

test('disable locale', () => {
  const { menuData, breadcrumb } = transformRoute(
    routes,
    false,
    ({ id }) => {
      if (id === 'menu.list.table-list') return '查询表格';
      if (id === 'menu.admin') return '管理页';
      if (id === 'menu.admin.sub-page') return '二级管理页';
      if (id === 'menu.welcome') return '欢迎';
      return id;
    },
    true,
  );
  expect(menuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});

test('do not start with "/"', () => {
  const { menuData: userMenuData, breadcrumb } = transformRoute(
    [
      {
        name: '人员组织管理',
        path: 'admin/userMng/',
        children: [
          { name: '人员管理', path: '/admin/userMng/users' },
          { name: '单位管理', path: '/admin/userMng/companies' },
        ],
      },
    ],
    false,
  );
  expect(userMenuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});
