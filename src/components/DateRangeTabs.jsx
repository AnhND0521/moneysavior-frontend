import React, { useState } from 'react'

const DateRangeTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='w-full h-10 mb-4 grid grid-cols-4 gap-2 text-sm'>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 0 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setActiveTab(0)}
      >
        Ngày
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 1 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setActiveTab(1)}
      >
        Tuần
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 2 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setActiveTab(2)}
      >
        Tháng
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 3 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setActiveTab(3)}
      >
        Năm
      </div>
    </div>
  )
}

export default DateRangeTabs