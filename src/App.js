import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from './component/Navbar/Navbar';
import Search from './pages/Search/Search';
import Table from './pages/Table/Table';
import LogIn from './pages/LogIn/LogIn';
import SignUp from './pages/SignUp/SignUp';
import PasswordReset from './pages/ResetPassword/ResetPassword';
import SnackBar from './component/SnackBar/SnackBar';
import BookDetail from './component/BookDetail/BookDetail';

import { readingLogTable, wishListTable } from './pages/Table/tableSettings';
import { BooksContext } from './providers/BooksProvider';

const App = () => {
  const { wishList, setWishList, readingLog, setReadingLog } = useContext(
    BooksContext
  );

  return (
    <>
      <Navbar />
      <Switch>
        <Route path={`/`} exact component={Search} />
        <Route path={`/signup`} exact component={SignUp} />
        <Route path={`/login`} exact component={LogIn} />
        <Route
          path={`/users/account-recovery`}
          exact
          component={PasswordReset}
        />
        <Route
          path={`/reading-log`}
          exact
          component={() => (
            <Table
              title="Reading Log"
              type="readingLog"
              table={readingLog}
              setTable={setReadingLog}
              tableSetting={readingLogTable}
            />
          )}
        />
        <Route
          path={`/wishlist`}
          exact
          component={() => (
            <Table
              title="Wish List"
              type="wishList"
              table={wishList}
              setTable={setWishList}
              tableSetting={wishListTable}
            />
          )}
        />
      </Switch>
      <SnackBar />
      <BookDetail />
    </>
  );
};

export default App;
