import type { TreeOption } from 'naive-ui';

export function adapterOfFetchUserList(data: ApiUserManagement.User[] | null): UserManagement.User[] {
  if (!data) return [];

  return data.map((item, index) => {
    const user: UserManagement.User = {
      index: index + 1,
      key: item.userId,
      ...item
    };

    return user;
  });
}
/**
 * 角色
 * @param data
 * @returns
 */
export function adapterOfFetchRoleList(data: ApiUserManagement.Role[] | null): UserManagement.Role[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: UserManagement.Role = {
      index: index + 1,
      key: item.roleId,
      ...item
    };

    return role;
  });
}

/**
 * 菜单
 * @param data
 * @returns
 */
export function adapterOfFetchMenuList(data: ApiUserManagement.Menu[] | null): UserManagement.Menu[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: UserManagement.Menu = {
      index: index + 1,
      key: item.menuId,
      ...item
    };

    return role;
  });
}

/**
 * 菜单树
 * @param data
 * @returns
 */
export function adapterOfFetchMenuTree(data: ApiUserManagement.Menu[] | null): TreeOption[] {
  if (!data) return [];

  return data.map(item => {
    const role: TreeOption = {
      key: item.menuId,
      label: item.menuName ?? '',
      children: adapterOfFetchMenuTree(item.children ?? [])
    };

    return role;
  });
}

/**
 * 敏感词
 * @param data
 * @returns
 */
export function adapterOfFetchSensitiveList(data: ApiGptManagement.Sensitive[] | null): GptManagement.Sensitive[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: GptManagement.Sensitive = {
      index: index + 1,
      key: item.sensitiveId,
      ...item
    };

    return role;
  });
}

/**
 * 聊天记录
 * @param data
 * @returns
 */
export function adapterOfFetchChatList(data: ApiGptManagement.Chat[] | null): GptManagement.Chat[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: GptManagement.Chat = {
      index: index + 1,
      key: item.chatRecordId,
      ...item
    };

    return role;
  });
}

/**
 * 聊天记录
 * @param data
 * @returns
 */
export function adapterOfFetchPageChatList(
  data: ApiGptManagement.PageData<ApiGptManagement.Chat> | null
): ApiGptManagement.PageData<GptManagement.Chat> | null {
  if (!data) return null;
  const items = data.items.map((item, index) => {
    const role: GptManagement.Chat = {
      index: index + 1,
      key: item.chatRecordId,
      ...item
    };

    return role;
  });
  const PageData: ApiGptManagement.PageData<GptManagement.Chat> = {
    items,
    page: data.page,
    pageSize: data.pageSize,
    total: undefined
  };
  return PageData;
}

/**
 * key池 管理
 * @param data
 * @returns
 */
export function adapterOfFetchKeyOptionList(data: ApiGptManagement.KeyOption[] | null): GptManagement.KeyOption[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: GptManagement.KeyOption = {
      index: index + 1,
      key: item.keyId,
      ...item
    };

    return role;
  });
}

/**
 * 系统提示词
 * @param data
 * @returns
 */
export function adapterOfFetchPromptOptionList(
  data: ApiGptManagement.PromptOption[] | null
): GptManagement.PromptOption[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: GptManagement.PromptOption = {
      index: index + 1,
      key: item.promptId,
      ...item
    };

    return role;
  });
}
