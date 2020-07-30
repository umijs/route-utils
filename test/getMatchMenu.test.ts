import getMatchMenu from '../src/getMatchMenu/getMatchMenu';
import transformRoute from '../src/transformRoute/transformRoute';
import testMenuData from './test.menu';

// @ts-ignore
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
  { path: '/', name: '/welcome', exact: true, unaccessible: false },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
const layout_Router_config: any = [
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
    path: 'flex?name=qixian',
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

test('test_layout_router', () => {
  const { menuData: userMenuData } = transformRoute(
    layout_Router_config,
    false,
  );
  const openMenuItems = getMatchMenu('/welcome/repertoryFw', userMenuData);
  expect(openMenuItems.length).toEqual(3);
  expect(openMenuItems).toMatchSnapshot();
});

const layoutConfig = [
  { path: '/', redirect: '/home', exact: true, unaccessible: false },
  {
    name: '首页',
    path: '/home',
    exact: true,
    unaccessible: false,
  },
  {
    name: '报告',
    path: '/navigation/reportlist',
    exact: true,
    unaccessible: false,
  },
  {
    path: '/reporting/:id',
    layout: { hideNav: true, hideMenu: true },
    exact: true,
    unaccessible: false,
  },
  {
    path: '/embed/reporting/:id',
    layout: { hideNav: true, hideMenu: true },
    exact: true,
    unaccessible: false,
  },
  {
    path: '/navigation/reporting',
    layout: { hideMenu: true, hideNav: true },
    exact: true,
    unaccessible: false,
  },
  {
    name: '数据表',
    path: '/navigation/datasheet',
    exact: true,
    unaccessible: false,
  },
  {
    path: '/navigation/datasheetdetails',
    exact: true,
    unaccessible: false,
  },
  {
    name: 'Toolbox',
    path: '/toolbox',
    routes: [
      {
        name: '生成Holo导入Query',
        path: '/toolbox/genHoloImportQuery',
        exact: true,
        unaccessible: false,
      },
    ],
    children: [
      {
        name: '生成Holo导入Query',
        path: '/toolbox/genHoloImportQuery',
        exact: true,
        unaccessible: false,
      },
    ],
    unaccessible: false,
  },
  { path: '/tech-ui-preview/:category/:id', unaccessible: false },
  {
    // 其它路由情况, 用于兜底
    path: '/*',
    redirect: './Exception/404',
  },
];

test('test layout config', () => {
  const { menuData: userMenuData } = transformRoute(
    layoutConfig || [],
    undefined,
    undefined,
    true,
  );
  let openMenuItems = getMatchMenu('/navigation/reporting', userMenuData);
  let layout = openMenuItems?.pop()?.layout || {};
  expect(layout.hideNav).toEqual(true);

  openMenuItems = getMatchMenu('/reporting/2144', userMenuData);
  layout = openMenuItems?.pop()?.layout || {};
  expect(layout.hideMenu).toEqual(true);
  expect(openMenuItems).toMatchSnapshot();
});

test('test yfd layout config', () => {
  const openMenuItems = getMatchMenu('/bkmng/authority/my', [
    {
      path: '/',
      redirect: '/bkmng/authority/my',
      exact: true,
      unaccessible: false,
      locale: false,
      key: '/710c8209d70454012a0cacef5e4c67ef9c6f40ed7b56311cd60545bd50437341',
      routes: null,
      pro_layout_parentKeys: [],
    },
    {
      path: '/bkmng/authority',
      name: '我的权限',
      routes: null,
      children: [
        {
          path: '/bkmng/authority/my',
          name: '权限列表',
          routes: null,
          unaccessible: false,
          locale: 'menu.我的权限.权限列表',
          key: '/yfd/bkmng/authority/my',
          exact: true,
          pro_layout_parentKeys: ['/yfd/bkmng/authority'],
        },
        {
          path: '/bkmng/authority/apply',
          name: '申请权限',
          routes: null,
          unaccessible: false,
          locale: 'menu.我的权限.申请权限',
          key: '/yfd/bkmng/authority/apply',
          exact: true,
          pro_layout_parentKeys: ['/yfd/bkmng/authority'],
        },
      ],
      unaccessible: false,
      locale: 'menu.我的权限',
      key: '/yfd/bkmng/authority',
      pro_layout_parentKeys: [],
    },
    {
      path: '/bkmng',
      yunfengdieApp: '21704052',
      exact: false,
      unaccessible: false,
      locale: false,
      key: '/bkmng',
      routes: null,
      pro_layout_parentKeys: [],
    },
  ]);
  expect(openMenuItems.length).toBe(2);
  expect(openMenuItems[0].path).toBe('/bkmng/authority');
  expect(openMenuItems[1].path).toBe('/bkmng/authority/my');
  expect(openMenuItems).toMatchSnapshot();
});

const morseMenu: any[] = [
  {
    path: '/project/:projectId/strategy',
    redirect: '/project/:projectId/strategy/dataset',
    exact: true,
    locale: false,
    key: '/project/:projectId/strategy',
    routes: null,
    pro_layout_parentKeys: [],
  },
  {
    path: '/project/:projectId/strategy/virtualDataSet/new',
    hasLayout: true,
    hideInMenu: true,
    name: '数据准备',
    exact: true,
    locale: 'menu.数据准备',
    key: '/project/:projectId/strategy/virtualDataSet/new',
    routes: null,
    pro_layout_parentKeys: [],
  },
  {
    path: '/project/:projectId/strategy/virtualFuse/sampleset',
    name: '实验数据',
    hasLayout: true,
    hideInMenu: true,
    exact: true,
    locale: 'menu.实验数据',
    key: '/project/:projectId/strategy/virtualFuse/sampleset',
    routes: null,
    pro_layout_parentKeys: [],
  },
  {
    path: '/project/:projectId/strategy/sampleset/:samplesetId',
    name: '实验数据',
    hideInMenu: true,
    hasLayout: true,
    hideBreadcrumb: true,
    exact: true,
    locale: 'menu.实验数据',
    key: '/project/:projectId/strategy/sampleset/:samplesetId',
    routes: null,
    pro_layout_parentKeys: [],
  },
  {
    path: '/project/:projectId/strategy/sampleset/:samplesetId/filter',
    name: '实验数据',
    hideInMenu: true,
    hasLayout: true,
    hideBreadcrumb: true,
    exact: true,
    locale: 'menu.实验数据',
    key: '/project/:projectId/strategy/sampleset/:samplesetId/filter',
    routes: null,
    pro_layout_parentKeys: [],
  },
  {
    path: '/project/:projectId/strategy/data',
    name: '实验区',
    routes: null,
    children: [
      {
        path: '/project/:projectId/strategy/data',
        routes: null,
        locale: false,
        key: '/project/:projectId/strategy/data',
        redirect: '/project/:projectId/strategy/data/dataset',
        exact: true,
        pro_layout_parentKeys: ['/project/:projectId/strategy/data'],
      },
      {
        path: '/project/:projectId/strategy/data/dataset',
        name: '数据准备',
        routes: null,
        locale: 'menu.实验区.数据准备',
        key: '/project/:projectId/strategy/data/dataset',
        hasLayout: true,
        isListPage: true,
        component: { displayName: 'LoadableComponent' },
        exact: true,
        pro_layout_parentKeys: ['/project/:projectId/strategy/data'],
      },
      {
        path: '/project/:projectId/strategy/data/virtualDataSet/:sampleId',
        name: '数据准备详情',
        routes: null,
        locale: 'menu.实验区.数据准备详情',
        key: '/project/:projectId/strategy/data/virtualDataSet/:sampleId',
        component: { displayName: 'LoadableComponent' },
        hideInMenu: true,
        hasLayout: true,
        exact: true,
        pro_layout_parentKeys: ['/project/:projectId/strategy/data'],
      },
      {
        path: '/project/:projectId/strategy/data/sampleset',
        name: '实验数据集',
        routes: null,
        locale: 'menu.实验区.实验数据集',
        key: '/project/:projectId/strategy/data/sampleset',
        hasLayout: true,
        isListPage: true,
        component: { displayName: 'LoadableComponent' },
        exact: true,
        pro_layout_parentKeys: ['/project/:projectId/strategy/data'],
      },
    ],
    locale: 'menu.实验区',
    key: '/project/:projectId/strategy/data',
    pro_layout_parentKeys: [],
  },
  {
    path: '/project/:projectId/strategy',
    name: '生产配置区',
    hideBreadcrumb: true,
    routes: null,
    children: [
      {
        path: '/project/:projectId/strategy/dataset',
        name: '策略数据源',
        hideBreadcrumb: true,
        routes: null,
        locale: 'menu.生产配置区.策略数据源',
        key: '/project/:projectId/strategy/dataset',
        hasLayout: true,
        isListPage: true,
        hideChildrenInMenu: true,
        children: [
          {
            path: '/project/:projectId/strategy/dataset',
            hideBreadcrumb: true,
            routes: null,
            locale: false,
            key: '/project/:projectId/strategy/dataset',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            redirect: '/project/:projectId/strategy/dataset/list',
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/dataset',
            ],
          },
          {
            path: '/project/:projectId/strategy/dataset/list',
            name: '策略数据源',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略数据源.策略数据源',
            key: '/project/:projectId/strategy/dataset/list',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/dataset',
            ],
          },
          {
            path: '/project/:projectId/strategy/dataset/:sampleId',
            name: '策略数据源详情',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略数据源.策略数据源详情',
            key: '/project/:projectId/strategy/dataset/:sampleId',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/dataset',
            ],
          },
        ],
        pro_layout_parentKeys: ['/project/:projectId/strategy/'],
      },
      {
        path: '/project/:projectId/strategy/vars',
        name: '变量中心',
        hideBreadcrumb: true,
        routes: null,
        locale: 'menu.生产配置区.变量中心',
        key: '/project/:projectId/strategy/vars',
        hasLayout: true,
        isListPage: true,
        hideChildrenInMenu: true,
        children: [
          {
            path: '/project/:projectId/strategy/vars',
            hideBreadcrumb: true,
            routes: null,
            locale: false,
            key: '/project/:projectId/strategy/vars',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            redirect: '/project/:projectId/strategy/vars/list',
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/vars',
            ],
          },
          {
            path: '/project/:projectId/strategy/vars/list',
            name: '变量中心',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.变量中心.变量中心',
            key: '/project/:projectId/strategy/vars/list',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/vars',
            ],
          },
          {
            path: '/project/:projectId/strategy/vars/:id',
            name: '变量中心详情',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.变量中心.变量中心详情',
            key: '/project/:projectId/strategy/vars/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/vars',
            ],
          },
        ],
        pro_layout_parentKeys: ['/project/:projectId/strategy/'],
      },
      {
        path: '/project/:projectId/strategy/manger',
        name: '策略管理',
        hideBreadcrumb: true,
        routes: null,
        locale: 'menu.生产配置区.策略管理',
        key: '/project/:projectId/strategy/manger',
        hasLayout: true,
        isListPage: true,
        hideChildrenInMenu: true,
        children: [
          {
            path: '/project/:projectId/strategy/manger',
            hideBreadcrumb: true,
            routes: null,
            locale: false,
            key: '/project/:projectId/strategy/manger',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            redirect: '/project/:projectId/strategy/manger/list',
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/manger',
            ],
          },
          {
            path: '/project/:projectId/strategy/manger/list',
            name: '策略管理',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略管理.策略管理',
            key: '/project/:projectId/strategy/manger/list',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/manger',
            ],
          },
          {
            path: '/project/:projectId/strategy/manger/new',
            name: '新建策略管理',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略管理.新建策略管理',
            key: '/project/:projectId/strategy/manger/new',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/manger',
            ],
          },
          {
            path: '/project/:projectId/strategy/manger/edit/:id/:version',
            name: '修改策略管理',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略管理.修改策略管理',
            key: '/project/:projectId/strategy/manger/edit/:id/:version',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/manger',
            ],
          },
          {
            path: '/project/:projectId/strategy/manger/:id/:version',
            name: '策略管理详情',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略管理.策略管理详情',
            key: '/project/:projectId/strategy/manger/:id/:version',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/manger',
            ],
          },
          {
            path: '/project/:projectId/strategy/manger/:id',
            name: '修改策略管理',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略管理.修改策略管理',
            key: '/project/:projectId/strategy/manger/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/manger',
            ],
          },
        ],
        pro_layout_parentKeys: ['/project/:projectId/strategy/'],
      },
      {
        path: '/project/:projectId/strategy/rule',
        name: '规则集管理',
        hideBreadcrumb: true,
        routes: null,
        locale: 'menu.生产配置区.规则集管理',
        key: '/project/:projectId/strategy/rule',
        hasLayout: true,
        isListPage: true,
        hideChildrenInMenu: true,
        children: [
          {
            path: '/project/:projectId/strategy/rule',
            hideBreadcrumb: true,
            routes: null,
            locale: false,
            key: '/project/:projectId/strategy/rule',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            redirect: '/project/:projectId/strategy/rule/list',
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/rule',
            ],
          },
          {
            path: '/project/:projectId/strategy/rule/list',
            name: '规则集管理',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.规则集管理.规则集管理',
            key: '/project/:projectId/strategy/rule/list',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/rule',
            ],
          },
          {
            path: '/project/:projectId/strategy/rule/new',
            name: '新建规则集',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.规则集管理.新建规则集',
            key: '/project/:projectId/strategy/rule/new',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/rule',
            ],
          },
          {
            path: '/project/:projectId/strategy/rule/edit/:id',
            name: '编辑规则集',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.规则集管理.编辑规则集',
            key: '/project/:projectId/strategy/rule/edit/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            component: { displayName: 'LoadableComponent' },
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/rule',
            ],
          },
          {
            path: '/project/:projectId/strategy/rule/:id',
            name: '规则集管理详情',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.规则集管理.规则集管理详情',
            key: '/project/:projectId/strategy/rule/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/rule',
            ],
          },
        ],
        pro_layout_parentKeys: ['/project/:projectId/strategy/'],
      },
      {
        path: '/project/:projectId/strategy/simulation',
        name: '策略仿真',
        hideBreadcrumb: true,
        routes: null,
        locale: 'menu.生产配置区.策略仿真',
        key: '/project/:projectId/strategy/simulation',
        hasLayout: true,
        isListPage: true,
        hideChildrenInMenu: true,
        children: [
          {
            path: '/project/:projectId/strategy/simulation',
            hideBreadcrumb: true,
            routes: null,
            locale: false,
            key: '/project/:projectId/strategy/simulation',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            redirect: '/project/:projectId/strategy/simulation/list',
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/simulation',
            ],
          },
          {
            path: '/project/:projectId/strategy/simulation/list',
            name: '策略仿真',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略仿真.策略仿真',
            key: '/project/:projectId/strategy/simulation/list',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/simulation',
            ],
          },
          {
            path: '/project/:projectId/strategy/simulation/new',
            name: '新建策略仿真',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略仿真.新建策略仿真',
            key: '/project/:projectId/strategy/simulation/new',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/simulation',
            ],
          },
          {
            path: '/project/:projectId/strategy/simulation/edit/:id',
            name: '编辑策略仿真',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略仿真.编辑策略仿真',
            key: '/project/:projectId/strategy/simulation/edit/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/simulation',
            ],
          },
          {
            path: '/project/:projectId/strategy/simulation/:id',
            name: '策略仿真详情',
            hideBreadcrumb: true,
            routes: null,
            locale: 'menu.生产配置区.策略仿真.策略仿真详情',
            key: '/project/:projectId/strategy/simulation/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/simulation',
            ],
          },
          {
            path: '/project/:projectId/strategy/simulation/report/:id',
            name: '数据详情',
            hideBreadcrumb: true,
            routes: null,
            key: '/project/:projectId/strategy/simulation/report/:id',
            hasLayout: true,
            isListPage: true,
            hideChildrenInMenu: true,
            hideInMenu: true,
            exact: true,
            pro_layout_parentKeys: [
              '/project/:projectId/strategy/',
              '/project/:projectId/strategy/simulation',
            ],
          },
        ],
        pro_layout_parentKeys: ['/project/:projectId/strategy/'],
      },
    ],
    locale: 'menu.生产配置区',
    key: '/project/:projectId/strategy/',
    pro_layout_parentKeys: ['a', 'a', 'a'],
  },
];

test('test morse layout config', () => {
  const openMenuItems = getMatchMenu(
    '/project/p_202007131935192683/strategy/data/virtualDataSet/sample_202007131937303220',
    morseMenu,
  );
  expect(openMenuItems.length).toBe(2);
  expect(openMenuItems[0].path).toBe('/project/:projectId/strategy/data');
  expect(openMenuItems[1].path).toBe(
    '/project/:projectId/strategy/data/virtualDataSet/:sampleId',
  );
  expect(openMenuItems).toMatchSnapshot();
});

test('test empty menu', () => {
  const openMenuItems = getMatchMenu(
    '/project/p_202007131935192683/strategy/data/virtualDataSet/sample_202007131937303220',
    [],
  );
  expect(openMenuItems).toMatchSnapshot();
});

test('test pro_layout_parentKeys menu', () => {
  const openMenuItems = getMatchMenu('/', [
    {
      locale: 'menu.生产配置区',
      key: '/project/:projectId/strategy/',
    },
    {
      locale: 'menu',
      key: '/',
      pro_layout_parentKeys: ['a', 'a', 'a'],
    },
  ]);
  expect(openMenuItems).toMatchSnapshot();
});
