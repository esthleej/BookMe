import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Typography from '@material-ui/core/Typography';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { auth } from '../../firebase';

const PasswordReset = () => {
  const classes = useStyles();
  const history = useHistory();
  let location = useLocation();
  const [email, setEmail] = React.useState('');
  const [passwordResetError, setPasswordResetError] = useState(null);
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);

  let { from } = location.state || { from: { pathname: '/' } };

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  //   const handleMouseDownPassword = (event) => {
  //     event.preventDefault();
  //   };

  useEffect(() => {
    if (emailHasBeenSent) {
      history.replace(from);
      history.push('/');
    }
  }, [emailHasBeenSent, from, history]);

  const handlePasswordReset = async () => {
    try {
      await auth.sendPasswordResetEmail(email);
      setEmailHasBeenSent(true);
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/invalid-email') {
        setPasswordResetError('The email address is not valid.');
      }
      if (errorCode === 'auth/user-not-found') {
        setPasswordResetError('The email address was not found.');
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.field}>
          <Typography variant="h5">Forgot your password?</Typography>
        </div>
        <div className={classes.field}>
          <Typography variant="body1">
            Enter your email address and we'll send you a recovery link.
          </Typography>
        </div>

        <div className={classes.field}>
          <Typography variant="body1">Email</Typography>
          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <OutlinedInput
              id="outlined-adornment-email"
              value={email}
              error={passwordResetError}
              onChange={handleChange}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
          </FormControl>
          {passwordResetError && (
            <FormHelperText error id="filled-weight-helper-text">
              {passwordResetError}
            </FormHelperText>
          )}
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handlePasswordReset}
        >
          Send recovery email
        </Button>
      </div>
    </div>
  );
};

export default PasswordReset;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    border: '1px solid #ccc',
    borderRadius: 4,
    margin: '60px 0 0 0',
    padding: '20px 20px 30px 20px',
    width: 400,
    minWidth: 300,
  },
  title: {
    paddingBottom: 16,
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: 18,
  },
  button: {
    marginTop: 4,
    width: '100%',
  },
  textField: {
    width: '100%',
  },
  divider: {
    width: '44%',
    margin: '0px 10px',
  },
  dividerContainer: {
    margin: '20px 0',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
