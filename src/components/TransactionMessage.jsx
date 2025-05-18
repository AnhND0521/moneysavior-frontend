import React from "react";
import { formatDateCustom } from "../utils/dateFormatter";

const TransactionMessage = (props) => {
  const { type, category, description, amount, date } = props.message;

  return (
    <div className="w-full px-4 py-2 bg-gray-bg rounded-lg">
      <div className="w-full flex justify-between text-sm text-gray-text">
        <p>Đã ghi nhận</p>
        <p>{formatDateCustom(new Date(date))}</p>
      </div>
      <div className="w-full flex justify-between">
        <p className="text-xl font-semibold">{description}</p>
        <p
          className={`text-xl font-semibold ${
            type == "INCOME" ? "text-green" : "text-red"
          }`}
        >
          {type == "INCOME" ? "+" : "-"} {amount.toLocaleString()} ₫
        </p>
      </div>
      {type == "INCOME" ? (
        <p className="text-sm text-gray-text">{"> "}Thu nhập</p>
      ) : (
        <p className="text-sm text-gray-text">
          {"> "}Chi tiêu{" > "}
          {category}
        </p>
      )}
    </div>
  );
};

export default TransactionMessage;
