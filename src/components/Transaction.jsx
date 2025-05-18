import React from "react";
import { formatDateCustom } from "../utils/dateFormatter";
import { Link } from "react-router-dom";

const Transaction = (props) => {
  const { uuid, type, category, description, amount, date } = props.transaction;
  return (
    <Link to={`/transactions/edit/${uuid}`}>
      <div className="w-full px-4 py-2 flex items-center justify-between bg-gray-bg rounded-md">
        <div className="flex-grow">
          {" "}
          {/* Áp dụng flex-grow: 1 */}
          <p className="font-medium">{description}</p>
          <p className="text-gray-text text-sm">
            {formatDateCustom(new Date(date))}
          </p>
        </div>
        <p
          className={`${
            type == "INCOME" ? "text-green" : "text-red"
          } text-lg font-semibold whitespace-nowrap`}
        >
          {type == "INCOME" ? "+" : "-"} {amount.toLocaleString()} ₫
        </p>
      </div>
    </Link>
  );
};

export default Transaction;
