const list = [
  {
    path: '/home',
    component: './Home',
    menuKey: 'home',
    parentKey: '',
  },
  {
    path: '/manageSite',
    component: './platformConfig/ManageSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  {
    path: '/manageSite/addSite',
    component: './platformConfig/AddSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  {
    path: '/manageSite/updateSite/:id',
    component: './platformConfig/UpdateSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  {
    path: '/manageSite/viewSite/:id',
    component: './platformConfig/UpdateSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  /**
   * 金融云站点租户
   */
  {
    path: '/siteTenant',
    component: './platformConfig/SiteTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },
  {
    path: '/siteTenant/addTenant',
    component: './platformConfig/AddTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },
  {
    path: '/siteTenant/updateTenant/:id',
    component: './platformConfig/AddTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },
  {
    path: '/siteTenant/viewTenant/:id',
    component: './platformConfig/AddTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },

  /**
   * 安全工程师信息
   */
  {
    path: '/engineer',
    component: './platformConfig/EngineerInfo',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'engineer',
    parentKey: 'platformConfig',
  },
  /**
   * 密码技术团队人员信息
   */
  {
    path: '/team',
    component: './platformConfig/TeamMembers',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'team',
    parentKey: 'platformConfig',
  },
  /**
   * 业务安全目标
   */

  {
    path: '/securityGoals',
    component: './platformConfig/SecurityGoals',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'securityGoals',
    parentKey: 'platformConfig',
  },
  {
    path: '/securityGoals/add',
    component: './platformConfig/AddSecurityGoals',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'securityGoals',
    parentKey: 'platformConfig',
  },
  {
    path: '/securityGoals/update/:id',
    component: './platformConfig/AddSecurityGoals',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'securityGoals',
    parentKey: 'platformConfig',
  },

  /**
   * 密钥算法
   */

  {
    path: '/algorithm',
    component: './platformConfig/Algorithm',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'algorithm',
    parentKey: 'platformConfig',
  },
  {
    path: '/algorithm/add',
    component: './platformConfig/AddAlgorithm',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'algorithm',
    parentKey: 'platformConfig',
  },
  {
    path: '/algorithm/update/:id',
    component: './platformConfig/AddAlgorithm',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'algorithm',
    parentKey: 'platformConfig',
  },
  /**
   * 平台配置
   */
  {
    path: '/createKey',
    component: './keyMangement/CreateKey',
    permission: 'KM_WORKFLOW',
    menuKey: 'createKey',
    parentKey: 'keyMangement',
  },
  {
    path: '/useTheExistingKey',
    component: './keyMangement/CreateKey',
    permission: 'KM_WORKFLOW',
    menuKey: 'useTheExistingKey',
    parentKey: 'keyMangement',
  },
  {
    path: '/queryPublicKeyContent',
    component: './keyMangement/QueryKeyContent',
    permission: 'KM_WORKFLOW',
    menuKey: 'queryPublicKeyContent',
    parentKey: 'keyMangement',
  },
  {
    path: '/queryKeyContent',
    component: './keyMangement/QueryKeyContent',
    permission: 'KM_WORKFLOW',
    menuKey: 'queryKeyContent',
    parentKey: 'keyMangement',
  },
  {
    path: '/queryKeyAttr',
    component: './keyMangement/QueryKeyAttr',
    permission: 'KM_WORKFLOW',
    menuKey: 'queryKeyAttr',
    parentKey: 'keyMangement',
  },
  {
    path: '/updateKeyAttr',
    component: './keyMangement/QueryKeyAttr',
    permission: 'KM_WORKFLOW',
    menuKey: 'updateKeyAttr',
    parentKey: 'keyMangement',
  },
  /**
   * 密码服务场景接入
   */
  {
    path: '/sceneAccess',
    component: './scene/SceneAccess',
    permission: 'KM_WORKFLOW',
    menuKey: 'sceneAccess',
    parentKey: 'scene',
  },

  /**
   * 小工具
   */
  {
    path: '/kmiTool',
    component: './keyMangement/KmiTool',
    permission: 'KM_WORKFLOW',
    menuKey: 'kmiTool',
    parentKey: 'tool',
  },
  {
    path: '/smallTool',
    component: './keyMangement/SmallTool',
    permission: 'KM_WORKFLOW',
    menuKey: 'smallTool',
    parentKey: 'tool',
  },
  /**
   * 我的需求单
   */
  {
    path: '/myDemandList',
    component: './demand/MyDemandList',
    permission: 'KM_WORKFLOW',
    menuKey: 'myDemandList',
    parentKey: 'demand',
  },
  {
    path: '/myDemandList/demandDetail/:id',
    component: './demand/DemandDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'myDemandList',
    parentKey: 'demand',
  },
  {
    path: '/temporaryDemand',
    component: './demand/TemporaryDemand',
    permission: 'KM_WORKFLOW',
    menuKey: 'temporaryDemand',
    parentKey: 'demand',
  },
  {
    path: '/temporaryDemand/detail/:id',
    component: './demand/TemporaryDemandDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'temporaryDemand',
    parentKey: 'demand',
  },
  /**
   * 我的审批
   */
  {
    path: '/myApproval',
    component: './approval/MyApproval',
    permission: 'KM_WORKFLOW',
    menuKey: 'myApproval',
    parentKey: 'approval',
  },
  {
    path: '/myApproval/approvalDetail/:id',
    component: './approval/ApprovalDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'myApproval',
    parentKey: 'approval',
  },
  {
    path: '/haveBeenApproval',
    component: './approval/MyApproval',
    permission: 'KM_WORKFLOW',
    menuKey: 'haveBeenApproval',
    parentKey: 'approval',
  },
  {
    path: '/haveBeenApproval/detail/:id',
    component: './approval/ApprovalDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'haveBeenApproval',
    parentKey: 'approval',
  },
  {
    path: '/claimed',
    component: './approval/DemandClaimed',
    permission: 'KM_WORKFLOW',
    menuKey: 'claimed',
    parentKey: 'approval',
  },
  {
    path: '/claimed/detail/:id',
    component: './approval/ApprovalDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'claimed',
    parentKey: 'approval',
  },
  {
    path: '/keyManageOfManager',
    component: './keyManageOfManager/KeyManageOfManager',
    permission: 'KM_ADMIN',
    menuKey: 'keyManageOfManager',
  },
  {
    path: '/keyManageOfManager/detail/:id',
    component: './demand/DemandDetail',
    menuKey: 'keyManageOfManager',
    parentKey: '',
  },
  /**
   * secretmng
   */
  {
    path: '/secretmng/commission/secretList',
    component: './secretmng/secretList',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'secretList',
    parentKey: 'subMenu_manage',
  },
  {
    path: '/secretmng/commission/manualAddSecret',
    component: './secretmng/manualAddSecret',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'manualAddSecret',
    parentKey: 'subMenu_manage',
  },
  {
    path: '/secretmng/commission/createTask',
    component: './secretmng/createTask',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'createTask',
    parentKey: 'subMenu_manage',
  },
  {
    path: '/secretmng/commission/componentBls',
    component: './secretmng/componentBls',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'componentBls',
    parentKey: 'subMenu_manage',
  },
  {
    path: '/secretmng/rotation/taskList',
    component: './secretmng/taskList',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'taskList',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/alterPloyManagement',
    component: './secretmng/alterPloyManagement',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'alterPloyManagement',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/alterPloyManagement/createAlterPloy',
    component: './secretmng/alterPloyManagement/components/createAlterPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'createAlterPloy',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/alterPloyManagement/editAlterPloy',
    component: './secretmng/alterPloyManagement/components/createAlterPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'editAlterPloy',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/mailPloyManagement',
    component: './secretmng/mailPloyManagement',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'mailPloyManagement',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/mailPloyManagement/createMailPloy',
    component: './secretmng/mailPloyManagement/components/createMailPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'createMailPloy',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/mailPloyManagement/editMailPloy',
    component: './secretmng/mailPloyManagement/components/createMailPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'editMailPloy',
    parentKey: 'subMenu_rotate',
  },
  {
    path: '/secretmng/rotation/blackList',
    component: './secretmng/blackList',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'blackList',
    parentKey: 'subMenu_rotate',
  },
];

export const routeList = list;
export default {
  path: '/',
  component: '../layout',
  indexRoute: { component: './Home' },
  childRoutes: list,
};
