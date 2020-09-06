import { auth } from '../firebase';

export const onAuthStateChange = (callback) => {
  return auth.onAuthStateChanged((user) => {
    if (user) {
      callback(user);
    } else {
      callback(null);
    }
  });
};
