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
  const docRef = await firestore.collection(collection).doc();
  docRef.set({
    ...book,
    id: docRef.id,
  });
};

export const deleteBook = async (collection, id) => {
  await firestore.doc(`${collection}/${id}`).delete();
};

export const editBook = async (collection, id, book) => {
  await firestore.doc(`${collection}/${id}`).set({ ...book });
};

export const moveBook = async (id) => {
  await firestore.doc(`wishList/${id}`).delete();
};

export const subscribeList = (collection, setList, uid) => {
  return firestore
    .collection(collection)
    .where('userId', '==', uid)
    .onSnapshot((snapshot) => {
      let list;
      list = snapshot.docs.map(collectDocsAndId);
      setList(list);
    });
};
