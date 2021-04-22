import { Metismenu } from '@shared/components/metismenu/Metismenu';
import { useAuth } from '@admin/services/useAuth';
import { Box } from '@chakra-ui/react';

const NavAside = (): JSX.Element => {
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
      <Metismenu menus={groupMenus} toggle={false} />
    </Box>
  );
};

export { NavAside };
