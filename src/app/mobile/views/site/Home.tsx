import { FC } from 'react';
import useSWR from 'swr';

const Home: FC = () => {
  const { data } = useSWR('https://agile.huijiewei.com/admin-api/open/captcha');

  console.log('Home Render');

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>Mobile Index</p>
      <p>{data && <img alt="验证码" src={data.image} />}</p>
    </div>
  );
};

export default Home;
