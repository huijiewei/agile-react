import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { setAuthAccessToken } from '@admin/AppAuth';
import { refreshAuth } from '@admin/services/useAuth';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import ContentLayout from '@admin/layouts/ContentLayout';
import { requestFlatry } from '@shared/utils/http';
import { useHttp } from '@shared/contexts/HttpContext';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, HStack, Stack, Box, Icon, IconButton } from '@chakra-ui/react';
import { useIsMounted } from '@shared/hooks/useIsMounted';
import { Config, Delete, Minus } from '@icon-park/react';

const DeleteUserButton = () => {
  const canDeleteUser = useAuthPermission('user/delete');

  return <Button isDisabled={!canDeleteUser}>是否有删除用户权限</Button>;
};

const DeleteAdminButton = () => {
  const canDeleteAdmin = useAuthPermission('admin/delete');

  return <Button isDisabled={!canDeleteAdmin}>是否有删除管理员权限</Button>;
};

const RefreshUserButton = () => {
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  const handleRefreshUser = async () => {
    setLoading(true);

    await refreshAuth();

    if (isMounted) {
      setLoading(false);
    }
  };

  return (
    <Button isLoading={loading} onClick={handleRefreshUser}>
      重新获取用户
    </Button>
  );
};

const Home = () => {
  const { setError } = useErrorDispatch();
  const { get, post } = useHttp();

  const handleClick = () => {
    setError('出现错误');
  };

  const handleSetIncorrectAccessToken = () => {
    setAuthAccessToken('1T0VCubVALBwvgHm51Hh6o2');
  };

  const handleSetCorrectAccessToken = () => {
    setAuthAccessToken('1T0VCubVALBwvgHm51Hh6o');
  };

  const handleSendGet = async () => {
    const { data } = await requestFlatry(get('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  const handleSendPost = async () => {
    const { data } = await requestFlatry(post('user/create', {}));

    if (data) {
      console.log(data);
    }
  };

  const handleToastShow = () => {
    console.log(1);
  };

  console.log('Home Render');

  return (
    <ContentLayout>
      <Stack>
        <Box>Hello Agile</Box>
        <Box>中文字体</Box>
        <HStack>
          <Button onClick={handleToastShow}>显示一个 Toast</Button>
          <Button as={Link} isDisabled to={'about'}>
            显示一个 Toast
          </Button>
        </HStack>
        <HStack>
          <DeleteUserButton />
          <DeleteAdminButton />
        </HStack>
        <HStack>
          <Button onClick={handleSendGet}>随便发送一个 GET 请求</Button>
          <Button onClick={handleSendPost}>随便发送一个 POST 请求</Button>
        </HStack>
        <Box>
          <RefreshUserButton />
        </Box>
        <HStack>
          <Button onClick={handleSetIncorrectAccessToken}>设置错误的 AccessToken</Button>
          <Button onClick={handleSetCorrectAccessToken}>设置正确的 AccessToken</Button>
        </HStack>
        <Box>
          <Button isFullWidth onClick={handleClick}>
            显示个错误提示
          </Button>
        </Box>
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
          <Button isLoading onClick={handleClick}>
            加载中
          </Button>
          <Button isLoading size="sm" onClick={handleClick}>
            加载中
          </Button>
          <Button isLoading size="xs" onClick={handleClick}>
            加载中
          </Button>
          <Button isLoading variant="outline" onClick={handleClick}>
            加载中
          </Button>
          <Button isLoading size="sm" variant="outline" onClick={handleClick}>
            加载中
          </Button>
          <Button isLoading size="xs" variant="outline" onClick={handleClick}>
            加载中
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
            中文
          </Button>
          <Button size={'xs'} onClick={handleClick}>
            中文
          </Button>
        </HStack>
        <HStack>
          <Button leftIcon={<Config strokeWidth={3} />} variant="outline" onClick={handleClick}>
            图标按钮
          </Button>
          <Button leftIcon={<Icon verticalAlign="-0.125em" as={Config} />} onClick={handleClick}>
            图标按钮
          </Button>
          <Button
            iconSpacing="0.35em"
            leftIcon={<Icon verticalAlign="-0.125em" as={Config} />}
            variant="outline"
            size={'sm'}
            onClick={handleClick}
          >
            图标按钮
          </Button>
          <Button
            iconSpacing="0.35em"
            leftIcon={<Icon verticalAlign="-0.125em" as={Config} />}
            size={'sm'}
            onClick={handleClick}
          >
            图标按钮
          </Button>
          <Button
            iconSpacing="0.25em"
            leftIcon={<Delete strokeWidth={3} />}
            variant="outline"
            size={'xs'}
            onClick={handleClick}
          >
            图标按钮
          </Button>
          <Button iconSpacing="0.25em" leftIcon={<Minus />} size={'xs'} onClick={handleClick}>
            图标按钮
          </Button>
        </HStack>
        <HStack>
          <IconButton aria-label="" variant="outline" icon={<Icon as={Config} />} onClick={handleClick}></IconButton>
          <IconButton aria-label="" icon={<Delete />} onClick={handleClick}></IconButton>
          <IconButton
            aria-label=""
            variant="outline"
            icon={<Icon as={Delete} />}
            size={'sm'}
            onClick={handleClick}
          ></IconButton>
          <IconButton aria-label="" icon={<Config />} size={'sm'} onClick={handleClick}></IconButton>
          <IconButton aria-label="" variant="outline" icon={<Minus />} size={'xs'} onClick={handleClick}></IconButton>
          <IconButton aria-label="" icon={<Config />} size={'xs'} onClick={handleClick}></IconButton>
        </HStack>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
        <p>TEST</p>
      </Stack>
    </ContentLayout>
  );
};

export default Home;
