import React, { useEffect, useState } from 'react';
import './style.css';
import Icon from '../../components/ui/Icons/Icon';
import  NavButton from '../../components/ui/NavButton/NavButton'
import { useAuth } from '../../contexts/authContexts';

const ExpenseCategoriesDropdown = ({getCategory,setErrorMessage, reset, expenseCategory}) => {
  const {expenseCategories} = useAuth();
  const [selectedCategory, setSelectedCategory] = useState(expenseCategory || 'Select Category');
  const [categoryClick, setCategoryClick] = useState(false);      
  const profileClasses = 'max-h-48 overflow-auto w-full  z-10 transition-all duration-300 ease-in-out bg-white rounded-lg p-4 absolute right-0 top-[100%] shadow border-transparent border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700';
  useEffect(() => {
        setSelectedCategory(expenseCategory || 'Select Category')
  }, [reset,expenseCategory]); 
  
 const optionClicked = (value)=>{
    setSelectedCategory(value);
    setCategoryClick(false)
    getCategory(value);
    setErrorMessage('')
 }
 const dropDown  = (e)=>{
  setCategoryClick(prevState => !prevState)
 }
  return (
    <>
     
    <div>
    <label className="block mb-2 text-sm  transition duration-300 font-medium text-gray-900 dark:text-white">
                    Category *
                </label>    
                <div className='relative'>
     <button type="button" onClick={(e)=> dropDown(e)} className='flex is-dirty peer items-center justify-between bg-gray-50 text-left border transition duration-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
        {selectedCategory} 
        <span className={categoryClick ? 'rotate-180 duration-300 origin-center': 'rotate-0 duration-300 origin-center' }>
        <Icon type="expand" size="24px" colorClass="dark:fill-white fill-gray-900" />
        </span>
        </button>     
        <div className={categoryClick ? `animate-dropdown ${profileClasses}` : ` unanimate-dropdown ${profileClasses}`}>                          
                         <ul>
                         {Object.entries(expenseCategories).map(([key, val]) => (
  val?.status === true  && (
    <li key={key} onClick={() => optionClicked(val?.value)} className='group flex items-center gap-2 p-3 cursor-pointer text-left text-gray-800 dark:text-blue-300 hover:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-300'>
      <Icon type={val?.icon} size="24px" colorClass="dark:fill-blue-300 fill-gray-800 group-hover:fill-gray-400 dark:group-hover:fill-blue-500" /> {val?.value}
    </li>
  )
))}
 <li key="add"  className='group flex border-t border-gray-700 items-center gap-2  cursor-pointer text-left text-gray-800 dark:text-blue-300 hover:text-gray-400 dark:hover:text-blue-500'>
 <NavButton type="nav" link={'/expense-categories'} color="blue" label="Add" additionalCss="flex  p-3 w-full items-center gap-2"> <Icon type="add" size="24px" colorClass="dark:fill-blue-300  fill-gray-800 group-hover:fill-gray-400 dark:group-hover:fill-blue-500" /> </NavButton>
    </li>
          </ul>
        </div> 
        </div>
        
  </div>
    </>
  );
};

export default ExpenseCategoriesDropdown;
