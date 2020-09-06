import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserContext } from './UserProvider';
import {
  subscribeBooks,
  addBook,
  deleteBook,
  editBook,
  moveBook,
} from '../firestore/firestoreActions';
import { auth } from '../firebase';
import _ from 'lodash';

export const BooksContext = createContext();

const BooksProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [readingLog, setReadingLog] = useState([]);
  const [wishList, setWishList] = useState([]);
  // const [error, setError] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [bookDetail, setBookDetail] = useState(null);
  const [isBookDetail, setBookDetailVisibility] = useState(false);
  const [snackbar, setSnackbar] = useState('');
  const [isSnackbar, setSnackbarVisibility] = useState(false);
  const [type, setType] = useState('');

  const { title, authors = ['N/A'], categories = ['N/A'], selfLink } =
    bookDetail || {};

  const { uid } = auth.currentUser || {};

  useEffect(() => {
    let unsubscribeFromFirestore;

    async function suscribeFromFirestore() {
      unsubscribeFromFirestore = await subscribeBooks(
        setReadingLog,
        setWishList,
        uid
      );
    }
    if (user) {
      suscribeFromFirestore();
    }
    return () => {
      if (unsubscribeFromFirestore) {
        unsubscribeFromFirestore();
      }
    };
  }, [user, setReadingLog, setWishList, uid]);

  const addReadingLog = async () => {
    const newBook = {
      title,
      authors: authors[0],
      genre: categories[0],
      startDate: new Date(),
      endDate: '',
      selfLink,
      userId: uid,
    };
    if (user) {
      await addBook('readingLog', newBook);
      setBookDetail(null);
      setBookDetailVisibility(false);
      setSnackbar({
        message: 'Success! Your book was saved to your reading logs!',
        type: 'success',
      });
      setSnackbarVisibility(true);
    } else {
      setReadingLog([...readingLog, { ...newBook }]);
      setBookDetail(null);
      setBookDetailVisibility(false);
      setSnackbar({
        message: 'Success! Create an account to save your log!',
        type: 'success',
      });
      setSnackbarVisibility(true);
    }
  };

  const addWishList = async () => {
    const newBook = {
      name: 'unassigned',
      title,
      authors: authors[0],
      genre: categories[0],
      selfLink,
      userId: uid,
    };
    if (user) {
      await addBook('wishList', newBook);
      setBookDetail(null);
      setBookDetailVisibility(false);
      setSnackbar({
        message: 'Success! Your book was saved to your wishlist!',
        type: 'success',
      });
      setSnackbarVisibility(true);
    } else {
      setWishList([...wishList, { ...newBook }]);
      setBookDetail(null);
      setBookDetailVisibility(false);
      setSnackbar({
        message: 'Success! Create an account to save your log!',
        type: 'success',
      });
      setSnackbarVisibility(true);
    }
  };

  const moveWishToRead = async () => {
    const newBook = {
      title,
      authors: authors[0],
      startDate: new Date(),
      endDate: '',
      genre: categories[0],
      selfLink,
      userId: uid,
    };
    if (user) {
      await addBook('readingLog', newBook);
      moveBook(selfLink);
      setBookDetail(null);
      setBookDetailVisibility(false);
      setSnackbar({
        message: 'Success! Your book was moved to reading logs!',
        type: 'success',
      });
      setSnackbarVisibility(true);
    } else {
      const newList = wishList.filter((item) => {
        return item.selfLink !== selfLink;
      });
      setReadingLog([...readingLog, newBook]);
      setWishList(newList);
      setBookDetail(null);
      setBookDetailVisibility(false);
      setSnackbar({
        message: 'Success! Create an account to save your log!',
        type: 'success',
      });
      setSnackbarVisibility(true);
    }
  };

  const editList = (type, oldData, newData, setTable, table) => {
    let dates;
    if (newData.startDate !== undefined) {
      dates = {
        startDate: new Date(newData.startDate),
        endDate: newData.endDate === '' ? '' : new Date(newData.endDate),
      };
    }

    if (user) {
      let newBook = {
        ...newData,
        ...dates,
      };
      newBook = _.omit(newBook, 'tableData');
      editBook(type, oldData.id, newBook);
    } else {
      const dataUpdate = [...table];
      const index = oldData.tableData.id;
      dataUpdate[index] = newData;
      setTable([...dataUpdate]);
    }
  };

  const deleteList = (type, oldData, setTable, table) => {
    if (user) {
      deleteBook(type, oldData.id);
    } else {
      const dataDelete = [...table];
      const index = oldData.tableData.id;
      dataDelete.splice(index, 1);
      setTable([...dataDelete]);
    }
  };

  return (
    <BooksContext.Provider
      value={{
        readingLog,
        setReadingLog,
        wishList,
        setWishList,
        addReadingLog,
        addWishList,
        moveWishToRead,
        deleteList,
        editList,
        type,
        setType,
        bookDetail,
        setBookDetail,
        isBookDetail,
        setBookDetailVisibility,
        snackbar,
        setSnackbar,
        isSnackbar,
        setSnackbarVisibility,
      }}
    >
      {children}
    </BooksContext.Provider>
  );
};

export default BooksProvider;
