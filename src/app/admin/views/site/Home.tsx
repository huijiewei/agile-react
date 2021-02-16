import { useErrorDispatcher } from '@shared/hooks/useError';
import { VFC } from 'react';

const Home: VFC = () => {
  console.log('Home Render');

  const { addError } = useErrorDispatcher();

  const handleClick = () => {
    addError('出现错误', false);
  };

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <button className={'btn'} onClick={handleClick}>
          错误
        </button>
      </p>
      <p>TEST</p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
