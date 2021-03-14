import { Box, Icon, IconButton, Stack } from '@chakra-ui/react';
import { RotateCw } from 'react-feather';
import { noScrollbarsClassName } from 'react-remove-scroll-bar';
import HeaderUserMenu from '@admin/components/HeaderUserMenu';
import HeaderBreadcrumb from '@admin/components/HeaderBreadcrumb';

const AgileHeader = () => {
  return (
    <Box
      className={noScrollbarsClassName}
      as={'header'}
      position={'fixed'}
      width={['calc(100% - 0)', 'calc(100% - 0)', 'calc(100% - 60px)', 'calc(100% - 220px)']}
      left={[0, 0, '60px', '220px']}
      height={'50px'}
      lineHeight={'50px'}
      zIndex={30}
      backgroundColor={'white'}
    >
      <Stack spacing={2} direction={'row'} float={'left'} as={'div'}>
        <IconButton
          as="span"
          icon={<Icon as={RotateCw} />}
          float={'left'}
          variant={'ghost'}
          height={'50px'}
          width={'50px'}
          borderRadius={'none'}
          colorScheme={'gray'}
          aria-label={'刷新页面'}
        />
        <HeaderBreadcrumb float={'left'} />
        <IconButton
          as="span"
          height={'50px'}
          width={'50px'}
          icon={<Icon as={RotateCw} />}
          float={'left'}
          variant={'ghost'}
          borderRadius={'none'}
          colorScheme={'gray'}
          aria-label={'刷新页面'}
        />
      </Stack>
      <Box float={'right'} as={'div'}>
        <HeaderUserMenu />
      </Box>
    </Box>
  );
};

export default AgileHeader;
