import React, { act, useState } from 'react'
import { BiBarChartAlt2, BiHome, BiPlus, BiSolidBarChartAlt2, BiSolidHome, BiSolidUser, BiSolidWallet, BiUser, BiWallet } from 'react-icons/bi';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='fixed bottom-0 w-full h-1/10 px-2 grid grid-cols-5 bg-white shadow-[0_0px_10px_rgba(0,0,0,0.25)]'>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 0 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(0)}
      >
        {activeTab == 0 ? <BiSolidHome size="1.8rem"/> : <BiHome size="1.8rem"/>}
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 1 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(1)}
      >
        {activeTab == 1 ? <BiSolidBarChartAlt2 size="1.8rem"/> : <BiBarChartAlt2 size="1.8rem"/>}
      </div>
      <div
        className='relative w-full h-full flex justify-center items-center bg-white'
      >
        <div className='absolute bottom-1/2 aspect-square h-full flex items-center justify-center bg-primary text-white rounded-full'>
          <BiPlus size="2.4rem"/>
        </div>
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 2 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(2)}
      >
        {activeTab == 2 ? <BiSolidWallet size="1.8rem"/> : <BiWallet size="1.8rem"/>}
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 3 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(3)}
      >
        {activeTab == 3 ? <BiSolidUser size="1.8rem"/> : <BiUser size="1.8rem"/>}
      </div>
    </div>
  )
}

export default Navbar