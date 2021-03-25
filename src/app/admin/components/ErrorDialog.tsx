import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const ErrorDialog = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    setIsOpen(Boolean(error));
  }, [error, setIsOpen]);

  const navigate = useNavigate();

  const handleDialogClose = () => {
    const historyBack = error && error.historyBack;

    resetError();

    if (historyBack) {
      navigate(-1);
    }
  };

  const handleButtonClick = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <div />
      <main>
        <div>
          <p>{error?.message}</p>
        </div>
        <div>
          <button onClick={handleButtonClick} ref={cancelRef}>
            {error?.historyBack ? '返回' : '关闭'}
          </button>
        </div>
      </main>
    </div>
  );
};

export { ErrorDialog };
