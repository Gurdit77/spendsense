import React from 'react';
import './style.css';
import Heading from '../../components/ui/Heading/Heading';
import GetAllIncome from '../GetIncomeData/GetIncomeData';
import NavButton from '../../components/ui/NavButton/NavButton';


function RecentIncome({expenselength,check,limit}) {
  return (
    <div className={`bg-white  xxl:flex-none xxl:w-full rounded-lg x2xl:max-w-full x2xl:flex-1 sm:max-w-md w-full shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700 overflow-hidden`}>
    <div className="p-3 md:p-5 space-y-4 md:space-y-6  flex flex-col justify-between h-full">
      <div className='space-y-4 md:space-y-6'>
        <Heading headingStyle="h2" text="Recent Income" />
        {expenselength === 0 && (
            <Heading headingStyle="h5" text="Looks like you haven't added any income data yet." />
        )}
        {expenselength !== 0 && ( <div className='flex justify-between flex-col gap-3 mt-3'>
          <GetAllIncome recheck={check} limit={limit} />

        </div>  )}
      </div>
      {expenselength !== 0 && ( <NavButton link='/all-income' label="View All" color='blue' type='outlined' />)}
    </div>
  </div>
  );
}

export default RecentIncome;
