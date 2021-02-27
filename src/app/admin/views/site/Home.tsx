import { VFC } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

const Home: VFC = () => {
  const { setError } = useErrorDispatch();

  const handleClick = () => {
    setError('出现错误', false);
  };

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <button className={'btn'} onClick={handleClick}>
          错误关闭
        </button>
      </p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
