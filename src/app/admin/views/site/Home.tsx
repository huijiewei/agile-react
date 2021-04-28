import ContentLayout from '@admin/layouts/ContentLayout';
import { Link } from 'react-router-dom';
import { Box, Link as TextLink, Stack } from '@chakra-ui/react';

const Home = (): JSX.Element => {
  return (
    <ContentLayout>
      <Stack>
        <Box>Agile - The React Admin Template</Box>
        <Box>中文字体</Box>
        <div>
          <TextLink as={Link} to={'../nest'}>
            嵌套路由页面
          </TextLink>
        </div>
        <div>
          <TextLink as={Link} to={'../component'}>
            组件页面
          </TextLink>
        </div>
      </Stack>
    </ContentLayout>
  );
};

export default Home;
