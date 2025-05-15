import React from 'react'
import { BiChevronLeft, BiChevronRight, BiDownload } from 'react-icons/bi'
import Expense from '../components/Expense'
import { Link } from 'react-router-dom';

const History = () => {
  return (
    <div className='relative w-screen h-screen bg-white'>
      <div className='relative w-full h-1/10 flex items-center text-black'>
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
          <BiChevronLeft size="1.2rem"/>
          <p className='font-semibold'>Tháng 5/2025</p>
          <BiChevronRight size="1.2rem"/>
        </div>
        <select
          name="daterange"
          id="daterange"
          className='w-full h-10 mb-4 rounded-md border border-gray-text text-center text-sm text-gray-text'
        >
          <option value="" className='text-xs'>Tất cả</option>
          <option value="" className='text-xs'>Chi tiêu</option>
          <option value="" className='text-xs'>Thu nhập</option>
        </select>
      </div>
      <section className='w-full px-4'>
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

export default History