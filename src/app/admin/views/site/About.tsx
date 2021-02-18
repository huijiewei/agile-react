import { VFC } from 'react';
import { useErrorSetDispatch } from '@shared/contexts/ErrorContext';

const About: VFC = () => {
  const setError = useErrorSetDispatch();

  const handleClick = () => {
    setError('出现错误', true);
  };

  return (
    <div className={'ag-box'}>
      <p>About Agile</p>
      <p>
        <button className={'btn'} onClick={handleClick}>
          错误返回
        </button>
      </p>
    </div>
  );
};

export default About;
