import React from "react";
import { useTranslation } from "react-i18next";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";

const BankAccountForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("bankAccountForm");

  return (
    <div className="flex flex-col items-center w-full h-screen px-8 pb-30 bg-gray-100">
      <div className="relative w-full h-1/10 flex items-center text-black">
        <Link className="" onClick={() => navigate(-1)}>
          <BiChevronLeft size="1.8rem" />
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-xl font-bold text-gray-800">
            {t("linkAccount")}
          </h2>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 overflow-y-auto">
        <div>
          <p className="text-red-700 text-sm mb-4">{t("message1")}</p>
          <p className="text-red-700 text-sm mb-4">
            {t("message2")}
            <Link className="text-blue-600" to="/bank/qr">
              {t("here")}
            </Link>
            {t("message3")}
          </p>
        </div>
        <div>
          <label
            htmlFor="bankName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t("bank")}
          </label>
          <input
            type="text"
            id="bankName"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700 bg-gray-200 cursor-not-allowed"
            value="TPBank (TPB)"
            readOnly
          />
        </div>
        <div>
          <label
            htmlFor="accountNumber"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            {t("accountNumber")}
          </label>
          <input
            type="text"
            id="accountNumber"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:border-primary text-gray-700 bg-gray-200 cursor-not-allowed"
            value="66695595959"
            readOnly
          />
        </div>
        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-700 focus:outline-none focus:shadow-outline"
            onClick={() => {
              alert(t("linkSuccessfully"));
              navigate(-1);
            }}
            disabled
          >
            {t("confirmLink")}
          </button>
          <button
            type="button"
            className="w-full bg-gray-300 text-gray-700 font-bold py-3 rounded-lg hover:bg-gray-400 focus:outline-none focus:shadow-outline"
            onClick={() => navigate(-1)}
          >
            {t("cancel")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountForm;
