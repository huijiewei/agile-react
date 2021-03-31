import { NavLink } from 'react-router-dom';

import { Metismenu } from '@shared/components/metismenu/Metismenu';
import { AuthMenu, useAuth } from '@admin/services/useAuth';
import { formatUrl } from '@shared/utils/util';
import { Box, List, ListItem } from '@chakra-ui/react';

const AsideMenuElem = ({ menu }: { menu: AuthMenu }) => {
  return menu.url ? (
    <Box height="10" lineHeight="10" as={NavLink} to={formatUrl(menu.url)}>
      {menu.label}
    </Box>
  ) : (
    <Box height="10" lineHeight="10">
      {menu.label}
    </Box>
  );
};

const AsideMenuItem = ({ menu, keyPrefix }: { menu: AuthMenu; keyPrefix: string }) => {
  return (
    <ListItem color="white">
      <AsideMenuElem menu={menu}></AsideMenuElem>

      {menu.children && (
        <List>
          {menu.children.map((subMenu, subIdx) => (
            <AsideMenuItem
              key={keyPrefix + '-' + subIdx}
              keyPrefix={keyPrefix + '-' + subIdx}
              menu={subMenu}
            ></AsideMenuItem>
          ))}
        </List>
      )}
    </ListItem>
  );
};

const AgileAside = () => {
  const { groupMenus } = useAuth();

  return (
    <Box
      overflowY="hidden"
      _hover={{
        overflowY: 'auto',
      }}
      height="full"
      sx={{
        '&::-webkit-scrollbar': {
          width: '6px',
          height: '100px',
        },
        '&::-webkit-scrollbar-track': {
          width: '9px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'gray',
          borderRadius: 'sm',
        },
      }}
    >
      <Metismenu className="ag-metismenu" toggle={false}>
        {groupMenus.map((menu, idx) => (
          <AsideMenuItem key={'mm-' + idx} keyPrefix={'mm-' + idx} menu={menu}></AsideMenuItem>
        ))}
      </Metismenu>
    </Box>
  );
};

export default AgileAside;
