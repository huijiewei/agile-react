import { AdminGroup, useAdminGroupEdit } from '@admin/services/useAdminGroup';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Grid,
  GridItem,
  Stack,
} from '@chakra-ui/react';
import { AdminGroupPermission, useAdminGroupPermissions } from '@admin/services/useMisc';
import { useCallback, useEffect, useState } from 'react';
import { StringOrNumber } from '@shared/utils/types';
import { useForm } from 'react-hook-form';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';
import { Form } from '@shared/components/form/Form';
import { FormItem } from '@shared/components/form/FormItem';
import { FormAction } from '@shared/components/form/FormAction';

type AdminGroupPermissionCheckGroup = {
  name: string;
  index: number;
  checkAll: boolean;
  checkIndeterminate: boolean;
  checkedPermissions: string[];
  permissionsCount: number;
  children?: AdminGroupPermission[];
};

type AdminGroupFormProps = {
  adminGroup: AdminGroup;
  onSuccess: (adminGroup: AdminGroup) => void;
};

const AdminGroupFrom = ({ adminGroup, onSuccess }: AdminGroupFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [permissions, setPermissions] = useState<AdminGroupPermissionCheckGroup[]>([]);
  const [disablePermissions, setDisablePermissions] = useState<string[]>([]);
  const { loading, edit } = useAdminGroupEdit();

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

  const isPermissionChecked = useCallback(
    (actionId: string) => {
      return adminGroup.permissions?.includes(actionId);
    },
    [adminGroup]
  );

  const onSubmit = async (form: AdminGroup) => {
    const { data, error } = await edit(adminGroup.id, form);

    if (data) {
      onSuccess && onSuccess(data);
    }

    if (error) {
      bindUnprocessableEntityErrors(
        error,
        (field, message) => {
          setError(field, { type: 'manual', message: message });
        },
        () => clearErrors
      );
    }
  };

  useEffect(() => {
    const groupPermissions: AdminGroupPermissionCheckGroup[] = [];

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
    <Form spacing={10} onSubmit={handleSubmit(onSubmit)}>
      <FormItem id="name" isRequired label={'名称'} isInvalid={errors.name} fieldWidth={10}>
        <Input
          type={'text'}
          {...register('name', { required: '请输入管理组名称' })}
          name={'name'}
          defaultValue={adminGroup.name}
        />
        <FormErrorMessage>{errors.name?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem label={'权限'}>
        {permissions.map((group, groupIdx) => (
          <Box key={'gp-' + groupIdx}>
            <Box sx={{ backgroundColor: 'gray.50', color: 'gray.500', fontWeight: 'medium', paddingX: 3, paddingY: 2 }}>
              <Checkbox
                onChange={() => onAllChange(group)}
                isIndeterminate={group.checkIndeterminate}
                isChecked={group.checkAll}
              >
                {group.name}
              </Checkbox>
            </Box>
            <Box sx={{ paddingX: 3, paddingY: 2 }}>
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
      </FormItem>
      <FormAction>
        <Button isLoading={loading} type={'submit'}>
          提交
        </Button>
      </FormAction>
    </Form>
  );
};

export { AdminGroupFrom };
