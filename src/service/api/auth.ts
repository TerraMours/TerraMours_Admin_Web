import { mockRequest,request } from '../request';

/**
 * 获取验证码
 * @param phone - 手机号
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchSmsCode(phone: string) {
  return mockRequest.post<boolean>('/getSmsCode', { phone });
  // return mockRequest.post<boolean>('/getSmsCode', { phone });
}

/**
 * 获取邮箱验证码
 * @param userEmail - 邮箱
 * @returns - 返回boolean值表示是否发送成功
 */
export function fetchEmailCode(userEmail: string) {
  return request.post<boolean>('/api/v1/Email/CreateCheckCode', { userEmail });
}

/**
 * 登录(登录接口)
 * @param UserAccount - 用户名
 * @param UserPassword - 密码
 */
export function fetchLogin(UserAccount: string, UserPassword: string) {
  return request.post<ApiAuth.Token>('/api/v1/Login/Login', { UserAccount, UserPassword });
  // return mockRequest.post<ApiAuth.Token>('/login', { userName, password });
}

/** 获取用户信息 */
export function fetchUserInfo() {
  return request.get<ApiAuth.UserInfo>('/api/v1/Login/GetUserInfo');
}

/**
 * 获取用户路由数据
 * @param userId - 用户id
 * @description 后端根据用户id查询到对应的角色类型，并将路由筛选出对应角色的路由数据返回前端
 */
export function fetchUserRoutes(userId: number) {
  return request.post<ApiRoute.Route>('/api/v1/Menu/GetUserRoutes', { userId });
}

/**
 * 刷新token
 * @param refreshToken
 */
export function fetchUpdateToken(refreshToken: string) {
  return mockRequest.post<ApiAuth.Token>('/updateToken', { refreshToken });
}

/**
 * 注册接口
 * @param userAccount - 登录账号
 * @param userPassword - 密码
 * @param repeatPassword - 密码确认
 * @param checkCode - 校验码
 * @returns 
 */
export function fetchRegister(userAccount: string,userPassword: string,repeatPassword: string,checkCode: string) {
  return request.post<string>('/api/v1/Login/Register', { userAccount, userPassword,repeatPassword,checkCode});
}

/**
 * 删除用户
 * @param userId 
 * @returns 
 */
export function fetchDelUser(userId: number){
  return request.post<boolean>('api/v1/User/DelUser',{userId});
}
/**
 * 更新用户信息
 * @param userId 
 * @param userName 
 * @param userEmail 
 * @param userPhoneNum 
 * @param gender 
 * @param enableLogin 
 * @returns 
 */
export function fetchUpdateUser(userId:number  | null,userName:string | null,userEmail:string | null,userPhoneNum:string | null,gender:string | null,enableLogin:boolean | null,roleId:number |null){
return request.post<boolean>('/api/v1/User/UpdateUser',{userId,userName,userEmail,userPhoneNum,gender,enableLogin,roleId});
}

/**
 * 新增用户信息
 * @param userId 
 * @param userName 
 * @param userEmail 
 * @param userPhoneNum 
 * @param gender 
 * @param enableLogin 
 * @returns 
 */
export function fetchAddUser(userName:string | null,userEmail:string | null,userPhoneNum:string | null,gender:string | null,enableLogin:boolean | null,roleId:number |null){
  return request.post<boolean>('/api/v1/User/AddUser',{userName,userEmail,userPhoneNum,gender,enableLogin,roleId});
  }

  /**
 * 删除角色
 * @param roleId 
 * @returns 
 */
export function fetchDelRole(roleId: number){
  return request.post<boolean>('api/v1/Role/DelRole',{roleId});
}
/**
 * 更新角色信息
 * @param roleId 
 * @param roleName 
 * @returns 
 */
export function fetchUpdateRole(roleId:number  | null,roleName:string | null){
return request.post<boolean>('/api/v1/Role/UpdateRole',{roleId,roleName});
}

/**
 * 新增角色信息
 * @param roleName 
 * @returns 
 */
export function fetchAddRole(roleName:string | null){
  return request.post<boolean>('/api/v1/Role/AddRole',{roleName});
}


  /**
 * 删除菜单
 * @param roleId 
 * @returns 
 */
  export function fetchDelMenu(roleId: number){
    return request.post<boolean>('api/v1/Menu/DelMenu',{roleId});
  }
  /**
   * 更新菜单信息
   * @param roleId 
   * @param roleName 
   * @returns 
   */
  export function fetchUpdateMenu(menuId:number | null,parentId:number | null,menuName:string |null,menuUrl: string|null,icon: string|null,description: string|null,isHome:boolean,externalUrl:boolean,isShow:boolean,remark:string|null,orderNo:number|null){
  return request.post<boolean>('/api/v1/Menu/UpdateMenu',{menuId,parentId,menuName,menuUrl,icon,description,isHome,externalUrl,isShow,remark,orderNo});
  }
  
  /**
   * 新增菜单信息
   * @param roleName 
   * @returns 
   */
  export function fetchAddMenu(parentId:number | null,menuName:string |null,menuUrl: string|null,icon: string|null,description: string|null,isHome:boolean,externalUrl:boolean,isShow:boolean,remark:string|null,orderNo:number|null){
    return request.post<boolean>('/api/v1/Menu/AddMenu',{parentId,menuName,menuUrl,icon,description,isHome,externalUrl,isShow,remark,orderNo});
  }
  /**
 * 角色匹配菜单
 * @param menuIds 
 * @returns 
 */
   export function fetchAddMenuToRole(roleId: number | null,menuIds: number[]){
    return request.post<boolean>('api/v1/Menu/AddMenuToRole',{roleId,menuIds});
  }

   /**
 * 角色下的菜单id
 * @param roleId 
 * @returns 
 */
   export function fetchGetRoleMenusIds(roleId: number | null){
    return request.post<number[]>('api/v1/Menu/GetRoleMenusIds',{roleId});
  }
 /**
  * 菜单下拉框
  * @param roleId 角色
  * @param menuId 当前菜单id（排除自己）
  * @returns 
  */
  export function fetchGetMenuSelect(roleId: number | null,menuId: number | null){
    return request.post<ApiCommon.KeyValue[]>('api/v1/Menu/GetMenuSelect',{roleId,menuId});
  }

 /**
  * 用户下拉框
  * @param roleId 角色
  * @param menuId 当前菜单id（排除自己）
  * @returns 
  */
 export function fetchGetRoleSelect(){
  return request.post<ApiCommon.KeyValue[]>('api/v1/Menu/GetRoleSelect');
}





