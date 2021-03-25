import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <img alt="Not Found" src={require('../../assets/images/logo.png')} />
          </div>
          <div>404</div>
          <div>页面不存在</div>
          <div>
            <button onClick={handleBack}>返回</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
