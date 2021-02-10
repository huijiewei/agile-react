import { useError } from '@shared/hooks/useError';
import { Button } from '@chakra-ui/react';

const Home = () => {
  const { addError } = useError();

  const handleError = () => {
    addError('ERROR', true);
  };

  return (
    <div className={'ag-box'}>
      <p>Hello Agile</p>
      <p>
        <Button onClick={handleError}>错误</Button>
      </p>
      <p>TEST</p>
      <p>TEST</p>
    </div>
  );
};

export default Home;
