import React, { useContext, useEffect, useState } from "react";
import { BiChevronLeft, BiChevronRight, BiDownload } from "react-icons/bi";
import Transaction from "../components/Transaction";
import { Link } from "react-router-dom";
import { LoginContext } from "../contexts/LoginContext";
import changeMonth from "../utils/changeMonth";
import environment from "../environments/environment";
import NoTransactionsText from "../components/NoTransactionsText";

const History = () => {
  const { userUuid } = useContext(LoginContext);
  const [transactions, setTransactions] = useState([]);
  const now = new Date();
  const [filter, setFilter] = useState({
    type: null,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });
  const [categories, setCategories] = useState([]);

  const fetchCategories = async () => {
    const response = await fetch(`${environment.serverURL}/api/v1/categories`);

    if (response.ok) {
      const categoryData = await response.json();
      setCategories(categoryData);
    }
  };

  const fetchTransactions = async () => {
    const response = await fetch(
      `${environment.serverURL}/api/v1/transactions?userUuid=${userUuid}${
        filter.type ? `&type=${filter.type}` : ""
      }&${filter.category ? `&category=${filter.category}` : ""}&year=${
        filter.year
      }&month=${filter.month}`
    );

    if (response.ok) {
      const transactionData = await response.json();
      setTransactions(transactionData);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const transactionHistory = transactions.map((transaction) => (
    <Transaction key={transaction.uuid} transaction={transaction} />
  ));

  const handleFilterChange = (e) => {
    let type;
    let category = null;
    if (e.target.value == "ALL") {
      type = null;
    } else if (e.target.value == "INCOME") {
      type = "INCOME";
    } else {
      type = "EXPENSE";
      if (e.target.value.includes("|")) {
        const split = e.target.value.split("|");
        category = split[1];
      }
    }
    const newFilter = {
      ...filter,
      type: type,
      category: category,
    };
    console.log("Filter: ", newFilter);
    setFilter(newFilter);
  };

  return (
    <div className="relative w-screen h-screen bg-white">
      <div className="w-full h-1/10 flex items-center text-black">
        <Link to="/" className="absolute left-4">
          <BiChevronLeft size="1.8rem" />
        </Link>
        <div className="w-full h-full flex items-center justify-center">
          <h3 className="font-bold text-lg">Lịch sử giao dịch</h3>
        </div>
        <button href="/" className="absolute right-4">
          <BiDownload size="1.8rem" />
        </button>
      </div>
      <div className="px-6">
        <div className="flex items-center justify-center gap-8 mb-4">
          <BiChevronLeft
            size="1.2rem"
            onClick={() => {
              const { newMonth, newYear } = changeMonth(
                filter.month,
                filter.year,
                -1
              );
              setFilter({ ...filter, month: newMonth, year: newYear });
            }}
          />
          <p className="font-semibold">
            Tháng {filter.month}/{filter.year}
          </p>
          <BiChevronRight
            size="1.2rem"
            onClick={() => {
              const { newMonth, newYear } = changeMonth(
                filter.month,
                filter.year,
                1
              );
              setFilter({ ...filter, month: newMonth, year: newYear });
            }}
          />
        </div>
        <select
          name="daterange"
          id="daterange"
          className="w-full h-10 mb-4 rounded-md border border-gray-text text-center text-sm text-gray-text"
          onChange={handleFilterChange}
        >
          <option key="ALL" value="ALL" className="text-xs">
            Tất cả
          </option>
          <option key="INCOME" value="INCOME" className="text-xs">
            Thu nhập
          </option>
          <option key="EXPENSE" value="EXPENSE" className="text-xs">
            Chi tiêu
          </option>
          {categories.map((category) => (
            <option
              key={category}
              value={"EXPENSE|" + category}
              className="text-xs"
            >
              Chi tiêu - {category}
            </option>
          ))}
        </select>
      </div>
      <section className="w-full h-3/5 overflow-y-scroll px-4">
        <div className="w-full flex flex-col gap-2">
          {transactionHistory.length > 0 ? (
            transactionHistory
          ) : (
            <NoTransactionsText />
          )}
        </div>
      </section>
    </div>
  );
};

export default History;
