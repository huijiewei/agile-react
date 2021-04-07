import { AdminGroup } from '@admin/services/useAdminGroup';
import { Box, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { AdminGroupPermission, useAdminGroupPermissions } from '@admin/services/useMisc';
import { useCallback, useEffect, useRef } from 'react';
import { StringOrNumber } from '@shared/utils/types';

type AdminGroupPermissionCheckGroup = {
  name: string;
  checkAll: boolean;
  checkIndeterminate: boolean;
  checkedPermissions: string[];
  permissionsCount: number;
  children?: AdminGroupPermission[];
};

const AdminGroupFrom = ({ adminGroup }: { adminGroup: AdminGroup }) => {
  const permissions = useRef<AdminGroupPermissionCheckGroup[]>([]);
  const checkboxDisabled = useRef<string[]>([]);

  const { data } = useAdminGroupPermissions();

  const disableCombinesCheckbox = (item: AdminGroupPermission) => {
    if (!item.combines || item.combines.length === 0) {
      return;
    }

    item.combines.map((combine) => {
      if (!checkboxDisabled.current.includes(combine)) {
        checkboxDisabled.current.push(combine);
      }
    });
  };

  const onAllChange = (group: AdminGroupPermissionCheckGroup) => {
    group.checkIndeterminate = false;

    if (group.checkAll) {
      group.children?.map((child) => {
        if (child.children) {
          child.children.forEach((item) => {
            group.checkedPermissions.push(item.actionId);
          });
        } else {
          group.checkedPermissions.push(child.actionId);
        }
      });
    } else {
      group.checkedPermissions = [];
    }
  };

  const onGroupChange = (group: AdminGroupPermissionCheckGroup, event: StringOrNumber[]) => {
    const checkedCount = event.length;

    group.checkAll = group.permissionsCount === checkedCount;
    group.checkIndeterminate = checkedCount > 0 && checkedCount < group.permissionsCount;
  };

  const onItemChange = (event: any) => {
    console.log(event);
  };

  const isPermissionChecked = useCallback(
    (actionId: string) => {
      return adminGroup.permissions?.includes(actionId);
    },
    [adminGroup]
  );

  useEffect(() => {
    const groupPermissions: AdminGroupPermissionCheckGroup[] = [];

    console.log(data);

    data?.map((permission) => {
      const group: AdminGroupPermissionCheckGroup = {
        name: permission.name,
        checkAll: false,
        checkIndeterminate: false,
        checkedPermissions: [],
        permissionsCount: 0,
        children: permission.children,
      };

      permission.children?.map((child) => {
        if (child.children) {
          child.children.forEach((item) => {
            group.permissionsCount++;

            if (isPermissionChecked(item.actionId)) {
              group.checkedPermissions.push(item.actionId);

              disableCombinesCheckbox(item);
            }
          });
        } else {
          group.permissionsCount++;

          if (isPermissionChecked(child.actionId)) {
            group.checkedPermissions.push(child.actionId);

            disableCombinesCheckbox(child);
          }
        }
      });

      const checkedCount = group.checkedPermissions.length;

      group.checkAll = group.permissionsCount === checkedCount;
      group.checkIndeterminate = checkedCount > 0 && checkedCount < group.permissionsCount;

      groupPermissions.push(group);
    });

    permissions.current = groupPermissions;
  }, [data, isPermissionChecked]);

  return (
    <Stack as="form" spacing={4}>
      <FormControl>
        <FormLabel>名称</FormLabel>
        <Input name={'name'} defaultValue={adminGroup.name} />
      </FormControl>
      <FormControl>
        <FormLabel>权限</FormLabel>
        <Stack spacing={2}>
          {permissions.current.map((group, groupIdx) => (
            <Box key={'gp-' + groupIdx}>
              <Box
                sx={{ backgroundColor: 'gray.50', color: 'gray.500', fontWeight: 'medium', paddingX: 5, paddingY: 2 }}
              >
                <Checkbox
                  onChange={() => onAllChange(group)}
                  isIndeterminate={group.checkIndeterminate}
                  isChecked={group.checkAll}
                >
                  {group.name}
                </Checkbox>
              </Box>
              <Box sx={{ paddingX: 5, paddingY: 2 }}>
                <CheckboxGroup onChange={(e) => onGroupChange(group, e)} defaultValue={group.checkedPermissions}>
                  {group.children &&
                    group.children.map((item, itemIdx) =>
                      item.children ? (
                        <Box key={'gp-' + groupIdx + '-' + itemIdx}>
                          {item.children.map((checkbox, checkboxIdx) => (
                            <Checkbox
                              sx={{ marginEnd: 10 }}
                              key={'gp-' + groupIdx + '-' + itemIdx + '-' + checkboxIdx}
                              value={checkbox.actionId}
                              onChange={() => onItemChange(item)}
                              isDisabled={checkboxDisabled.current.includes(checkbox.actionId)}
                            >
                              {checkbox.name}
                            </Checkbox>
                          ))}
                        </Box>
                      ) : (
                        <Checkbox
                          sx={{ marginEnd: 10 }}
                          key={'gp-' + groupIdx + '-' + itemIdx}
                          value={item.actionId}
                          onChange={() => onItemChange(item)}
                          isDisabled={checkboxDisabled.current.includes(item.actionId)}
                        >
                          {item.name}
                        </Checkbox>
                      )
                    )}
                </CheckboxGroup>
              </Box>
            </Box>
          ))}
        </Stack>
      </FormControl>
    </Stack>
  );
};

export { AdminGroupFrom };
