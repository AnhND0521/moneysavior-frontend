import { createContext, useState } from 'react';

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userUuid, setUserUuid] = useState(null);

  return (
    <LoginContext.Provider value={{ userUuid, setUserUuid }}>
      {children}
    </LoginContext.Provider>
  );
};