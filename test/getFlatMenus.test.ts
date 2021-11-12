import getFlatMenus from '../src/getFlatMenus/getFlatMenus';
import transformRoute from '../src/transformRoute/transformRoute';

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
  if (id === 'menu.welcome') return '欢迎';
  return id;
});

describe('getFlatMenus', () => {
  it('normal', () => {
    const flatMenus = getFlatMenus(menuData);
    expect(Object.keys(flatMenus).length).toEqual(5);
    expect(flatMenus['/list'].name).toEqual('查询表格');
    expect(flatMenus).toMatchSnapshot();
  });

  it('no has ket', () => {
    const noHasKeyData = [
      {
        path: '/welcome',
        name: '欢迎',
        exact: true,
        unaccessible: false,
        locale: 'menu.welcome',
        key: '/welcome',
        pro_layout_parentKeys: [],
      },
      {
        path: '/welcome',
        name: '欢迎',
        key: '/admin/welcome',
        exact: true,
        unaccessible: false,
        locale: 'menu.welcome',
      },
      {
        path: '/admin',
        name: '管理页',
        access: 'canAdmin',
        locale: 'menu.admin',
        pro_layout_parentKeys: [],
      },
    ];
    const flatMenus = getFlatMenus(noHasKeyData);
    expect(Object.keys(flatMenus).length).toEqual(2);
  });
});
