import React, { use, useContext, useEffect, useState } from "react";
import { BiChevronLeft, BiSort } from "react-icons/bi";
import Transaction from "../components/Transaction";
import { Link } from "react-router-dom";
import getDateOptions from "../utils/getDateOptions";
import environment from "../environments/environment";
import { LoginContext } from "../contexts/LoginContext";
import DateRangeTabs from "../components/DateRangeTabs";
import TransactionTimelineChart from "../components/TransactionTimelineChart";
import NoTransactionsText from "../components/NoTransactionsText";

const Statistics = () => {
  const [topTransactions, setTopTransactions] = useState([]);
  const { userUuid } = useContext(LoginContext);

  const [dateRangeType, setDateRangeType] = useState(0);
  const [transactionSummaryData, setTransactionSummaryData] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [transactionType, setTransactionType] = useState("EXPENSE");
  const [sort, setSort] = useState("DESC");

  const toggleSort = () => {
    setSort((prevSort) => (prevSort === "ASC" ? "DESC" : "ASC"));
  };

  const summaryTypes = ["DAILY", "WEEKLY", "MONTHLY", "YEARLY"];

  const fetchTransactionSummary = async () => {
    if (!userUuid) return;
    const response = await fetch(
      `${environment.serverURL}/api/v1/reports/transaction-summary-by-period?userUuid=${userUuid}&transactionType=${transactionType}&summaryType=${summaryTypes[dateRangeType]}`
    );

    if (response.ok) {
      const transactionSummary = await response.json();
      console.log(transactionSummary);
      setTransactionSummaryData(transactionSummary.data);
      setSelectedColumn(
        transactionSummary.data[transactionSummary.data.length - 1]
      );
    }
  };

  useEffect(() => {
    fetchTransactionSummary();
  }, [userUuid, transactionType, dateRangeType]);

  const fetchTopTransactions = async () => {
    if (!userUuid || !selectedColumn) return;
    const response = await fetch(
      `${environment.serverURL}/api/v1/reports/top-transactions?userUuid=${userUuid}&transactionType=${transactionType}&startDate=${selectedColumn.startDate}&endDate=${selectedColumn.endDate}&sortDirection=${sort}`
    );

    if (response.ok) {
      const transactions = (await response.json()).transactions;
      setTopTransactions(transactions);
    }
  };

  useEffect(() => {
    fetchTopTransactions();
  }, [userUuid, selectedColumn, transactionType, sort]);

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
        <select
          name="daterange"
          id="daterange"
          className="w-full h-10 mb-4 rounded-md border border-gray-text text-center text-sm text-gray-text"
          onChange={(e) => {
            setTransactionType(e.target.value);
          }}
          value={transactionType}
        >
          <option value="EXPENSE">Chi tiêu</option>
          <option value="INCOME">Thu nhập</option>
        </select>
        <TransactionTimelineChart
          data={transactionSummaryData}
          setSelectedColumn={setSelectedColumn}
        />
        <div className="mt-4 mb-4 flex items-center justify-between">
          <h4 className="w-full font-bold text-lg">
            Các khoản {transactionType === "EXPENSE" ? "chi  " : "thu "}
            {sort === "DESC" ? "nhiều" : "ít"} nhất
            {selectedColumn ? ` (${selectedColumn.period})` : ""}
          </h4>
          <BiSort
            size="1.5rem"
            className="cursor-pointer"
            onClick={toggleSort}
          />
        </div>
        <div
          className="w-full flex flex-col gap-2 overflow-y-scroll pb-4"
          style={{ maxHeight: "30vh" }}
        >
          {topTransactions.length > 0 ? (
            topTransactions.map((transaction) => (
              <Transaction key={transaction.uuid} transaction={transaction} />
            ))
          ) : (
            <NoTransactionsText />
          )}
        </div>
      </section>
    </div>
  );
};

export default Statistics;
