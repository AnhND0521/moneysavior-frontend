import React, { useContext, useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import environment from "../environments/environment";

const Profile = () => {
  const { setUserUuid, email, setEmail } = useContext(LoginContext);
  const [ emailInput, setEmailInput ] = useState(email);

  const login = async (data) => {
    console.log("Login data: ", data);
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
      setEmail(emailInput);
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let data = {};
    formData.forEach((value, key) => (data[key] = value));

    login(data);
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-screen h-full p-8 bg-gray-100"
      onSubmit={submit}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
            placeholder="Nhập địa chỉ email của bạn"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </div>
        {/* <div>
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
            placeholder="Nhập mật khẩu của bạn"
          />
        </div> */}
        <button
          type="submit"
          className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:shadow-outline"
        >
          Đăng nhập
        </button>
        {/* <div className="text-center text-gray-500 text-sm">
          <a href="#" className="hover:underline focus:outline-none">
            Quên mật khẩu?
          </a>
        </div>
        <div className="text-center text-gray-500 text-sm">
          Chưa có tài khoản?{" "}
          <a
            href="#"
            className="text-primary hover:underline focus:outline-none"
          >
            Đăng ký
          </a>
        </div> */}
      </div>
    </form>
  );
};

export default Profile;
