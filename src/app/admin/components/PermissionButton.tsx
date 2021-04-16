import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import { Button, ButtonProps, forwardRef } from '@chakra-ui/react';

type PermissionButtonProps = ButtonProps & {
  permission: string;
};

const PermissionButton = forwardRef<PermissionButtonProps, 'button'>((props, ref) => {
  const { permission, children, isDisabled, ...restProps } = props;

  const hasPermission = useAuthPermission(permission);

  return (
    <Button ref={ref} isDisabled={isDisabled || !hasPermission} {...restProps}>
      {children}
    </Button>
  );
});

export { PermissionButton };
