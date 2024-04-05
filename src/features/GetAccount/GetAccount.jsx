import React, { useEffect, useState } from 'react';
import './style.css';
import Icon from '../../components/ui/Icons/Icon';
import { useAuth } from '../../contexts/authContexts';
import NavButton from '../../components/ui/NavButton/NavButton';


const DefaultAccounts = ({getAccount, setErrorMessage, reset, expenseAccount}) => {
  const [selectedCategory, setSelectedCategory] = useState(expenseAccount || 'Select Account');
  const [categoryClick, setCategoryClick] = useState(false);    
  const {accounts} = useAuth();
  const profileClasses = 'max-h-48 overflow-auto w-full  z-10 transition-all duration-300 ease-in-out bg-white rounded-lg p-4 absolute right-0 top-[100%] shadow border-transparent border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700';
//   const profileClassesOverlay = 'z-10 fixed top-0 w-full h-full right-0';     

  useEffect(() => {
    setSelectedCategory(expenseAccount || 'Select Account');
  }, [reset,expenseAccount]);
  
  
 const optionClicked = (value)=>{
    setSelectedCategory(value);
    setCategoryClick(false);
    getAccount(value);
    setErrorMessage('');
 }
  return (
    <>
    <div>
    <label className="block mb-2 text-sm  transition duration-300 font-medium text-gray-900 dark:text-white">
                    Account *
                </label>    
                <div className='relative'>
     <button type="button" onClick={()=> setCategoryClick(prevState => !prevState)} className='flex items-center justify-between bg-gray-50 text-left border transition duration-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        {selectedCategory} 
        <span className={categoryClick ? 'rotate-180 duration-300 origin-center': 'rotate-0 duration-300 origin-center' }>
        <Icon type="expand" size="24px" colorClass="dark:fill-white fill-gray-900" />
        </span>
        </button>     
        <div className={categoryClick ? `animate-dropdown ${profileClasses}` : ` unanimate-dropdown ${profileClasses}`}>                          
                         <ul>
  {Object.entries(accounts).map(([key, val]) => (
          <li key={key} onClick={ () => optionClicked(val.value)} className='block p-3 cursor-pointer text-left text-gray-800  dark:text-blue-300 hover:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-300'>
            {val.value}
          </li>        
        ))}
         <li key="add"  className='group flex border-t border-gray-700 items-center gap-2  cursor-pointer text-left text-gray-800 dark:text-blue-300 hover:text-gray-400 dark:hover:text-blue-500'>
 <NavButton type="nav" link={'/accounts'} color="blue" label="Add" additionalCss="flex  p-3 w-full items-center gap-2"> <Icon type="add" size="24px" colorClass="dark:fill-blue-300  fill-gray-800 group-hover:fill-gray-400 dark:group-hover:fill-blue-500" /> </NavButton>
    </li>
          </ul>
        </div> 
        </div>
  </div>
    </>
  );
};

export default DefaultAccounts;
