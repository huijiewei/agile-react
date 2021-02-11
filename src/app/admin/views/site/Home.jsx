import { useError } from '@shared/hooks/useError';

const Home = () => {
  const { addError } = useError();

  const handleError = () => {
    addError('ERROR', true);
  };

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <button className={'button'} onClick={handleError}>
          错误
        </button>
      </p>
      <p>TEST</p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
