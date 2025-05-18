import React, { useState } from 'react'
import { BiBarChartAlt2, BiHome, BiPlus, BiSolidBarChartAlt2, BiSolidHome, BiSolidUser, BiSolidWallet, BiUser, BiWallet } from 'react-icons/bi';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const {pathname} = useLocation();

  return (
    pathname !== '/chatbot' &&
    <div className='fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-[430px] h-1/10 px-2 grid grid-cols-5 bg-white shadow-[0_0px_10px_rgba(0,0,0,0.25)]'>
      <Link
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 0 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(0)}
        to='/'
      >
        {activeTab == 0 ? <BiSolidHome size="1.8rem"/> : <BiHome size="1.8rem"/>}
      </Link>
      <Link
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 1 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(1)}
        to='statistics'
      >
        {activeTab == 1 ? <BiSolidBarChartAlt2 size="1.8rem"/> : <BiBarChartAlt2 size="1.8rem"/>}
      </Link>
      <div
        className='relative w-full h-full flex justify-center items-center'
      >
        <Link 
          className='absolute bottom-1/2 aspect-square h-full flex items-center justify-center bg-primary text-white rounded-full'
          to='chatbot'
        >
          <BiPlus size="2.4rem"/>
        </Link>
      </div>
      <Link
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 2 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(2)}
        to='history'
      >
        {activeTab == 2 ? <BiSolidWallet size="1.8rem"/> : <BiWallet size="1.8rem"/>}
      </Link>
      <Link
        className={`w-full h-full flex justify-center items-center rounded-md 
          ${activeTab == 3 ? 'text-primary' : 'text-gray-text'}`}
        onClick={() => setActiveTab(3)}
        to='profile'
      >
        {activeTab == 3 ? <BiSolidUser size="1.8rem"/> : <BiUser size="1.8rem"/>}
      </Link>
    </div>
  )
}

export default Navbar