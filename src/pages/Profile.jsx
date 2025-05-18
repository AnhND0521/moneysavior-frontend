import React, { use, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import environment from "../environments/environment";
import CustomCombobox from "../components/CustomCombobox";

const LOGIN = 0;
const SIGNUP = 1;
const PROFILE = 2;

const pageTitles = ["Đăng nhập", "Đăng ký", "Thông tin tài khoản"];
const submitTitles = ["Đăng nhập", "Đăng ký", "Đăng xuất"];

const Profile = () => {
  const { userUuid, setUserUuid, email, setEmail, fullName, setFullName } =
    useContext(LoginContext);
  const [emailInput, setEmailInput] = useState(email);
  const [fullNameInput, setFullNameInput] = useState(fullName);
  const [action, setAction] = useState(userUuid ? PROFILE : LOGIN);
  const [errors, setErrors] = useState({}); // State để lưu trữ lỗi
  const navigate = useNavigate();

  const [sampleEmails, setSampleEmails] = useState([]);

  useEffect(() => {
    setAction(userUuid ? PROFILE : LOGIN);
    setEmailInput(email);
    setFullNameInput(fullName);
  }, [userUuid]);

  useEffect(() => {
    const fetchSampleEmails = async () => {
      const response = await fetch(`${environment.serverURL}/api/v1/accounts`);
      if (response.ok) {
        const data = await response.json();
        setSampleEmails(data);
      }
    };
    fetchSampleEmails();
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validate = () => {
    let isValid = true;
    const newErrors = {};

    if (!emailInput.trim()) {
      newErrors.email = "Email không được để trống";
      isValid = false;
    } else if (!validateEmail(emailInput)) {
      newErrors.email = "Email không đúng định dạng";
      isValid = false;
    }

    if (action !== LOGIN && !fullNameInput.trim()) {
      newErrors.fullName = "Tên đầy đủ không được để trống";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async (data) => {
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
      if (responseData.userUuid) {
        setUserUuid(responseData.userUuid);
        setFullName(responseData.fullName);
        setFullNameInput(responseData.fullName);
        setEmail(emailInput);
        setAction(PROFILE);
        navigate("/");
      } else {
        setFullNameInput("");
        setAction(SIGNUP);
      }
    } else {
      setErrors({ submit: "Đăng nhập không thành công" }); // Ví dụ lỗi chung khi đăng nhập
    }
  };

  const handleSignUp = async (data) => {
    console.log("Sign up data: ", data);
    const response = await fetch(
      `${environment.serverURL}/api/v1/accounts:fake-sign-up`,
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
      setFullNameInput(responseData.fullName);
      setEmail(emailInput);
      setAction(PROFILE);
      navigate("/");
    } else {
      setErrors({ submit: "Đăng ký không thành công" }); // Ví dụ lỗi chung khi đăng ký
    }
  };

  const handleLogout = () => {
    setUserUuid(null);
    setEmail(null);
    setFullName(null);
    setEmailInput("");
    setFullNameInput("");
    setAction(LOGIN);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (validate()) {
      let data = {};
      switch (action) {
        case LOGIN:
          data = {
            email: emailInput,
          };
          handleLogin(data);
          break;
        case SIGNUP:
          data = {
            email: emailInput,
            fullName: fullNameInput,
          };
          handleSignUp(data);
          break;
        case PROFILE:
          handleLogout();
          break;
        default:
          break;
      }
    }
  };

  const handleEmailInputChange = (newEmail) => {
    setEmailInput(newEmail);
  };

  return (
    <form
      className="flex flex-col items-center justify-center w-full h-screen p-8 bg-gray-100"
      onSubmit={submit}
    >
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          {pageTitles[action]}
        </h2>
        <div>
          {action === LOGIN ? (
            <CustomCombobox
              label="Email"
              options={sampleEmails}
              placeholder={"Nhập địa chỉ email của bạn"}
              value={emailInput}
              onChange={handleEmailInputChange}
            />
          ) : (
            <>
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
                placeholder="Nhập địa chỉ email của bạn"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                disabled={action === PROFILE}
              />
            </>
          )}
          {errors.email && (
            <p className="text-red-500 text-xs italic">{errors.email}</p>
          )}
        </div>
        {action !== LOGIN && (
          <div>
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tên đầy đủ
            </label>
            <input
              type="text"
              name="fullName"
              id="fullName"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700"
              placeholder="Nhập tên của bạn"
              value={fullNameInput}
              onChange={(e) => setFullNameInput(e.target.value)}
              disabled={action === PROFILE}
            />
            {errors.fullName && (
              <p className="text-red-500 text-xs italic">{errors.fullName}</p>
            )}
          </div>
        )}
        {errors.submit && (
          <p className="text-red-500 text-sm italic text-center">
            {errors.submit}
          </p>
        )}
        <div className="flex flex-col items-center gap-3">
          <button
            type="submit"
            className="w-full bg-primary text-white font-bold py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:shadow-outline"
          >
            {submitTitles[action]}
          </button>
          {action === SIGNUP && (
            <button
              type="button"
              className="w-full bg-red-400 text-white font-bold py-3 rounded-lg hover:bg-primary-dark focus:outline-none focus:shadow-outline"
              onClick={handleLogout}
            >
              Hủy
            </button>
          )}
        </div>
      </div>
    </form>
  );
};

export default Profile;
