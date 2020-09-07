import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';

import { auth, signInWithGoogle } from '../../firebase';

import Link from '@material-ui/core/Link';
import { UserContext } from '../../providers/UserProvider';

const SignUp = () => {
  const classes = useStyles();
  const history = useHistory();
  const { user } = useContext(UserContext);
  let location = useLocation();
  const [values, setValues] = useState({
    password: '',
    email: '',
    showPassword: false,
  });

  const [passwordValidateError, setPasswordValidateError] = useState(null);
  const [emailValidateError, setEmailValidateError] = useState(null);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isPasswordStrong = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
      values.password
    );
    try {
      if (values.email === '' || values.password === '' || !isPasswordStrong) {
        values.email === ''
          ? setEmailValidateError('Email cannot be empty.')
          : setEmailValidateError(null);
        values.password === ''
          ? setPasswordValidateError('Password cannot be empty.')
          : setPasswordValidateError(null);
        !isPasswordStrong
          ? setPasswordValidateError('Password is not strong enough.')
          : setPasswordValidateError(null);
      } else {
        await auth.createUserWithEmailAndPassword(
          values.email,
          values.password
        );
        setEmailValidateError(null);
        setPasswordValidateError(null);
      }
    } catch (error) {
      const errorCode = error.code;
      if (errorCode === 'auth/email-already-in-use') {
        setEmailValidateError(
          'There already exists an account with this email.'
        );
        setPasswordValidateError(null);
      }
      if (errorCode === 'auth/invalid-email') {
        setEmailValidateError('Email address is not valid');
        setPasswordValidateError(null);
      }
      if (errorCode === 'auth/weak-password') {
        setPasswordValidateError('Password is not strong enough');
      }
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.title}>
          <Typography variant="h5">Sign up</Typography>
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
              error={emailValidateError}
              onChange={handleChange('email')}
              aria-describedby="outlined-email-helper-text"
              inputProps={{
                'aria-label': 'email',
              }}
            />
          </FormControl>
          {emailValidateError && (
            <FormHelperText error id="email-error-helper-text">
              {emailValidateError}
            </FormHelperText>
          )}
        </div>
        <div className={classes.field}>
          <Typography variant="body1">Password</Typography>
          <FormControl
            fullWidth
            className={clsx(classes.margin, classes.textField)}
            variant="outlined"
          >
            <OutlinedInput
              id="outlined-adornment-password"
              type={values.showPassword ? 'text' : 'password'}
              value={values.password}
              error={passwordValidateError}
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
          {passwordValidateError && (
            <FormHelperText error id="password-error-helper-text">
              {passwordValidateError}
            </FormHelperText>
          )}
          <FormHelperText id="password-helper-text">
            Passwords must contain at least eight characters, including at least
            1 letter and 1 number.
          </FormHelperText>
        </div>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleSubmit}
          className={classes.button}
        >
          Sign Up
        </Button>

        <Divider className={classes.dividerContainer} />

        <Typography span variant="body2" align="center">
          Already signed up?<span>&nbsp;</span>
          <Link
            variant="body2"
            align="center"
            color="secondary"
            component={RouterLink}
            to={'/login'}
            className={classes.buttonLink}
          >
            Go to login
          </Link>
        </Typography>
      </div>
    </div>
  );
};

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

export default SignUp;
