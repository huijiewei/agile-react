// inspire from https://github.com/X-neuron/antdFront/blob/master/src/components/TabRoute/index.jsx

import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  CloseButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useConst,
  usePrevious,
  chakra,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate, useOutlet, useParams } from 'react-router-dom';
import { getMatchRoutes } from '@admin/routers';
import { Location, To } from 'history';
import { Down, Left, Right } from '@icon-park/react';

type Tab = {
  path: string;
  title: string;
  outlet: JSX.Element | null;
  to: To;
};

type RouterTabProps = {
  backgroundColor?: string;
};

const RouterTab = ({ backgroundColor }: RouterTabProps): JSX.Element => {
  const tabs = useConst<Tab[]>([]);

  const outlet = useOutlet();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const prevLocation = usePrevious(location);

  const [tabIndex, setTabIndex] = useState(0);

  const buildTab = useCallback((location: Location, outlet: JSX.Element) => {
    const match = getMatchRoutes(location);

    const tab: Tab = {
      path: location.pathname,
      title: match.reduce((accumulator, currentValue) => accumulator + currentValue.title, ''),
      outlet: outlet,
      to: location as To,
    };
  }, []);

  useEffect(() => {
    console.log(prevLocation);
  }, []);

  useEffect(() => {
    const match = getMatchRoutes(location);

    console.log(location);

    const tab: Tab = {
      path: location.pathname,
      title: match?.reduce((accumulator, currentValue) => accumulator + currentValue.title, '') || '',
      outlet: outlet,
      to: location as To,
    };

    console.log('prev:', prevLocation?.pathname);
    console.log('tabs:', tabs);

    const currentIndex = tabs.findIndex((tab) => tab.path == prevLocation.pathname);

    console.log('currentIndex:', currentIndex);

    const matchIndex = tabs.findIndex((tab) => {
      if (tab.path == location.pathname) {
        return true;
      }

      return false;
    });

    console.log('matchIndex:', currentIndex);

    if (matchIndex > -1) {
      tabs[matchIndex] = tab;
      setTabIndex(matchIndex);
    } else {
      tabs.splice(currentIndex + 1, 0, tab);
      setTabIndex(currentIndex + 1);
    }

    console.log(tabs);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onClickCloseTab = (path: string) => {
    console.log(path);
  };

  return (
    <Tabs
      flexGrow={1}
      variant={'unstyled'}
      width={'full'}
      size={'sm'}
      index={tabIndex}
      isLazy
      lazyBehavior={'keepMounted'}
    >
      <TabList
        justifyContent={'space-between'}
        display={'flex'}
        flexDirection={'row'}
        padding={2}
        backgroundColor={backgroundColor}
        position={'fixed'}
        alignItems={'center'}
      >
        <IconButton _focus={{ boxShadow: 'none' }} size={'xs'} variant={'ghost'} icon={<Left />} aria-label={'Prev'} />
        <Stack
          flexGrow={1}
          overflowX={'hidden'}
          marginX={1}
          direction={'row'}
          spacing={1}
          width={'auto'}
          display={'inline-flex'}
          height={'fit-content'}
        >
          {tabs.map((tab) => (
            <Tab
              _selected={{ backgroundColor: 'blue.500', color: 'white', _hover: { color: 'gray.200' } }}
              _focus={{ boxShadow: 'none' }}
              _hover={{ color: 'blue.500' }}
              backgroundColor={'white'}
              whiteSpace={'nowrap'}
              paddingEnd={0}
              borderRadius={'sm'}
              as={Link}
              key={tab.path}
              to={tab.to}
            >
              {tab.title}
              <CloseButton
                onClick={() => onClickCloseTab(tab.path)}
                height={3}
                width={3}
                padding={2}
                marginX={2}
                size={'sm'}
              />
            </Tab>
          ))}
        </Stack>
        <IconButton size={'xs'} variant={'ghost'} icon={<Right />} aria-label={'Next'} />
        <IconButton size={'xs'} variant={'outline'} icon={<Down />} aria-label={'Menu'} />
      </TabList>
      <TabPanels display={'flex'} flexGrow={1} paddingTop={7}>
        {tabs.map((tab) => (
          <TabPanel flexGrow={1} key={tab.path}>
            {tab.outlet}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
};

export { RouterTab };
