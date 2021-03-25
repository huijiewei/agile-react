import { setAuthAccessToken } from '@admin/AppAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@admin/services/useAuth';
import { useHttp } from '@shared/contexts/HttpContext';
import { requestFlatry } from '@shared/utils/http';

const HeaderUserMenu = () => {
  const { post } = useHttp();
  const navigate = useNavigate();
  const { currentUser, mutate } = useAuth();

  const handleRefresh = async () => {
    await mutate();
  };

  const handleLogout = async () => {
    const { data } = await requestFlatry(post('auth/logout', null));

    if (data) {
      setAuthAccessToken('');

      await mutate(undefined, false);

      navigate('login', { replace: true });
    }
  };

  if (currentUser) {
    return (
      <div>
        <div>
          <img src={currentUser.avatar} alt={currentUser.name} />
          <span>{currentUser.name}</span>
        </div>
        <ul>
          <li>{currentUser.adminGroup.name}</li>
          <li>个人资料</li>
          <li onClick={handleRefresh}>刷新资料</li>
          <li onClick={handleLogout}>退出登录</li>
        </ul>
      </div>
    );
  }

  return null;
};

export { HeaderUserMenu };
