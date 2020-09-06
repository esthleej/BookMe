import React, { useState, useEffect, createContext } from 'react';
import { onAuthStateChange } from '../firestore/firestoreAuth';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribeFromAuth = onAuthStateChange(setUser);
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
