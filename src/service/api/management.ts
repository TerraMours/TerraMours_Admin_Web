import { adapter } from '@/utils';
import { request } from '../request';
import {
  adapterOfFetchUserList,
  adapterOfFetchRoleList,
  adapterOfFetchMenuList,
  adapterOfFetchMenuTree,
  adapterOfFetchPageSensitiveList,
  adapterOfFetchPageChatList,
  adapterOfFetchPageKeyOptionList,
  adapterOfFetchPagePromptOptionList,
  adapterAllCategoryList,
  adapterAllProductList,
  adapterOfFetchPageAllImageList,
  adapterOfFetchPageOrderList
} from './management.adapter';

/** 获取用户列表 */
export const fetchUserList = async () => {
  const data = await request.get<ApiUserManagement.User[] | null>('/api/v1/User/GetAllUserList');
  return adapter(adapterOfFetchUserList, data);
};

/** 获取角色列表 */
export const fetchRoleList = async () => {
  const data = await request.get<ApiUserManagement.Role[] | null>('/api/v1/Role/GetAllRoleList');
  return adapter(adapterOfFetchRoleList, data);
};

/** 获取菜单列表 */
export const fetchMenuList = async () => {
  const data = await request.get<ApiUserManagement.Menu[] | null>('/api/v1/Menu/GetAllMenuList');
  return adapter(adapterOfFetchMenuList, data);
};

/** 获取菜单列表 */
export const fetchMenuTreeList = async (roleId: number | null) => {
  const data = await request.post<ApiUserManagement.Menu[] | null>('/api/v1/Menu/GetMenuTree', { roleId });
  return adapter(adapterOfFetchMenuTree, data);
};

/** 获取敏感词列表 */
export const fetchSensitiveList = async (
  queryString: string | null,
  pageIndex: number | undefined,
  pageSize: number | undefined
) => {
  const data = await request.post<ApiGptManagement.PageData<ApiGptManagement.Sensitive> | null>(
    '/api/v1/Chat/SensitiveList',
    {
      queryString,
      pageIndex,
      pageSize
    }
  );
  return adapter(adapterOfFetchPageSensitiveList, data);
};

/** 获取聊天记录列表 */
export const fetchChatList = async (
  queryString: string | null,
  pageIndex: number | undefined,
  pageSize: number | undefined
) => {
  const data = await request.post<ApiGptManagement.PageData<ApiGptManagement.Chat> | null>(
    '/api/v1/Chat/ChatRecordList',
    { queryString, pageIndex, pageSize }
  );
  return adapter(adapterOfFetchPageChatList, data);
};
/** 获取聊天记录列表 */
export const fetchAllImageList = async (
  queryString: string | null,
  pageIndex: number | undefined,
  pageSize: number | undefined
) => {
  const data = await request.post<ApiGptManagement.PageData<ApiGptManagement.Image> | null>(
    '/api/v1/Image/AllImageList',
    { queryString, pageIndex, pageSize }
  );
  return adapter(adapterOfFetchPageAllImageList, data);
};

/** 获取key池 管理列表 */
export const fetchKeyOptionList = async (
  queryString: string | null,
  pageIndex: number | undefined,
  pageSize: number | undefined
) => {
  const data = await request.post<ApiGptManagement.PageData<ApiGptManagement.KeyOption> | null>(
    '/api/v1/Chat/KeyOptionsList',
    {
      queryString,
      pageIndex,
      pageSize
    }
  );
  return adapter(adapterOfFetchPageKeyOptionList, data);
};

/** 获取系统提示词列表 */
export const fetchPromptOptionList = async (
  queryString: string | null,
  pageIndex: number | undefined,
  pageSize: number | undefined
) => {
  const data = await request.post<ApiGptManagement.PageData<ApiGptManagement.PromptOption> | null>(
    '/api/v1/Chat/PromptOptionList',
    {
      queryString,
      pageIndex,
      pageSize
    }
  );
  return adapter(adapterOfFetchPagePromptOptionList, data);
};

/** 查询所有商品分类信息 */
export const fetchAllCategoryList = async () => {
  const data = await request.get<ApiPayManagement.Category[] | null>('/api/v1/Category/GetAllCategoryList');
  return adapter(adapterAllCategoryList, data);
};

/** 查询所有商品信息 */
export const fetchAllProductList = async () => {
  const data = await request.get<ApiPayManagement.Product[] | null>('/api/v1/Product/GetAllProductList');
  return adapter(adapterAllProductList, data);
};

/** 获取聊天记录列表 */
export const fetchOrderList = async (
  queryString: string | null,
  pageIndex: number | undefined,
  pageSize: number | undefined
) => {
  const data = await request.post<ApiGptManagement.PageData<ApiPayManagement.Order> | null>(
    '/api/v1/AliPay/OrderList',
    { queryString, pageIndex, pageSize }
  );
  return adapter(adapterOfFetchPageOrderList, data);
};

/** 数量统计 */
export const fetchTotalAnalysis = async (dateType: number | null, startTime: string | null, endTime: string | null) => {
  const data = await request.post<ApiAnalysisManagement.TotalAnalysis[] | null>('/api/v1/Analysis/TotalAnalysis', {
    dateType,
    startTime,
    endTime
  });
  return data;
};
