import { forwardRef, SelectProps } from '@chakra-ui/react';
import { RemoteSelect } from '@shared/components/select/RemoteSelect';
import { useAdminGroups } from '@admin/services/useMisc';

const AdminGroupSelect = forwardRef<SelectProps, 'select'>((props, ref) => {
  const { fetch } = useAdminGroups();

  const loadAdminGroups = async () => {
    const { data } = await fetch();

    return data?.map((adminGroup) => {
      return {
        value: adminGroup.id,
        label: adminGroup.name,
      };
    });
  };

  return <RemoteSelect ref={ref} loadOptions={loadAdminGroups} {...props} />;
});

export { AdminGroupSelect };
