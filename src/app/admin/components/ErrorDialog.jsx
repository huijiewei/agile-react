import { useError } from '@shared/hooks/useError';

const ErrorDialog = () => {
  const { error, removeError } = useError();

  const handleClick = () => {
    removeError();
  };

  return (
    <div className={'modal'} role="dialog">
      <div className={'modal-overlay'} />
      <div>
        <div>{error && error.message}</div>

        <div>
          <button onClick={handleClick}>{error && error.historyBack ? '返回' : '关闭'}</button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
