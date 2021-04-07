import { AdminGroup } from '@admin/services/useAdminGroup';
import { Box, Checkbox, CheckboxGroup, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { AdminGroupPermission, useAdminGroupPermissions } from '@admin/services/useMisc';
import { useCallback, useEffect, useState } from 'react';
import { StringOrNumber } from '@shared/utils/types';

type AdminGroupPermissionCheckGroup = {
  name: string;
  index: number;
  checkAll: boolean;
  checkIndeterminate: boolean;
  checkedPermissions: string[];
  permissionsCount: number;
  children?: AdminGroupPermission[];
};

const AdminGroupFrom = ({ adminGroup }: { adminGroup: AdminGroup }) => {
  const [permissions, setPermissions] = useState<AdminGroupPermissionCheckGroup[]>([]);
  const [disablePermissions, setDisablePermissions] = useState<string[]>([]);

  const { data } = useAdminGroupPermissions();

  const updateDisablePermissions = useCallback(
    (item: AdminGroupPermission) => {
      item.combines?.map((combine) => {
        if (!disablePermissions.includes(combine)) {
          setDisablePermissions((prev) => [...prev, combine]);
        }
      });
    },
    [disablePermissions]
  );

  const onAllChange = (group: AdminGroupPermissionCheckGroup) => {
    group.checkIndeterminate = false;

    if (!group.checkAll) {
      group.children?.map((child) => {
        if (child.children) {
          child.children.map((item) => {
            group.checkedPermissions.push(item.actionId);
            updateDisablePermissions(item);
          });
        } else {
          group.checkedPermissions.push(child.actionId);
          updateDisablePermissions(child);
        }
      });
    } else {
      group.checkedPermissions = [];
    }

    group.checkAll = !group.checkAll;

    setPermissions((prev) =>
      prev.map((item) => {
        return item.index === group.index ? group : item;
      })
    );
  };

  const onGroupChange = (group: AdminGroupPermissionCheckGroup, event: StringOrNumber[]) => {
    const checkedCount = event.length;

    group.checkAll = group.permissionsCount === checkedCount;
    group.checkIndeterminate = checkedCount > 0 && checkedCount < group.permissionsCount;
    group.checkedPermissions = event as string[];

    setPermissions((prev) =>
      prev.map((item) => {
        return item.index === group.index ? group : item;
      })
    );
  };

  const onItemChange = (item: AdminGroupPermission, event) => {
    console.log(item);
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

    data?.map((permission, index) => {
      const group: AdminGroupPermissionCheckGroup = {
        name: permission.name,
        index: index,
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

              updateDisablePermissions(item);
            }
          });
        } else {
          group.permissionsCount++;

          if (isPermissionChecked(child.actionId)) {
            group.checkedPermissions.push(child.actionId);

            updateDisablePermissions(child);
          }
        }
      });

      const checkedCount = group.checkedPermissions.length;

      group.checkAll = group.permissionsCount === checkedCount;
      group.checkIndeterminate = checkedCount > 0 && checkedCount < group.permissionsCount;

      groupPermissions.push(group);
    });

    setPermissions(groupPermissions);
  }, [data, updateDisablePermissions, isPermissionChecked]);

  return (
    <Stack as="form" spacing={4}>
      <FormControl>
        <FormLabel>名称</FormLabel>
        <Input name={'name'} defaultValue={adminGroup.name} />
      </FormControl>
      <FormControl>
        <FormLabel>权限</FormLabel>
        <Stack spacing={2}>
          {permissions.map((group, groupIdx) => (
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
                <CheckboxGroup onChange={(e) => onGroupChange(group, e)} value={group.checkedPermissions}>
                  {group.children &&
                    group.children.map((item, itemIdx) =>
                      item.children ? (
                        <Box key={'gp-' + groupIdx + '-' + itemIdx}>
                          {item.children.map((checkbox, checkboxIdx) => (
                            <Checkbox
                              sx={{ marginEnd: 12, paddingY: 1 }}
                              key={'gp-' + groupIdx + '-' + itemIdx + '-' + checkboxIdx}
                              value={checkbox.actionId}
                              onChange={() => onItemChange(item)}
                              isDisabled={disablePermissions.includes(checkbox.actionId)}
                            >
                              {checkbox.name}
                            </Checkbox>
                          ))}
                        </Box>
                      ) : (
                        <Checkbox
                          sx={{ marginEnd: 12, paddingY: 1 }}
                          key={'gp-' + groupIdx + '-' + itemIdx}
                          value={item.actionId}
                          onChange={() => onItemChange(item)}
                          isDisabled={disablePermissions.includes(item.actionId)}
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
