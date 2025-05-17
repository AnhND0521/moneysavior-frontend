import { createContext, useEffect, useState } from "react";
import environment from "../environments/environment";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [userUuid, setUserUuid] = useState(null);
  const [email, setEmail] = useState("nguyenducanh2105@gmail.com");
  const [fullName, setFullName] = useState("");

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
    <LoginContext.Provider value={{ userUuid, setUserUuid, email, setEmail, fullName, setFullName }}>
      {children}
    </LoginContext.Provider>
  );
};
