import { createContext, useContext, useState } from "react";

const authContext = createContext();

const useProvideAuth = () => {
  const [user, setUser] = useState(null);

  const signIn = (user) => {
    setUser(user);
  };

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    signIn,
    signOut,
  };
};

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();

  return <authContext.Provider value={auth}> {children} </authContext.Provider>;
};

export const useAuth = () => useContext(authContext);
