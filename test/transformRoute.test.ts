import transformRoute from '../src/transformRoute/transformRoute';

const routes = [
  {
    path: '/user',
    layout: false,
    menu: {
      name: 'overview',
      icon: 'testicon',
      flatMenu: false,
      hideInMenu: false,
      hideChildrenInMenu: false,
    },
    children: [
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
    indexRoute: {
      component: './Welcome',
    },
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
    indexRoute: { redirect: '/admin/sub-page2' },
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
  expect(breadcrumb.get('/admin')).toMatchSnapshot();
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
        routes: [
          {
            name: '人员管理',
            path: '/admin/userMng/users',
          },
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
            path: 'welcome3/:id?name=12121',
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

const flatMenu = [
  {
    exact: false,
    key: 'qixian',
    flatMenu: true, // 菜单中隐藏此项，子项往上提
    path: '/',
    routes: [
      {
        path:
          '_webapp' /** 添加重定向 参考：https://bigfish.antfin-inc.com/doc/deploy-assets */,
        redirect: '/',
      },
      { path: '/', redirect: '/dashboard/disaster-dashboard' }, // 首页跳转到「容灾数据大盘」
      { path: 'index', unaccessible: true, component: './Welcome' }, // 历史 hash 路由，跳转到新路由
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: 'dashboard',
        routes: [
          {
            name: '容灾数据大盘',
            path: 'disaster-dashboard',
            component: './Welcome',
          },
          {
            name: '全站演练大盘',
            path: 'drill-dashboard',
            component: './Welcome',
          },
        ],
      },
      {
        name: '容灾演练管理',
        path: '/dr-capacity',
        icon: 'global',
        routes: [
          // 老的容灾日历
          // {
          //   name: '容灾日历',
          //   path: 'drill-calendar',
          //   component: './DrCapacity/DrillCalendar',
          // },
          {
            name: '容灾日历',
            path: 'drill/calendar',
            component: './Welcome',
          },
          {
            name: '演练场景',
            path: 'drill',
            parentKeys: ['/dashboard'],
            component: './Welcome',
          },
          {
            path: 'drill/list',
            component: './Welcome',
          },
          {
            path: 'drill/edit',
            component: './Welcome',
            exact: true,
          },
          {
            path: 'drill/new',
            component: './Welcome',
            exact: true,
          },
          {
            path: 'drill/detail',
            component: './Welcome',
            exact: true,
          },
          {
            path: 'drill/:id',
            component: './Welcome',
            exact: true,
          },
          {
            path: 'drill/edit/:id',
            component: './Welcome',
            exact: true,
          },
          {
            name: '容灾恢复分析',
            path: 'analysis',
            component: './Welcome',
          },
          {
            path: 'analysis/:id',
            component: './Welcome',
          },
          // 老的演练场景
          {
            name: '演练场景(老)',
            path: 'drill-list',
            component: './Welcome',
          },
          {
            name: '采集指标',
            path: 'indicator-config-list',
            component: './Welcome',
          },
          {
            path: 'indicator-config/new',
            component: './Welcome',
          },
          {
            path: 'indicator-config/edit/:id',
            component: './Welcome',
          },
          {
            path: 'indicator-config/import',
            component: './Welcome',
          },
          {
            path: 'indicator-config/:id',
            component: './Welcome',
          },
          {
            path: 'indicator-config/history/:id',
            component: './Welcome',
          },
          {
            name: '采集记录',
            path: 'indicator-record-list',
            component: './Welcome',
          },
          {
            path: 'indicator-record/edit/:id',
            component: './Welcome',
          },
          {
            path: 'indicator-record/:id',
            component: './Welcome',
          },
          {
            name: '演练问题',
            path: 'issue-list',
            component: './Welcome',
          },
          {
            name: '演练 Action',
            menu: false,
            path: 'drill-action-list',
            component: './Welcome',
          },
          {
            path: 'drill-report/manage/:id',
            component: './Welcome',
          },
          {
            path: 'drill-report/display/:id',
            component: './Welcome',
          },
        ],
      },
      {
        // 其它路由情况, 用于兜底
        path: '/*',
        redirect: './Exception/404',
      },
    ],
  },
];

test('layout flatMenu', () => {
  const { menuData: userMenuData, breadcrumb } = transformRoute(
    flatMenu,
    false,
  );
  expect(userMenuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});

test('layout flatMenu', () => {
  // @ts-expect-error
  const { menuData: userMenuData, breadcrumb } = transformRoute({}, false);
  expect(userMenuData).toMatchSnapshot();
  expect(breadcrumb).toMatchSnapshot();
});
