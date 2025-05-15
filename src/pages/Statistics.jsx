import React from 'react'
import { BiChevronLeft, BiSort } from 'react-icons/bi'
import DateRangeTabs from '../components/DateRangeTabs'
import Expense from '../components/Expense'
import { Link } from 'react-router-dom';

const Statistics = () => {
  return (
    <div className='relative w-screen h-screen bg-white'>
      <div className='relative w-full h-1/10 flex items-center text-black'>
        <Link to="/" className='absolute left-4'>
          <BiChevronLeft size="1.8rem"/>
        </Link>
        <div className='w-full h-full flex items-center justify-center'>
          <h3 className='font-bold text-lg'>Thống kê</h3>
        </div>
      </div>
      <div className='px-6'>
        <DateRangeTabs />
      </div>
      <section className='w-full px-4'>
        <div className='mb-4 flex items-center justify-between'>
          <h4 className='w-full font-bold text-lg'>Các khoản chi nhiều nhất</h4>
          <BiSort size="1.5rem"/>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <Expense />
          <Expense />
          <Expense />
          <Expense />
        </div>
      </section>
    </div>
  )
}

export default Statistics