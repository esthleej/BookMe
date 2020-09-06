import React, { useContext } from 'react';
import { BooksContext } from '../../providers/BooksProvider';
import Snackbar from '@material-ui/core/Snackbar';
import { Fade } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';

const SnackBar = () => {
  const classes = useStyles();
  const { snackbar, isSnackbar, setSnackbarVisibility } = useContext(
    BooksContext
  );
  const { message, type } = snackbar || {};

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return setSnackbarVisibility(false);
    }
    setSnackbarVisibility(false);
  };

  const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  };

  return (
    <div className={classes.root}>
      <Snackbar
        open={isSnackbar}
        autoHideDuration={1800}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <Alert severity={type}>{message}</Alert>
      </Snackbar>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default SnackBar;
