import { AdminGroup, useAdminGroupSubmit } from '@admin/services/useAdminGroup';
import { Box, Button, ButtonGroup, Checkbox, CheckboxGroup, FormErrorMessage, Input, Stack } from '@chakra-ui/react';
import { AdminGroupPermission, useAdminGroupPermissions } from '@admin/services/useMisc';
import { ChangeEvent, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';
import { Form } from '@shared/components/form/Form';
import { FormItem } from '@shared/components/form/FormItem';
import { FormAction } from '@shared/components/form/FormAction';
import { useSameWidth } from '@shared/hooks/useSameWidth';
import { AdminGroupDeleteButton } from '@admin/views/admin-group/_Delete';
import { useNavigate } from 'react-router-dom';

type AdminGroupPermissionCheckGroup = {
  name: string;
  index: number;
  isChecked: boolean;
  isIndeterminate: boolean;
  permissions: string[];
  checkedPermissions: string[];
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
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const [groupPermissions, setGroupPermissions] = useState<AdminGroupPermissionCheckGroup[]>([]);
  const [disablePermissions, setDisablePermissions] = useState<string[]>([]);
  const { loading, submitAdminGroup } = useAdminGroupSubmit();
  const navigate = useNavigate();

  const { sameWidthRefs } = useSameWidth();

  const { adminGroupPermissions } = useAdminGroupPermissions();

  const isEditMode = adminGroup.id > 0;

  const onGroupChange = (group: AdminGroupPermissionCheckGroup) => {
    const children: string[] = [];
    const childrenCombines: string[] = [];

    group.children?.map((child) => {
      if (child.children) {
        child.children.map((item) => {
          children.push(item.actionId);
          item.combines && childrenCombines.push(...item.combines);
        });
      } else {
        children.push(child.actionId);
        child.combines && childrenCombines.push(...child.combines);
      }
    });

    if (children.length > 0) {
      if (!group.isChecked) {
        setValue('permissions', getValues('permissions').concat(children));
        group.checkedPermissions = children;
      } else {
        setValue(
          'permissions',
          getValues('permissions').filter((every: string) => {
            return !children.includes(every);
          })
        );
        group.checkedPermissions = [];
      }
    }

    if (childrenCombines.length > 0) {
      if (!group.isChecked) {
        setDisablePermissions((prev) => prev.concat(childrenCombines));
      } else {
        setDisablePermissions((prev) =>
          prev.filter((every) => {
            return !childrenCombines.includes(every);
          })
        );
      }
    }

    group.isIndeterminate = false;
    group.isChecked = !group.isChecked;

    setGroupPermissions((prev) =>
      prev.map((every) => {
        return every.index === group.index ? group : every;
      })
    );
  };

  const onItemChange = (
    item: AdminGroupPermission,
    group: AdminGroupPermissionCheckGroup,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const isChecked = event.target.checked;

    const itemCombines = item.combines || [];

    if (isChecked) {
      group.checkedPermissions = Array.from(new Set([...group.checkedPermissions, item.actionId, ...itemCombines]));
    } else {
      group.checkedPermissions = group.checkedPermissions.filter((every) => {
        return every != item.actionId;
      });
    }

    if (itemCombines.length > 0) {
      if (isChecked) {
        setValue('permissions', getValues('permissions').concat(itemCombines));

        setDisablePermissions((prev) => prev.concat(itemCombines));
      } else {
        setDisablePermissions((prev) =>
          prev.filter((every) => {
            return !itemCombines.includes(every);
          })
        );
      }
    }

    group.isChecked = group.permissions.length == group.checkedPermissions.length;
    group.isIndeterminate =
      group.checkedPermissions.length > 0 && group.permissions.length != group.checkedPermissions.length;

    setGroupPermissions((prev) =>
      prev.map((every) => {
        return every.index === group.index ? group : every;
      })
    );
  };

  const onSubmit = async (formData: AdminGroup) => {
    const { data, error } = await submitAdminGroup(adminGroup.id, formData);

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

    adminGroupPermissions?.map((permission, index) => {
      const group: AdminGroupPermissionCheckGroup = {
        name: permission.name,
        index: index,
        isChecked: false,
        isIndeterminate: false,
        permissions: [],
        checkedPermissions: [],
        children: permission.children,
      };

      permission.children?.map((child) => {
        if (child.children) {
          child.children.forEach((item) => {
            group.permissions.push(item.actionId);

            if (adminGroup.permissions?.includes(item.actionId)) {
              group.checkedPermissions.push(item.actionId);
              item.combines && setDisablePermissions((prev) => prev.concat(item.combines || []));
            }
          });
        } else {
          group.permissions.push(child.actionId);

          if (adminGroup.permissions?.includes(child.actionId)) {
            group.checkedPermissions.push(child.actionId);
            child.combines && setDisablePermissions((prev) => prev.concat(child.combines || []));
          }
        }
      });

      group.isChecked = group.permissions.length == group.checkedPermissions.length;
      group.isIndeterminate =
        group.checkedPermissions.length > 0 && group.permissions.length != group.checkedPermissions.length;

      groupPermissions.push(group);
    });

    setGroupPermissions(groupPermissions);
  }, [adminGroupPermissions, adminGroup.permissions]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem id="name" isRequired label={'名称：'} isInvalid={errors.name} fieldWidth={9}>
        <Input type={'text'} {...register('name', { required: '请输入管理组名称' })} defaultValue={adminGroup.name} />
        <FormErrorMessage>{errors.name?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="permissions" label={'权限：'}>
        <Controller
          control={control}
          name={'permissions'}
          defaultValue={adminGroup.permissions}
          render={({ field: { value, onChange } }) => (
            <CheckboxGroup value={value} onChange={onChange}>
              <Stack spacing={3}>
                {groupPermissions.map((group, groupIdx) => (
                  <Box key={'gp-' + groupIdx}>
                    <Box
                      sx={{
                        backgroundColor: 'gray.50',
                        color: 'gray.500',
                        fontWeight: 'medium',
                        paddingX: 3,
                        paddingY: 2,
                      }}
                    >
                      <Checkbox
                        onChange={() => onGroupChange(group)}
                        isIndeterminate={group.isIndeterminate}
                        isChecked={group.isChecked}
                      >
                        {group.name}
                      </Checkbox>
                    </Box>
                    <Box
                      ref={(element) => sameWidthRefs.current.push({ element, childrenClassName: 'sw-checkbox' })}
                      sx={{ paddingX: 3, paddingY: 2 }}
                    >
                      {group.children &&
                        group.children.map((item, itemIdx) =>
                          item.children ? (
                            <Box key={'gp-' + groupIdx + '-' + itemIdx}>
                              {item.children.map((checkbox, checkboxIdx) => (
                                <Checkbox
                                  className={'sw-checkbox'}
                                  sx={{ marginEnd: 12, paddingY: 1 }}
                                  key={'gp-' + groupIdx + '-' + itemIdx + '-' + checkboxIdx}
                                  value={checkbox.actionId}
                                  onChange={(e) => onItemChange(checkbox, group, e)}
                                  isDisabled={disablePermissions.includes(checkbox.actionId)}
                                >
                                  {checkbox.name}
                                </Checkbox>
                              ))}
                            </Box>
                          ) : (
                            <Checkbox
                              className={'sw-checkbox'}
                              sx={{ marginEnd: 12, paddingY: 1 }}
                              key={'gp-' + groupIdx + '-' + itemIdx}
                              value={item.actionId}
                              onChange={(e) => onItemChange(item, group, e)}
                              isDisabled={disablePermissions.includes(item.actionId)}
                            >
                              {item.name}
                            </Checkbox>
                          )
                        )}
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CheckboxGroup>
          )}
        />
      </FormItem>
      <FormAction>
        <ButtonGroup spacing={3} alignItems={'flex-end'}>
          <Button isLoading={loading} type={'submit'}>
            提交
          </Button>
          {isEditMode && (
            <AdminGroupDeleteButton
              size={'sm'}
              adminGroup={adminGroup}
              onSuccess={() => {
                navigate('../../../admin-group');
              }}
            />
          )}
        </ButtonGroup>
      </FormAction>
    </Form>
  );
};

export { AdminGroupFrom };
