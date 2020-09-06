import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import clsx from 'clsx';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import Link from '@material-ui/core/Link';
import { signInWithGoogle, signInWithEmailAndPassword } from '../../firebase';

const LogIn = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const history = useHistory();
  let location = useLocation();
  const [values, setValues] = React.useState({
    amount: '',
    password: '',
    email: '',
    showPassword: false,
  });
  const [loginError, setLoginError] = useState(null);

  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (user) {
      history.replace(from);
      history.push('/');
    }
  }, [user, from, history]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async (event) => {
    await signInWithEmailAndPassword(values.email, values.password)
      .then(() => {})
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/too-many-requests') {
          alert(errorMessage);
        } else if (errorCode === 'auth/user-not-found') {
          setLoginError('Email address is not valid');
        } else {
          setLoginError('The email or password is incorrect.');
        }
      });
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h5">Log In</Typography>
        </div>

        <div className={classes.auth}>
          <Button
            variant="outlined"
            color="primary"
            className={classes.button}
            onClick={signInWithGoogle}
          >
            Continue wtih Google
          </Button>
        </div>

        <div className={classes.dividerContainer}>
          <Divider className={classes.divider} />
          <Typography color="textSecondary" variant="caption">
            OR
          </Typography>
          <Divider className={classes.divider} />
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
              value={values.email}
              error={loginError}
              onChange={handleChange('email')}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
          </FormControl>
          {loginError && (
            <FormHelperText error id="filled-weight-helper-text">
              {loginError}
            </FormHelperText>
          )}
        </div>
        <div className={classes.field}>
          <div className={classes.fieldTitle}>
            <Typography variant="body1">Password</Typography>
            <Link
              variant="body2"
              align="center"
              color="secondary"
              component={RouterLink}
              to={'/users/account-recovery'}
              className={classes.buttonLink}
            >
              Forgot Password?
            </Link>
          </div>

          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              onChange={handleChange('password')}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </div>

        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Divider className={classes.dividerContainer} />

        <Typography span variant="body2" align="center">
          Don't have an account?<span>&nbsp;</span>
          <Link
            variant="body2"
            align="center"
            color="secondary"
            component={RouterLink}
            to={'/signup'}
            className={classes.buttonLink}
          >
            Sign Up
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default LogIn;

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
  fieldTitle: {
    display: 'flex',
    justifyContent: 'space-between',
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
