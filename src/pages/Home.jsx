import React, { useContext, useEffect, useState } from 'react'
import { BiChevronUp, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import DateRangeTabs from '../components/DateRangeTabs'
import CategoryChart from '../components/CategoryChart'
import { LoginContext } from '../contexts/LoginContext'
import getDateRange from '../utils/getDateRange'
import formatDate from '../utils/formatDate'

const Home = () => {
  const { userUuid } = useContext(LoginContext);
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  const startDate = formatDate(firstDayOfMonth);
  const endDate = formatDate(lastDayOfMonth);

  const [overview, setOverview] = useState({
    balance: 0,
    totalIncomes: 0,
    totalExpenses: 0,
  });
  const [categorySummary, setCategorySummary] = useState([]);

  const [dateRange, setDateRange] = useState(0);

  const fetchOverview = async () => {
    const response = await fetch(`http://127.0.0.1:8080/api/v1/reports/overview?userUuid=${userUuid}&startDate=${startDate}&endDate=${endDate}`);

    if (response.ok) {
      const overviewData = await response.json();
      setOverview(overviewData);
    }
  }

  const fetchCategorySummary = async () => {
    const { start, end } = getDateRange(dateRange);
    const response = await fetch(`http://127.0.0.1:8080/api/v1/reports/category-summary?userUuid=${userUuid}&startDate=${start}&endDate=${end}`);

    if (response.ok) {
      const categorySummaryData = await response.json();
      setCategorySummary(categorySummaryData)
    }
  }

  useEffect(() => {
    fetchOverview();
  }, []);

  useEffect(() => {
    fetchCategorySummary();
  }, [dateRange]);

  return (
    <>
      <div className='relative w-screen h-screen bg-white'>
        <div className='w-full h-1/3 mb-6'>
          <div className='w-full h-2/3 bg-primary px-4'>
            <div className='w-full h-2/3 flex flex-col justify-center'>
              <p className='text-white text-sm'>Xin chào,</p>
              <h3 className='text-white text-lg font-medium'>Ngô Đình Diệm</h3>
            </div>
          </div>
          <div className='absolute top-2/9 w-full h-5 rounded-b-[50%] bg-primary'></div>
          <div className='absolute top-1/8 w-full h-1/5 px-4'>
            <div className='w-full h-full p-4 flex flex-col justify-between bg-secondary rounded-2xl shadow-xl text-white'> 
              <div>
                <h4 className='flex items-center gap-1 text-sm font-medium'>Tổng số dư <BiChevronUp size="1.2rem"/></h4>
                <h2 className='text-2xl font-bold'>₫ {overview.balance.toLocaleString()}</h2>
              </div>
              <div className='w-full flex'>
                <div className='w-1/2'>
                  <div className='flex items-center gap-1'>
                    <div className='p-1 rounded-full bg-white-transparent'><BiUpArrowAlt /></div>
                    <p className='text-sm text-lightGray-text'>Thu nhập</p>
                  </div>
                  <h3 className='font-semibold'>₫ {overview.totalIncomes.toLocaleString()}</h3>
                </div>
                <div>
                  <div className='flex items-center gap-1'>
                    <div className='p-1 rounded-full bg-white-transparent'><BiDownArrowAlt /></div>
                    <p className='text-sm text-lightGray-text'>Chi tiêu</p>
                  </div>
                  <h3 className='font-semibold'>₫ {overview.totalExpenses.toLocaleString()}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='px-6'>
          <DateRangeTabs dateRange={dateRange}setDateRange={setDateRange} />
          <select
            name="daterange"
            id="daterange"
            className='w-full h-10 mb-4 rounded-md border border-gray-text text-center text-sm text-gray-text'
          >
            <option value="">12/05/2025</option>
            <option value="">12/05/2025 - 18/05/2025</option>
            <option value="">05/2025</option>
            <option value="">2025</option>
          </select>
        </div>
        <div className='w-full h-1/3'>
          <CategoryChart categorySummary={categorySummary}/>
        </div>
      </div>
    </>
  )
}

export default Home