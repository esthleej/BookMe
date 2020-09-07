import React, { useState, useEffect, createContext, useContext } from 'react';
import { UserContext } from './UserProvider';
import SNACKBAR from '../component/SnackBar/snackbarMessages';
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
    if (user && uid) {
      suscribeFromFirestore();
    }
    return () => {
      if (unsubscribeFromFirestore) {
        unsubscribeFromFirestore();
        console.log('unsubscribe');
      }
    };
  }, [user, uid]);

  const addReadingLog = async () => {
    const newBook = {
      title,
      authors: authors[0],
      genre: categories[0],
      startDate: new Date(),
      endDate: '',
      selfLink,
    };
    if (user) {
      try {
        await addBook('readingLog', { ...newBook, userId: uid });
        setSnackbar(SNACKBAR.ADD_TO_READING_LOGS.SUCCESS);
      } catch (error) {
        // setSnackbar(SNACKBAR.ADD_TO_READING_LOGS.ERROR);
      }
    } else {
      setReadingLog([...readingLog, newBook]);
      setSnackbar(SNACKBAR.CREATE_ACCOUNT_TO_SAVE.SUCCESS);
    }
    setBookDetail(null);
    setBookDetailVisibility(false);
    setSnackbarVisibility(true);
  };

  const addWishList = async () => {
    const newBook = {
      name: 'unassigned',
      title,
      authors: authors[0],
      genre: categories[0],
      selfLink,
    };
    if (user) {
      try {
        await addBook('wishList', { ...newBook, userId: uid });
        setSnackbar(SNACKBAR.ADD_TO_WISH_LIST.SUCCESS);
      } catch (error) {
        // setSnackbar(SNACKBAR.ADD_TO_WISH_LIST.ERROR);
      }
    } else {
      setWishList([...wishList, newBook]);
      setSnackbar(SNACKBAR.CREATE_ACCOUNT_TO_SAVE.SUCCESS);
    }
    setBookDetail(null);
    setBookDetailVisibility(false);
    setSnackbarVisibility(true);
  };

  const moveWishToRead = async () => {
    const newBook = {
      title,
      authors: authors[0],
      startDate: new Date(),
      endDate: '',
      genre: categories[0],
      selfLink,
    };
    if (user) {
      try {
        await addBook('readingLog', { ...newBook, userId: uid });
        moveBook(selfLink);

        setSnackbar(SNACKBAR.MOVE_TO_READING_LOGS.SUCCESS);
      } catch {
        // setSnackbar(SNACKBAR.MOVE_TO_READING_LOGS.ERROR);
      }
    } else {
      const newList = wishList.filter((item) => {
        return item.selfLink !== selfLink;
      });
      setReadingLog([...readingLog, newBook]);
      setWishList(newList);
      setSnackbar(SNACKBAR.CREATE_ACCOUNT_TO_SAVE.SUCCESS);
    }
    setBookDetail(null);
    setBookDetailVisibility(false);
    setSnackbarVisibility(true);
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
