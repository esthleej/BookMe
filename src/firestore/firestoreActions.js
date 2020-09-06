import { firestore } from '../firebase';

export const collectDocsAndId = (doc) => {
  let startDate = doc.data().startDate;
  let endDate = doc.data().endDate;

  if (startDate !== '' && startDate !== undefined) {
    startDate = doc.data().startDate.toDate();
  }

  if (endDate !== '' && endDate !== undefined) {
    endDate = doc.data().endDate.toDate();
  }

  return {
    ...doc.data(),
    id: doc.id,
    startDate,
    endDate,
  };
};

export const addBook = async (collection, book) => {
  const docRef = await firestore.collection(collection).add(book);
  return docRef;
};

export const deleteBook = async (collection, id) => {
  await firestore.doc(`${collection}/${id}`).delete();
};

export const editBook = async (collection, id, book) => {
  await firestore.doc(`${collection}/${id}`).set({ ...book });
};

export const moveBook = async (selfLink) => {
  const bookRef = await firestore
    .collection('wishList')
    .where('selfLink', '==', selfLink);

  bookRef.onSnapshot((snapshot) => {
    snapshot.forEach((doc) => doc.ref.delete());
  });
};

export const subscribeBooks = async (setReadingLog, setWishList, uid) => {
  let readingLog;
  let wishList;
  firestore
    .collection('readingLog')
    .where('userId', '==', uid)
    .onSnapshot((snapshot) => {
      readingLog = snapshot.docs.map(collectDocsAndId);
      setReadingLog(readingLog);
    });
  firestore
    .collection('wishList')
    .where('userId', '==', uid)
    .onSnapshot((snapshot) => {
      wishList = snapshot.docs.map(collectDocsAndId);
      setWishList(wishList);
    });
};

// export const getList = async (collection, uid) => {
//   const snapshot = await firestore
//     .collection(collection)
//     .where('userId', '==', uid)
//     .get();
//   return snapshot.docs.map(collectDocsAndId);
// };
