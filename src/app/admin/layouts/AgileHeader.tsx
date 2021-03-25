import { HeaderUserMenu } from '@admin/components/HeaderUserMenu';
import { HeaderBreadcrumb } from '@admin/components/HeaderBreadcrumb';

const AgileHeader = () => {
  return (
    <div>
      <div>
        <HeaderBreadcrumb />
      </div>
      <div>
        <HeaderUserMenu />
      </div>
    </div>
  );
};

export default AgileHeader;
