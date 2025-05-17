import React, { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext';
import environment from '../environments/environment';

const Profile = () => {
  const { setUserUuid } = useContext(LoginContext);
  
  const login = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {}
    formData.forEach((value, key) => data[key] = value);

    const response = await fetch(`${environment.serverURL}/api/v1/accounts:fake-login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (response.ok) {
      const responseData = await response.json();
      setUserUuid(responseData.userUuid);
    }
  }

  return (
    <form className="w-screen h-full p-16"
      onSubmit={login}
    >
      <input 
        type="email"
        name="email" 
        id="email" 
        className="w-full h-16 px-4 py-2 bg-gray-chat rounded-lg"
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default Profile