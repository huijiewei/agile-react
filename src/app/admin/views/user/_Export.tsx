import { ExportButton } from '@admin/components/ExportButton';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';

const UserExportButton = () => {
  const hasPermission = useAuthPermission('user/export');

  return (
    <ExportButton confirmMessage={'你确定要导出这些用户吗？'} isDisabled={!hasPermission} apiEndpoint={'users/export'}>
      用户导出
    </ExportButton>
  );
};

export { UserExportButton };
