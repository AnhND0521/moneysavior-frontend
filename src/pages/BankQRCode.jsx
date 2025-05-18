import React from "react";
import { BiChevronLeft } from "react-icons/bi";
import { useNavigate, Link } from "react-router-dom";

const BankQRCode = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center w-screen h-screen px-8 pb-30 bg-gray-100">
      <div className="relative w-full h-1/10 flex items-center text-black">
        <Link className="" onClick={() => navigate(-1)}>
          <BiChevronLeft size="1.8rem" />
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h2 className="text-xl font-bold text-gray-800">
            Mã QR chuyển khoản
          </h2>
        </div>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8 space-y-6 overflow-y-auto">
        <div>
          <p className="text-black text-sm mb-4">
            Bạn có thể thử chuyển khoản vào tài khoản dưới đây để quan sát giao
            dịch thu nhập được đồng bộ vào ứng dụng.
          </p>
        </div>
        <div>
          <img
            src="/src/assets/qr.png"
            alt="QR Code"
            className="w-full mx-auto mb-4"
          />
        </div>
        <p className="text-black text-sm mb-4">
          Sau khi chuyển khoản thành công, bạn có thể kiểm tra lại lịch sử giao
          dịch hoặc lịch sử trò chuyện với chatbot để xác nhận giao dịch đã được
          ghi nhận vào ứng dụng.
        </p>
      </div>
    </div>
  );
};

export default BankQRCode;
