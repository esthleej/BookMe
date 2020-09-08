import React, { useContext, Fragment } from 'react';
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../providers/UserProvider';
import { BooksContext } from '../../providers/BooksProvider';
import { signOut } from '../../firebase';
import { MediaQuery } from '../../utils/helpers';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const { setReadingLog, setWishList } = useContext(BooksContext);
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation().pathname;

  const [openMenu, setOpenMenu] = React.useState(null);

  const menuTitle = {
    '/reading-log': 'Reading Log',
    '/wishlist': 'Wish List',
  };

  const handleClick = (event) => {
    setOpenMenu(event.currentTarget);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  const handleSignOut = () => {
    setReadingLog([]);
    setWishList([]);
    signOut();
    setUser(null);
  };

  return (
    <div className={classes.navbarContainer}>
      <div className={classes.navbarLeft}>
        {MediaQuery() ? (
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
        ) : (
          <Fragment>
            <Button
              className={classes.menuIcon}
              onClick={handleClick}
              aria-label="menu-icon"
            >
              <MenuIcon />
            </Button>
            <Typography
              className={classes.menuTitle}
              color="textPrimary"
              variant="body1"
            >
              {menuTitle[location]}
            </Typography>
            <Menu
              id="simple-menu"
              anchorEl={openMenu}
              keepMounted
              open={Boolean(openMenu)}
              onClose={handleClose}
            >
              <MenuItem
                onClick={() => {
                  history.push('/');
                  handleClose();
                }}
              >
                Book Finder
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push('/reading-log');
                  handleClose();
                }}
              >
                Reading Log
              </MenuItem>
              <MenuItem
                onClick={() => {
                  history.push('/wishlist');
                  handleClose();
                }}
              >
                Wish List
              </MenuItem>
            </Menu>
          </Fragment>
        )}
      </div>

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
  navbarLeft: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
  menuIcon: {
    minWidth: 0,
  },
  menuTitle: {
    marginLeft: 10,
  },
  button: {
    whiteSpace: 'nowrap',
  },
}));

export default Navbar;
