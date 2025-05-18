import { createContext, useEffect, useState } from "react";
import environment from "../environments/environment";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userUuid, setUserUuid] = useState(
    localStorage.getItem("userUuid") || null
  );
  const [email, setEmail] = useState(
    localStorage.getItem("email") || "nguyenducanh2105@gmail.com"
  );
  const [fullName, setFullName] = useState(
    localStorage.getItem("fullName") || ""
  );

  const saveUserUuid = (uuid) => {
    setUserUuid(uuid);
    if (uuid === null) {
      localStorage.removeItem("userUuid");
    } else {
      localStorage.setItem("userUuid", uuid);
    }
  };
  const saveEmail = (email) => {
    setEmail(email);
    if (email === null) {
      localStorage.removeItem("email");
    } else {
      localStorage.setItem("email", email);
    }
  }
  const saveFullName = (name) => {
    setFullName(name);
    if (name === null) {
      localStorage.removeItem("fullName");
    } else {
      localStorage.setItem("fullName", name);
    }
  };

  const init = async () => {
    if (userUuid === null) {
      const data = {
        email: email,
      };
      const response = await fetch(
        `${environment.serverURL}/api/v1/accounts:fake-login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setUserUuid(responseData.userUuid);
        setFullName(responseData.fullName);
      }
    }
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <LoginContext.Provider
      value={{
        userUuid,
        setUserUuid: saveUserUuid,
        email,
        setEmail: saveEmail,
        fullName,
        setFullName: saveFullName,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
