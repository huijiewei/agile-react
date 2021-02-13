import { useError } from '@shared/hooks/useError';
import { FC } from 'react';

const Home: FC = () => {
  const { addError } = useError();

  const handleError = () => {
    addError('出现错误', false);
  };

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <button className={'btn'} onClick={handleError}>
          错误
        </button>
      </p>
      <p>TEST</p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
