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
    routes: [],
    children: [],
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

// eslint-disable-next-line @typescript-eslint/naming-convention
const layout_Router_config: any = [
  {
    path: '/',
    component: '../layouts/BasicLayout',
    routes: [
      {
        path: 'https://github.com/ant-design/ant-design-pro-layout/issues',
        name: 'site',
        icon: 'smile',
        locale: false,
        target: '_blank',
        component: './Welcome',
      },
      {
        name: 'flex 布局测试',
        icon: 'smile',
        path: 'flex',
        component: './FlexDemo',
      },
      {
        name: '分析页',
        icon: 'smile',
        path: '/dashboardanalysis',
        component: './DashboardAnalysisTwo',
      },
      {
        name: '个人设置',
        icon: 'smile',
        path: '/accountsettings',
        component: './AccountSettings',
      },
      {
        name: '高级表单',
        icon: 'smile',
        path: 'formadvancedform',
        component: './FormAdvancedForm',
      },

      {
        path: 'single',
        name: 'Single',
        routes: [
          {
            path: 'welcome',
            name: 'two',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: 'welcome2',
            name: 'two2',
            icon: 'smile',
            component: './Welcome',
          },
          {
            path: 'welcome3/:id?',
            name: 'two3',
            hideInMenu: true,
            icon: 'smile',
            component: './Welcome',
          },
        ],
      },
      {
        path: '/',
        name: 'welcome',
        icon: 'smile',
        routes: [
          {
            path: '/',
            redirect: '/welcome',
          },
          {
            path: '/welcome',
            redirect: '/welcome/welcome',
          },
          {
            path: 'welcome',
            name: 'one',
            component: './Welcome',
            routes: [
              {
                path: 'repertoryFw',
                name: 'two',
                icon: 'smile',
                component: './Welcome',
              },
              {
                path: 'repertory',
                name: 'two2',
                icon: 'smile',
                component: './Welcome',
              },
            ],
          },
        ],
      },
    ],
  },
];

test('layout Router config with "/"', () => {
  const { menuData: userMenuData, breadcrumb } = transformRoute(
    layout_Router_config,
    false,
  );
  expect(userMenuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});
