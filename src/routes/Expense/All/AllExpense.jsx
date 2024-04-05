import React, { useEffect, useState } from 'react';
import './style.css'
import GetAllExpense from '../../../features/GetExpenseData/GetAllExpense';
import { useAuth } from '../../../contexts/authContexts';
import Heading from '../../../components/ui/Heading/Heading';
import NavButton from '../../../components/ui/NavButton/NavButton';
import useThemeConfig from '../../../contexts/ThemeConfig';
import FilterData from '../../../features/FilterData/FilterData';
import ExpenseCard from '../../../components/ui/ExpenseCard/ExpenseCard';
import SkeletonLoader from '../../../components/ui/SkeletonLoader/SkeletonLoader';

const AllExpense = () => {
    const { getPageTitle, filter, getActivePage } = useThemeConfig();
    const { expense } = useAuth();
    const [expenselength, setExpenselength] = useState(0);
    const [recentExpense, setRecentExpense] = useState('');
    const [loading, SetLoading] = useState(true); 
    useEffect(() => {
        setRecentExpense(expense)
        setExpenselength(Object.keys(expense?.values).length);
        setTimeout(function () {
            SetLoading(false);
          }, 1000)
    }, [expense]);
    useEffect(() => {      
        setRecentExpense(filter);
        }, [filter]);

    
    useEffect(() => {       
        getPageTitle('All Expenses')
        getActivePage('expense');
    }, []);


    return (
        <>
      
            <div className='p-3 md:p-5' key="1">
            { loading && (<div className='grid grid-cols-4 gap-5 xxl:grid-cols-3 x-sm-tab:grid-cols-2 x-xsm-tab:grid-cols-1'>
                    {Array.apply(0, Array(4)).map(function (x, i) {
                        return <div id={"id-" + i} key={i}
                        className="w-full bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700 p-3">
                            <div className="flex items-start justify-between gap-4 mb-2">
                                <h4
                                    className="text-lg transition duration-300 font-semibold leading-tight tracking-tight text-gray-900 md:text-xl dark:text-white">
                                    <SkeletonLoader type="line" height="h-[28px]" styles="justify-end" width="w-36" /> </h4>
                                <div className="flex gap-3 text-gray-700 dark:text-blue-600"> <SkeletonLoader type="line" height="h-[22px]" styles="justify-end" width="w-36" />
                                </div>
                            </div>
                            <SkeletonLoader type="multiline" styles="justify-end" width="w-36" lines={1} />
                            <div className="border-t border-gray-600 py-1 flex items-center justify-between">
                                <span
                                className="flex justify-between w-full text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                                <SkeletonLoader type="line" height="h-[20px]" styles="justify-start" width="w-36" /></span><span>
                                    <SkeletonLoader type="line" height="h-[20px]" styles="justify-end" width="w-36" /> </span></div>
                        </div>
                    })}
                </div>
)}
            {!loading && expenselength === 0 && (<>
                    <Heading headingStyle="h5" text="Looks like you haven't added any expenses yet." />
                    <div className='grid grid-cols-1  md:grid-cols-4 gap-5 mt-5'><NavButton link='/add' label="Add Now" color='blue' type='outlined' /></div>
                </>
                )}
                 {!loading && (<div className='flex relative justify-end'>
                    <FilterData />
                </div> )}
                <div className='grid grid-cols-4 gap-5 xxl:grid-cols-3 mt-4 x-sm-tab:grid-cols-2 x-xsm-tab:grid-cols-1'>
                {!loading &&  recentExpense !== '' && Object.entries(recentExpense).map(([key, value]) => (              
         <ExpenseCard  key={key} uqId={value?.uniqueId} value={value} />
      ))}
                </div>
            </div>

        </>
    )
}

export default AllExpense;