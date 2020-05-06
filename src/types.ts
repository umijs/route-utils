export interface Route extends MenuDataItem {
  routes?: Route[];
}

export interface MessageDescriptor {
  id: any;
  description?: string;
  defaultMessage?: string;
}

export interface MenuDataItem {
  children?: MenuDataItem[];
  hideChildrenInMenu?: boolean;
  hideInMenu?: boolean;
  icon?: React.ReactNode;
  locale?: string | false;
  name?: string;
  key?: string;
  parentKeys?: string[];
  path?: string;
  [key: string]: any;
}
