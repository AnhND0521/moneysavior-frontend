import React, { use, useContext, useEffect, useState } from "react";
import { BiChevronLeft, BiSort } from "react-icons/bi";
import Transaction from "../components/Transaction";
import { Link } from "react-router-dom";
import getDateOptions from "../utils/getDateOptions";
import environment from "../environments/environment";
import { LoginContext } from "../contexts/LoginContext";
import DateRangeTabs from "../components/DateRangeTabs";
import TransactionTimelineChart from "../components/TransactionTimelineChart";

const Statistics = () => {
  const [topTransactions, setTopTransactions] = useState([]);
  const { userUuid } = useContext(LoginContext);

  const [dateRangeType, setDateRangeType] = useState(0);
  const [transactionSummaryData, setTransactionSummaryData] = useState([]);

  const summaryTypes = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];

  const fetchTransactionSummary = async () => {
    if (!userUuid) return;
    const response = await fetch(
      `${environment.serverURL}/api/v1/reports/transaction-summary-by-period?userUuid=${userUuid}&transactionType=EXPENSE&summaryType=${summaryTypes[dateRangeType]}`
    );

    if (response.ok) {
      const transactionSummary = await response.json();
      console.log(transactionSummary);
      setTransactionSummaryData(transactionSummary.data);
    }
  };

  useEffect(() => {
    fetchTransactionSummary();
  }, [userUuid, dateRangeType]);

  // useEffect(() => {
  //   fetchExpenses();
  // }, [dateRangeType]);

  // const fetchExpenses = async () => {
  // const { month, year } = convertValueToDateOption(selectedOption);
  // const response = await fetch(
  //   `${environment.serverURL}/api/v1/transactions?userUuid=${userUuid}&type=EXPENSE&month=${month}&year=${year}`
  // );

  // if (response.ok) {
  //   const expenses = await response.json();
  //   setTopExpenses(expenses.sort((a, b) => b.amount - a.amount));
  // }
  // };

  // const transactionHistory = topExpenses.map((transaction) => (
  //   <Transaction key={transaction.uuid} transaction={transaction} />
  // ));

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="relative w-full h-1/10 flex items-center text-black">
        <Link to="/" className="absolute left-4">
          <BiChevronLeft size="1.8rem" />
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="font-bold text-lg">Thống kê</h3>
        </div>
      </div>
      <section className="w-full px-6">
        <DateRangeTabs
          dateRange={dateRangeType}
          setDateRange={setDateRangeType}
        />
        <TransactionTimelineChart />
        <div className="mb-4 flex items-center justify-between">
          <h4 className="w-full font-bold text-lg">Các khoản chi nhiều nhất</h4>
          <BiSort size="1.5rem" />
        </div>
        {/* <div className="w-full flex flex-col gap-2">{transactionHistory}</div> */}
      </section>
    </div>
  );
};

export default Statistics;
