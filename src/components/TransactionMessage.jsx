import React from "react";
import { formatDateCustom } from "../utils/dateFormatter";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const TransactionMessage = (props) => {
  const { uuid, type, category, description, amount, date } = props.message;
  const { t } = useTranslation("common");

  return (
    <Link to={`/transactions/edit/${uuid}`}>
      <div className="w-full px-4 py-2 bg-gray-bg rounded-lg">
        <div className="w-full flex justify-between text-sm text-gray-text">
          <p>{t("recorded")}</p>
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
          <p className="text-sm text-gray-text">{"> " + t("income")}</p>
        ) : (
          <p className="text-sm text-gray-text">
            {"> " + t("expense") + " > "}
            {t("categories." + category)}
          </p>
        )}
      </div>
    </Link>
  );
};

export default TransactionMessage;
