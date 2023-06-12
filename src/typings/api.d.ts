// 后端接口返回的数据类型

/** 后端返回的用户权益相关类型 */
declare namespace ApiAuth {
  /** 返回的token和刷新token */
  interface Token {
    token: string;
    refreshToken: string;
  }
  /** 返回的用户信息 */
  type UserInfo = Auth.UserInfo;
}

/** 后端返回的路由相关类型 */
declare namespace ApiRoute {
  /** 后端返回的路由数据类型 */
  interface Route {
    /** 动态路由 */
    routes: AuthRoute.Route[];
    /** 路由首页对应的key */
    home: AuthRoute.AllRouteKey;
  }
}
declare namespace ApiCommon {
  interface KeyValue {
    key: number | string;
    value: string;
  }
}

declare namespace ApiUserManagement {
  interface User {
    /** 用户id */
    userId: number;
    /** 用户名 */
    userName: string | null;
    /** 用户年龄 */
    age: number | null;
    /**
     * 用户性别
     * - 0: 女
     * - 1: 男
     */
    gender: '0' | '1' | null;
    /** 用户手机号码 */
    userPhoneNum: string | null;
    /** 用户邮箱 */
    userEmail: string | null;
    /**
     * 用户状态
     * - 1: 启用
     * - 2: 禁用
     * - 3: 冻结
     * - 4: 软删除
     */
    userStatus: '1' | '2' | '3' | '4' | null;
    /**
     * 是否能登陆
     * - true: 启用
     * - false: 禁用
     */
    enableLogin: boolean;
    /** 角色id */
    roleId: number;
  }
  interface Role {
    /** 角色id */
    roleId: number;
    /** 角色名称 */
    roleName: string | null;
    /** 创建时间 */
    createDate: Date | null;
    /** 更新时间 */
    modifyDate: Date | null;
  }
  interface Menu {
    /** 菜单id */
    menuId: number;
    /** 菜单父级id */
    parentId: number | null;
    /** 菜单名称 */
    menuName: string | null;
    /** 菜单url地址 */
    menuUrl: string | null;
    /** 菜单图标 */
    icon: string | null;
    /** 菜单描述or说明 */
    description: string | null;
    /** 是否是首页 */
    isHome: boolean;
    /** 是否是外链链接，默认是false，默认是内部系统地址 */
    externalUrl: boolean;
    /** 是否可见，默认true */
    isShow: boolean;
    /** 备注 */
    remark: string | null;
    /** 排序 */
    orderNo: number;
    /** 子节点 */
    children: Menu[] | null;
    /** 是否勾选 */
    isChecked: boolean | null;
  }
}
