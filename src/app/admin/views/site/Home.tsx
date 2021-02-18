import { VFC } from 'react';
import { useErrorAddDispatch } from '@shared/contexts/ErrorContext';

const Home: VFC = () => {
  const addError = useErrorAddDispatch();

  const handleClick = () => {
    addError('出现错误', false);
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
      <p>TEST</p>
    </div>
  );
};

export default Home;
