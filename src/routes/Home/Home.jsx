import React, {useEffect, useState} from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContexts';
import AmountCard from '../../components/ui/AmountCard/AmountCard';
import RecentExpense from '../../features/RecentExpense/RecentExpense';
import RecentIncome from '../../features/RecentIncome/RecentIncome';
import useThemeConfig from '../../contexts/ThemeConfig';
import PieChart from '../../components/ui/Pie/Pie';

const Home = ()=>{
  const {getPageTitle,getActivePage} = useThemeConfig();
    const {totalExpense,totalIncome, expense, income} = useAuth();
    const [expenselength, setExpenselength] = useState(0);
    const [incomelength, setIncomelength] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {  
 
    if(expense !== null){
        setExpenselength(Object.keys(expense?.values)?.length);    
    }
    if(income !== null && income.length > 0){
      setIncomelength(Object.keys(income)?.length);    
  }
      }, [expense,income])
      useEffect(() => {
      getPageTitle('Home'); 
      getActivePage('home');     
      },[]);


    return(
        <>
        <div className='p-3 md:p-5'>            
        <div className='flex gap-6 x-sm-tab:flex-wrap'>
            <AmountCard heading="Expenses - This Month" amount={totalExpense} link='/all-expense' />
            <AmountCard heading="Income - This Month" amount={totalIncome} link='/all-expense' />
            <AmountCard heading="Balance - This Month" amount={totalIncome - totalExpense}  link='/all-expense' over={totalExpense > totalIncome}  />
        </div>
        <section className='w-full flex md:flex-nowrap flex-wrap gap-6 my-6 xxl:flex-wrap'>
          <div className={`w-full x-sm-tab:w-auto x-sm-tab:flex-1 x-xsm-tab:flex-none x2xl:flex-1 x2xl:max-w-full max-w-md transition-all duration-500 bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700`}>
            <div  className='p-3 md:p-5'>
          <PieChart />
          </div>
            </div>
        <RecentExpense expenselength={expenselength} limit={3} />
        <RecentIncome expenselength={incomelength} limit={3} />
          
           
            </section>
           
        </div>
   
        </>
    )
}

export default Home;