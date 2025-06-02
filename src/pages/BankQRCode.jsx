import React from "react";
import { useTranslation } from "react-i18next";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";

const BankQRCode = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("bankQRCode");

  return (
    <div className="flex flex-col items-center w-full h-screen px-8 pb-30 bg-gray-100">
      <div className="relative w-full h-1/10 flex items-center text-black">
        <Link className="" onClick={() => navigate(-1)}>
          <BiChevronLeft size="1.8rem" />
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-xl font-bold text-gray-800">{t("qrCode")}</h2>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 overflow-y-auto">
        <div>
          <p className="text-black text-sm mb-4">{t("message1")}</p>
        </div>
        <div>
          <img src="/qr.png" alt="QR Code" className="w-full mx-auto mb-4" />
        </div>
        <p className="text-black text-sm mb-4">{t("message2")}</p>
      </div>
    </div>
  );
};

export default BankQRCode;
