import { Metismenu } from '@shared/components/metismenu/Metismenu';
import { useAuth } from '@admin/services/useAuth';
import { Scrollbar } from '@shared/components/scrollbar/Scrollbar';
import { useLayoutState } from '@shared/components/layout/LayoutContext';
import { useLocation } from 'react-router-dom';

const NavAside = (): JSX.Element => {
  const location = useLocation();
  const { groupMenus } = useAuth();
  const { headerHeight } = useLayoutState();

  return (
    <Scrollbar height={`calc(100vh - ${headerHeight} )`}>
      <Metismenu pathname={location.pathname} menus={groupMenus} toggle={false} />
    </Scrollbar>
  );
};

export { NavAside };
