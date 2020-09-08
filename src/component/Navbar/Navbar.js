import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { signOut } from '../../firebase';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import { makeStyles } from '@material-ui/core/styles';
import { BooksContext } from '../../providers/BooksProvider';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { setReadingLog, setWishList } = useContext(BooksContext);
  const classes = useStyles();

  const handleSignOut = () => {
    setReadingLog([]);
    setWishList([]);
    signOut();
    setUser(null);
  };

  return (
    <div className={classes.navbarContainer}>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="textPrimary"
          component={RouterLink}
          to="/"
          className={classes.link}
        >
          <HomeIcon className={classes.icon} />
          Book Finder
        </Link>
        <Link
          color="textPrimary"
          component={RouterLink}
          to="/reading-log"
          className={classes.link}
        >
          <MenuBookIcon className={classes.icon} />
          Reading Log
        </Link>
        <Link
          color="textPrimary"
          component={RouterLink}
          to={'/wishlist'}
          className={classes.link}
        >
          <AcUnitIcon className={classes.icon} />
          Wish List
        </Link>
      </Breadcrumbs>

      <div className={classes.navbarRight}>
        {user ? (
          <Link
            color="textPrimary"
            component={RouterLink}
            to={'/'}
            className={classes.buttonLink}
          >
            <Button
              variant="contained"
              color="primary"
              size="small"
              onClick={handleSignOut}
              className={classes.button}
            >
              Sign Out
            </Button>
          </Link>
        ) : (
          <>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={'/login'}
              className={classes.buttonLink}
            >
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.button}
              >
                Log In
              </Button>
            </Link>
            <Link
              color="textPrimary"
              component={RouterLink}
              to={'/signup'}
              className={classes.buttonLink}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                className={classes.button}
              >
                Sign Up
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  navbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 6,
  },
  navbarRight: {
    display: 'flex',
  },
  link: {
    display: 'flex',
  },
  icon: {
    marginRight: theme.spacing(0.5),
    width: 20,
    height: 20,
  },
  buttonLink: {
    marginLeft: 6,
    '&:focus, &:hover, &:visited, &:link, &:active': {
      textDecoration: 'none',
    },
  },
}));

export default Navbar;
