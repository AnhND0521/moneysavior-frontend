import React from 'react'
import { BiChevronUp, BiDownArrowAlt, BiUpArrowAlt } from 'react-icons/bi'
import DateRangeTabs from '../components/DateRangeTabs'
import CategoryChart from '../components/CategoryChart'

const Home = () => {
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
                <h2 className='text-2xl font-bold'>₫ 1.024.000</h2>
              </div>
              <div className='w-full flex'>
                <div className='w-1/2'>
                  <div className='flex items-center gap-1'>
                    <div className='p-1 rounded-full bg-white-transparent'><BiUpArrowAlt /></div>
                    <p className='text-sm text-lightGray-text'>Thu nhập</p>
                  </div>
                  <h3 className='font-semibold'>₫ 1.840.000</h3>
                </div>
                <div>
                  <div className='flex items-center gap-1'>
                    <div className='p-1 rounded-full bg-white-transparent'><BiDownArrowAlt /></div>
                    <p className='text-sm text-lightGray-text'>Chi tiêu</p>
                  </div>
                  <h3 className='font-semibold'>₫ 816.000</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='px-6'>
          <DateRangeTabs />
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
          <CategoryChart data={
            [
              {name: "Ăn uống", value: 458},
              {name: "Đi lại", value: 83},
              {name: "Giải trí", value: 83},
              {name: "Mua sắm", value: 83},
              {name: "Nhà ở", value: 293},
            ]
          }/>
        </div>
      </div>
    </>
  )
}

export default Home