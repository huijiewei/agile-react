import useSWR from 'swr';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

const Home = () => {
  const { data } = useSWR('https://agile.huijiewei.com/admin-api/open/captcha');

  const { setError } = useErrorDispatch();

  console.log('Home Render');

  const handleClick = () => {
    setError('No handler found for GET /admin-api/shop-products');
  };

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>Mobile Index</p>
      <p>
        <button onClick={handleClick}>显示个错误提示</button>
      </p>
      <p>{data && <img alt="验证码" src={data.image} />}</p>
    </div>
  );
};

export default Home;
