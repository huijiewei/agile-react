import { Button } from '@chakra-ui/react';
import useError from '@shared/hooks/useError';

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
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <Button>中文按钮</Button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
      <p>
        <button>中文按钮</button>
      </p>
    </div>
  );
};

export default Home;
