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
export function adapterOfFetchPageSensitiveList(
  data: ApiGptManagement.PageData<ApiGptManagement.Sensitive> | null
): ApiGptManagement.PageData<GptManagement.Sensitive> | null {
  if (!data) return null;
  const items = data.items.map((item, index) => {
    const role: GptManagement.Sensitive = {
      index: index + 1,
      key: item.sensitiveId,
      ...item
    };

    return role;
  });
  const PageData: ApiGptManagement.PageData<GptManagement.Sensitive> = {
    items,
    page: data.page,
    pageSize: data.pageSize,
    total: undefined
  };
  return PageData;
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
export function adapterOfFetchPageKeyOptionList(
  data: ApiGptManagement.PageData<ApiGptManagement.KeyOption> | null
): ApiGptManagement.PageData<GptManagement.KeyOption> | null {
  if (!data) return null;
  const items = data.items.map((item, index) => {
    const role: GptManagement.KeyOption = {
      index: index + 1,
      key: item.keyId,
      ...item
    };

    return role;
  });
  const PageData: ApiGptManagement.PageData<GptManagement.KeyOption> = {
    items,
    page: data.page,
    pageSize: data.pageSize,
    total: undefined
  };
  return PageData;
}

/**
 * 系统提示词
 * @param data
 * @returns
 */
export function adapterOfFetchPagePromptOptionList(
  data: ApiGptManagement.PageData<ApiGptManagement.PromptOption> | null
): ApiGptManagement.PageData<GptManagement.PromptOption> | null {
  if (!data) return null;
  const items = data.items.map((item, index) => {
    const role: GptManagement.PromptOption = {
      index: index + 1,
      key: item.promptId,
      ...item
    };

    return role;
  });
  const PageData: ApiGptManagement.PageData<GptManagement.PromptOption> = {
    items,
    page: data.page,
    pageSize: data.pageSize,
    total: undefined
  };
  return PageData;
}

/**
 * 商品分类
 * @param data
 * @returns
 */
export function adapterAllCategoryList(data: ApiPayManagement.Category[] | null): PayManagement.Category[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: PayManagement.Category = {
      index: index + 1,
      key: item.id,
      ...item
    };

    return role;
  });
}

/**
 * 商品
 * @param data
 * @returns
 */
export function adapterAllProductList(data: ApiPayManagement.Product[] | null): PayManagement.Product[] {
  if (!data) return [];

  return data.map((item, index) => {
    const role: PayManagement.Product = {
      index: index + 1,
      key: item.id,
      ...item
    };

    return role;
  });
}
