import React, { useState } from 'react'

const DateRangeTabs = (props) => {
  const { dateRange, setDateRange } = props;

  return (
    <div className='w-full h-10 mb-4 grid grid-cols-4 gap-2 text-sm'>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 0 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(0)}
      >
        Ngày
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 1 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(1)}
      >
        Tuần
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 2 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(2)}
      >
        Tháng
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 3 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(3)}
      >
        Năm
      </div>
    </div>
  )
}

export default DateRangeTabs