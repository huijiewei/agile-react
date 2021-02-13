import { useError } from '@shared/hooks/useError';
import { FC } from 'react';

const ErrorDialog: FC = () => {
  const { error, removeError } = useError();

  const handleClick = () => {
    removeError();
  };

  return (
    <div className={'modal'} role="dialog">
      <div className={'modal-overlay'} />
      <div className={'modal-content'}>
        <div>{error && error.message}</div>

        <div>
          <button className={'btn'} onClick={handleClick}>
            {error && error.historyBack ? '返回' : '关闭'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
