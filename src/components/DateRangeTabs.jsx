import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';

const DateRangeTabs = (props) => {
  const { dateRange, setDateRange } = props;
  const { t } = useTranslation('common');

  return (
    <div className='w-full h-10 mb-4 grid grid-cols-4 gap-2 text-sm'>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 0 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(0)}
      >
        {t('day')}
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 1 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(1)}
      >
        {t('week')}
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 2 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(2)}
      >
        {t('month')}
      </div>
      <div
        className={`w-full h-full flex justify-center items-center rounded-md cursor-pointer 
          ${dateRange == 3 ? 'bg-primary text-white' : 'text-gray-text'}`}
        onClick={() => setDateRange(3)}
      >
        {t('year')}
      </div>
    </div>
  )
}

export default DateRangeTabs