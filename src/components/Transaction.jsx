import React from "react";
import { formatDateCustom } from "../utils/dateFormatter";

const Transaction = (props) => {
  const { type, category, description, amount, date } = props.transaction;
  return (
    <div className="w-full h-16 px-4 py-2 flex items-center justify-between bg-gray-bg rounded-md">
      <div>
        <p className="font-medium">{description}</p>
        <p className="text-gray-text text-sm">
          {formatDateCustom(new Date(date))}
        </p>
      </div>
      <p
        className={`${
          type == "INCOME" ? "text-green" : "text-red"
        } text-lg font-semibold`}
      >
        {type == "INCOME" ? "+" : "-"} {amount.toLocaleString()} ₫
      </p>
    </div>
  );
};

export default Transaction;
