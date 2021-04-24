import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { requestFlatry } from '@shared/utils/http';
import { useHttp } from '@shared/contexts/HttpContext';
import { Link } from 'react-router-dom';
import { Box, Button, HStack, IconButton, Stack, Link as TextLink } from '@chakra-ui/react';
import { Config, Delete, Minus } from '@icon-park/react';
import { Icon } from '@shared/components/icon/Icon';

const DeleteUserButton = () => {
  const canDeleteUser = useAuthPermission('user/delete');

  return <Button isDisabled={!canDeleteUser}>是否有删除用户权限</Button>;
};

const DeleteAdminButton = () => {
  const canDeleteAdmin = useAuthPermission('admin/delete');

  return <Button isDisabled={!canDeleteAdmin}>是否有删除管理员权限</Button>;
};

const Home = (): JSX.Element => {
  const { setError } = useErrorDispatch();
  const { apiGet, apiPost } = useHttp();

  const handleClick = () => {
    setError('出现错误');
  };

  const onSendGet = async () => {
    const { data } = await requestFlatry(apiGet('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  const onSendPost = async () => {
    const { data } = await requestFlatry(apiPost('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  return (
    <ContentLayout>
      <Stack>
        <Box>Hello Agile</Box>
        <Box>中文字体</Box>
        <HStack>
          <DeleteUserButton />
          <DeleteAdminButton />
        </HStack>
        <HStack>
          <Button onClick={onSendGet}>随便发送一个 GET 请求</Button>
          <Button onClick={onSendPost}>随便发送一个 POST 请求</Button>
        </HStack>
        <HStack>
          <Button onClick={handleClick}>显示个错误提示</Button>
          <Button variant={'outline'} onClick={handleClick}>
            显示个错误提示
          </Button>
          <Button variant={'ghost'} onClick={handleClick}>
            显示个错误提示
          </Button>
          <Button variant={'link'} onClick={handleClick}>
            显示个错误提示
          </Button>
        </HStack>
        <HStack>
          <Button variant="outline" onClick={handleClick}>
            显示个错误提示
          </Button>
          <Button onClick={handleClick}>显示个错误提示</Button>
          <Button variant="outline" size={'sm'} onClick={handleClick}>
            显示个错误提示
          </Button>
          <Button size={'sm'} onClick={handleClick}>
            显示个错误提示
          </Button>
          <Button variant="outline" size={'xs'} onClick={handleClick}>
            中文 English
          </Button>
          <Button size={'xs'} onClick={handleClick}>
            中文
          </Button>
        </HStack>
        <HStack>
          <Button leftIcon={<Delete />} variant="outline" onClick={handleClick}>
            图标按钮
          </Button>
          <Button leftIcon={<Config />} onClick={handleClick}>
            图标按钮
          </Button>
          <Button iconSpacing="0.35em" leftIcon={<Config />} variant="outline" size={'sm'} onClick={handleClick}>
            图标按钮
          </Button>
          <Button iconSpacing="0.35em" leftIcon={<Config />} size={'sm'} onClick={handleClick}>
            图标按钮
          </Button>
          <Button iconSpacing="0.25em" leftIcon={<Delete />} variant="outline" size={'xs'} onClick={handleClick}>
            图标按钮
          </Button>
          <Button iconSpacing="0.25em" leftIcon={<Minus />} size={'xs'} onClick={handleClick}>
            图标按钮
          </Button>
        </HStack>
        <HStack>
          <IconButton aria-label="" variant="outline" icon={<Config />} onClick={handleClick} />
          <IconButton aria-label="" icon={<Icon as={Delete} />} onClick={handleClick} />
          <IconButton aria-label="" variant="outline" icon={<Icon as={Delete} />} size={'sm'} onClick={handleClick} />
          <IconButton aria-label="" icon={<Config />} size={'sm'} onClick={handleClick} />
          <IconButton aria-label="" variant="outline" icon={<Minus />} size={'xs'} onClick={handleClick} />
          <IconButton aria-label="" icon={<Config />} size={'xs'} onClick={handleClick} />
        </HStack>
        <div>
          <TextLink as={Link} to={'../nest'}>
            嵌套路由页面
          </TextLink>
        </div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
        <div>Go</div>
      </Stack>
    </ContentLayout>
  );
};

export default Home;
