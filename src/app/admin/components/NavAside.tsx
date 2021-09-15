import { Metismenu } from '@shared/components/metismenu/Metismenu';
import { useAuth } from '@admin/services/useAuth';
import { Scrollbar } from '@shared/components/scrollbar/Scrollbar';
import { useLayoutState } from '@shared/components/layout/LayoutContext';

const NavAside = (): JSX.Element => {
  const { groupMenus } = useAuth();
  const { headerHeight } = useLayoutState();

  return (
    <Scrollbar height={`calc(100vh - ${headerHeight} )`}>
      <Metismenu menus={groupMenus} toggle={false} />
    </Scrollbar>
  );
};

export { NavAside };
