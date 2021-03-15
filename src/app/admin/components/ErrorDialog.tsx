import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { useState, useEffect } from 'react';

const ErrorDialog = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(Boolean(error));
  }, [error, setOpen]);

  const navigate = useNavigate();

  const handleDialogExited = () => {
    const historyBack = error && error.historyBack;

    resetError();

    if (historyBack) {
      navigate(-1);
    }
  };

  const handleButtonClick = () => {
    setOpen(false);
  };

  return (
    <Dialog
      TransitionProps={{
        onExited: handleDialogExited,
      }}
      open={open}
    >
      <DialogContent sx={{ textAlign: 'center', minWidth: '320px' }}>
        <p>
          <ErrorOutlineIcon fontSize={'large'} color={'error'} />
        </p>
        <p>{error?.message}</p>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', marginBottom: '16px' }}>
        <Button onClick={handleButtonClick} autoFocus={true}>
          {error?.historyBack ? '返回' : '关闭'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
