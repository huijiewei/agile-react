import { VFC } from 'react';
import { useErrorAddDispatch } from '@shared/contexts/ErrorContext';

const About: VFC = () => {
  const addError = useErrorAddDispatch();

  const handleClick = () => {
    addError('出现错误', true);
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
