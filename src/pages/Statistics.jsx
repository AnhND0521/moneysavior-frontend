import React, { useContext, useEffect, useState } from "react";
import { BiChevronLeft, BiSort } from "react-icons/bi";
import Transaction from "../components/Transaction";
import { Link } from "react-router-dom";
import getDateOptions from "../utils/getDateOptions";
import environment from "../environments/environment";
import { LoginContext } from "../contexts/LoginContext";

const Statistics = () => {
  const [topExpenses, setTopExpenses] = useState([]);
  const { userUuid } = useContext(LoginContext);

  const dateOptions = getDateOptions(2);
  const [selectedOption, setSelectedOption] = useState(`${dateOptions[0].label}`);

  useEffect(() => {
    fetchExpenses();
  }, [selectedOption]);

  const convertValueToDateOption = (value) => {
    const [ month, year ] = value.split("/");
    return {
      month: +month,
      year: +year
    };
  };

  const fetchExpenses = async () => {
    const { month, year } = convertValueToDateOption(selectedOption);
    const response = await fetch(
      `${environment.serverURL}/api/v1/transactions?userUuid=${userUuid}&type=EXPENSE&month=${month}&year=${year}`
    );

    if (response.ok) {
      const expenses = (await response.json()).data;
      setTopExpenses(expenses.sort((a, b) => b.amount - a.amount));
    }
  };

  const transactionHistory = topExpenses.map((transaction) => (
    <Transaction key={transaction.uuid} transaction={transaction} />
  ));

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="relative w-full h-1/10 flex items-center text-black">
        <Link to="/" className="absolute left-4">
          <BiChevronLeft size="1.8rem"/>
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="font-bold text-lg">Thống kê</h3>
        </div>
      </div>
      <div className="px-6">
        <select
          name="daterange"
          id="daterange"
          className="w-full h-10 mb-4 rounded-md border border-gray-text text-center text-sm text-gray-text"
          onChange={(e) => {
            setSelectedOption(e.target.value);
          }}
          value={selectedOption}
        >
          {dateOptions.map((option) => (
            <option
              key={option.label}
              value={option.label}
              className="text-xs"
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <section className="w-full px-6">
        <div className="mb-4 flex items-center justify-between">
          <h4 className="w-full font-bold text-lg">Các khoản chi nhiều nhất</h4>
          <BiSort size="1.5rem"/>
        </div>
        <div className="w-full flex flex-col gap-2">
          {transactionHistory}
        </div>
      </section>
    </div>
  )
}

export default Statistics;
