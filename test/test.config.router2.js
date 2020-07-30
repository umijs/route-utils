const list = [
  {
    path: '/home',
    name: 'name',
    component: './Home',
    menuKey: 'home',
    parentKey: '',
  },
  {
    path: '/manageSite',
    name: 'name',
    component: './platformConfig/ManageSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  {
    path: '/manageSite/addSite',
    name: 'name',
    component: './platformConfig/AddSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  {
    path: '/manageSite/updateSite/:id',
    name: 'name',
    component: './platformConfig/UpdateSite',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'manageSite',
    parentKey: 'platformConfig',
  },
  {
    path: '/manageSite/viewSite/:id',
    name: 'name',
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
    name: 'name',
    component: './platformConfig/SiteTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },
  {
    path: '/siteTenant/addTenant',
    name: 'name',
    component: './platformConfig/AddTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },
  {
    path: '/siteTenant/updateTenant/:id',
    name: 'name',
    component: './platformConfig/AddTenant',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'siteTenant',
    parentKey: 'platformConfig',
  },
  {
    path: '/siteTenant/viewTenant/:id',
    name: 'name',
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
    name: 'name',
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
    name: 'name',
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
    name: 'name',
    component: './platformConfig/SecurityGoals',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'securityGoals',
    parentKey: 'platformConfig',
  },
  {
    path: '/securityGoals/add',
    name: 'name',
    component: './platformConfig/AddSecurityGoals',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'securityGoals',
    parentKey: 'platformConfig',
  },
  {
    path: '/securityGoals/update/:id',
    name: 'name',
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
    name: 'name',
    component: './platformConfig/Algorithm',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'algorithm',
    parentKey: 'platformConfig',
  },
  {
    path: '/algorithm/add',
    name: 'name',
    component: './platformConfig/AddAlgorithm',
    permission: 'KM_PLAT_ADMIN',
    menuKey: 'algorithm',
    parentKey: 'platformConfig',
  },
  {
    path: '/algorithm/update/:id',
    name: 'name',
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
    name: 'name',
    component: './keyMangement/CreateKey',
    permission: 'KM_WORKFLOW',
    menuKey: 'createKey',
    parentKey: 'keyMangement',
  },
  {
    path: '/useTheExistingKey',
    name: 'name',
    component: './keyMangement/CreateKey',
    permission: 'KM_WORKFLOW',
    menuKey: 'useTheExistingKey',
    parentKey: 'keyMangement',
  },
  {
    path: '/queryPublicKeyContent',
    name: 'name',
    component: './keyMangement/QueryKeyContent',
    permission: 'KM_WORKFLOW',
    menuKey: 'queryPublicKeyContent',
    parentKey: 'keyMangement',
  },
  {
    path: '/queryKeyContent',
    name: 'name',
    component: './keyMangement/QueryKeyContent',
    permission: 'KM_WORKFLOW',
    menuKey: 'queryKeyContent',
    parentKey: 'keyMangement',
  },
  {
    path: '/queryKeyAttr',
    name: 'name',
    component: './keyMangement/QueryKeyAttr',
    permission: 'KM_WORKFLOW',
    menuKey: 'queryKeyAttr',
    parentKey: 'keyMangement',
  },
  {
    path: '/updateKeyAttr',
    name: 'name',
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
    name: 'name',
    component: './scene/SceneAccess',
    permission: 'KM_WORKFLOW',
    menuKey: 'sceneAccess',
    parentKey: 'scene',
  },

  /**
   * 创建场景
   */
  {
    path: '/haveCreateScene',
    name: 'name',
    component: './scene/HaveCreateScene',
    permission: 'KM_WORKFLOW',
    menuKey: 'haveCreateScene',
    parentKey: 'scene',
  },
  {
    path: '/removeCreateScene',
    name: 'name',
    component: './scene/RemoveCreateScene',
    permission: 'KM_WORKFLOW',
    menuKey: 'removeCreateScene',
    parentKey: 'scene',
  },

  /**
   * 小工具
   */
  {
    path: '/kmiTool',
    name: 'name',
    component: './keyMangement/KmiTool',
    permission: 'KM_WORKFLOW',
    menuKey: 'kmiTool',
    parentKey: 'tool',
  },
  {
    path: '/smallTool',
    name: 'name',
    component: './keyMangement/SmallTool',
    permission: 'KM_WORKFLOW',
    menuKey: 'smallTool',
    parentKey: 'tool',
  },
  {
    path: '/experienceKmiScenario',
    name: 'name',
    component: './keyMangement/ExperienceKmiScenario',
    permission: 'KM_WORKFLOW',
    menuKey: 'experienceKmiScenario',
    parentKey: 'tool',
  },
  {
    path: '/experienceScenario',
    name: 'name',
    component: './keyMangement/ExperienceScenario',
    permission: 'KM_WORKFLOW',
    menuKey: 'experienceScenario',
    parentKey: 'tool',
  },
  /**
   * 我的需求单
   */
  {
    path: '/myDemandList',
    name: 'name',
    component: './demand/MyDemandList',
    permission: 'KM_WORKFLOW',
    menuKey: 'myDemandList',
    parentKey: 'demand',
  },
  {
    path: '/myDemandList/demandDetail/:id',
    name: 'name',
    component: './demand/DemandDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'myDemandList',
    parentKey: 'demand',
  },
  {
    path: '/temporaryDemand',
    name: 'name',
    component: './demand/TemporaryDemand',
    permission: 'KM_WORKFLOW',
    menuKey: 'temporaryDemand',
    parentKey: 'demand',
  },
  {
    path: '/temporaryDemand/detail/:id',
    name: 'name',
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
    name: 'name',
    component: './approval/MyApproval',
    permission: 'KM_WORKFLOW',
    menuKey: 'myApproval',
    parentKey: 'approval',
  },
  {
    path: '/myApproval/approvalDetail/:id',
    name: 'name',
    component: './approval/ApprovalDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'myApproval',
    parentKey: 'approval',
  },
  {
    path: '/haveBeenApproval',
    name: 'name',
    component: './approval/MyApproval',
    permission: 'KM_WORKFLOW',
    menuKey: 'haveBeenApproval',
    parentKey: 'approval',
  },
  {
    path: '/haveBeenApproval/detail/:id',
    name: 'name',
    component: './approval/ApprovalDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'haveBeenApproval',
    parentKey: 'approval',
  },
  {
    path: '/claimed',
    name: 'name',
    component: './approval/DemandClaimed',
    permission: 'KM_WORKFLOW',
    menuKey: 'claimed',
    parentKey: 'approval',
  },
  {
    path: '/claimed/detail/:id',
    name: 'name',
    component: './approval/ApprovalDetail',
    permission: 'KM_WORKFLOW',
    menuKey: 'claimed',
    parentKey: 'approval',
  },
  {
    path: '/keyManageOfManager',
    name: 'name',
    component: './keyManageOfManager/KeyManageOfManager',
    permission: 'KM_ADMIN',
    menuKey: 'keyManageOfManager',
  },
  {
    path: '/keyManageOfManager/detail/:id',
    name: 'name',
    component: './demand/DemandDetail',
    menuKey: 'keyManageOfManager',
    parentKey: '',
  },
  /**
   * secretmng
   */
  {
    path: '/secretmng/secretList',
    name: 'name',
    component: './secretmng/secretList',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'secretList',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/taskList',
    name: 'name',
    component: './secretmng/taskList',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'taskList',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/createTask',
    name: 'name',
    component: './secretmng/createTask',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'createTask',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/alterPloyManagement',
    name: 'name',
    component: './secretmng/alterPloyManagement',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'alterPloyManagement',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/alterPloyManagement/createAlterPloy',
    name: 'name',
    component: './secretmng/alterPloyManagement/components/createAlterPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'createAlterPloy',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/alterPloyManagement/editAlterPloy',
    name: 'name',
    component: './secretmng/alterPloyManagement/components/createAlterPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'editAlterPloy',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/mailPloyManagement',
    name: 'name',
    component: './secretmng/mailPloyManagement',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'mailPloyManagement',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/mailPloyManagement/createMailPloy',
    name: 'name',
    component: './secretmng/mailPloyManagement/components/createMailPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'createMailPloy',
    parentKey: 'secretmng',
  },
  {
    path: '/secretmng/mailPloyManagement/editMailPloy',
    name: 'name',
    component: './secretmng/mailPloyManagement/components/createMailPloy',
    permission: 'KM_SECRET_ADMIN',
    menuKey: 'editMailPloy',
    parentKey: 'secretmng',
  },
];

export default list;
