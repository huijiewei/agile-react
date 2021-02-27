import { VFC } from 'react';
import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';

const ErrorDialog: VFC = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();

  const navigate = useNavigate();

  const handleClick = () => {
    resetError();

    if (error.historyBack) {
      navigate(-1);
    }
  };

  return (
    error && (
      <div className="modal" role="dialog">
        <div className="modal-overlay" />
        <div className="modal-content">
          <div>{error.message}</div>

          <div>
            <button className="btn" onClick={handleClick}>
              {error.historyBack ? '返回' : '关闭'}
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default ErrorDialog;
