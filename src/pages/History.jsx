import React, { useContext, useEffect, useState } from 'react'
import { BiChevronLeft, BiChevronRight, BiDownload } from 'react-icons/bi'
import Transaction from '../components/Transaction'
import { Link } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContext';
import changeMonth from '../utils/changeMonth';

const History = () => {
  const { userUuid } = useContext(LoginContext);
  const [transactions, setTransactions] = useState([]);
  const now = new Date();
  const [filter, setFilter] = useState({
    type: null,
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  });

  console.log(filter);

  const fetchTransactions = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/transactions?userUuid=${userUuid}${filter.type ? `&type=${filter.type}` : ""}&year=${filter.year}&month=${filter.month}`);

    if (response.ok) {
      const transactionData = await response.json();
      setTransactions(transactionData);
    }
  }

  useEffect(() => {
    fetchTransactions();
  }, [filter]);

  const transactionHistory = transactions.map(transaction => 
    <Transaction
      key={transaction.uuid}
      transaction={transaction}
    />
  );

  return (
    <div className='relative w-screen h-screen bg-white'>
      <div className='w-full h-1/10 flex items-center text-black'>
        <Link to="/" className='absolute left-4'>
          <BiChevronLeft size="1.8rem"/>
        </Link>
        <div className='w-full h-full flex items-center justify-center'>
          <h3 className='font-bold text-lg'>Lịch sử giao dịch</h3>
        </div>
        <button href="/" className='absolute right-4'>
          <BiDownload size="1.8rem"/>
        </button>
      </div>
      <div className='px-6'>
        <div className='flex items-center justify-center gap-8 mb-4'>
          <BiChevronLeft 
            size="1.2rem"
            onClick={() => {
              const { newMonth, newYear } = changeMonth(filter.month, filter.year, -1);
              setFilter({ ...filter, month: newMonth, year: newYear });
            }}/>
          <p className='font-semibold'>Tháng {filter.month}/{filter.year}</p>
          <BiChevronRight 
            size="1.2rem"
            onClick={() => {
              const { newMonth, newYear } = changeMonth(filter.month, filter.year, 1);
              setFilter({ ...filter, month: newMonth, year: newYear });
            }}/>
        </div>
        <select
          name="daterange"
          id="daterange"
          className='w-full h-10 mb-4 rounded-md border border-gray-text text-center text-sm text-gray-text'
          onChange={e => setFilter({ ...filter, type: e.target.value == "ALL" ? null : e.target.value })}
        >
          <option value="ALL" className='text-xs'>Tất cả</option>
          <option value="EXPENSE" className='text-xs'>Chi tiêu</option>
          <option value="INCOME" className='text-xs'>Thu nhập</option>
        </select>
      </div>
      <section className='w-full h-3/5 overflow-y-scroll px-4'>
        <div className='w-full flex flex-col gap-2'>
          {transactionHistory}
        </div>
      </section>
    </div>
  )
}

export default History