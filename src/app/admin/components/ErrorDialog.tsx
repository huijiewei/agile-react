import { useErrorDispatch, useErrorState } from '@shared/contexts/ErrorContext';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';

const ErrorDialog = () => {
  const error = useErrorState();
  const { resetError } = useErrorDispatch();

  const navigate = useNavigate();

  const handleDialogClose = () => {
    const historyBack = error && error.historyBack;

    resetError();

    if (historyBack) {
      navigate(-1);
    }
  };

  return (
    error && (
      <Dialog open={true} onClose={handleDialogClose}>
        <DialogContent sx={{ textAlign: 'center', minWidth: '320px' }}>
          <p>
            <ErrorOutlineIcon fontSize={'large'} color={'error'} />
          </p>
          <p>{error.message}</p>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', marginBottom: '16px' }}>
          <Button onClick={handleDialogClose} autoFocus={true}>
            {error.historyBack ? '返回' : '关闭'}
          </Button>
        </DialogActions>
      </Dialog>
    )
  );
};

export default ErrorDialog;
