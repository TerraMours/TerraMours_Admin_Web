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
