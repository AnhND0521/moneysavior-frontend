import React from 'react'

const Expense = (props) => {
  return (
    <div className='w-full h-16 px-4 py-2 flex items-center justify-between bg-gray-bg rounded-md'>
      <div>
        <p className='font-medium'>Đóng tiền học lại</p>
        <p className='text-gray-text text-sm'>14/04/2025</p>
      </div> 
      <p className='text-red text-lg font-semibold'>- ₫ 7.450.000</p>
    </div>
  )
}

export default Expense