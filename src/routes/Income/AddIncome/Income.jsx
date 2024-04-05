import React, { useState, useEffect } from 'react';
import './style.css'
import ExpenseTab from '../../../layouts/ExpenseTabs/ExpenseTabs';
import Heading from '../../../components/ui/Heading/Heading';
import { useAuth } from '../../../contexts/authContexts';
import DefaultAccounts from '../../../features/GetAccount/GetAccount';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import Textarea from '../../../components/Form/Textarea/Textarea';
import { GetCurrentUserUID, addIncomeDataToFirestore } from '../../../lib/firebase/auth';
import RecentIncome from '../../../features/RecentIncome/RecentIncome';
import useThemeConfig from '../../../contexts/ThemeConfig';
import GetIncomeCategories from '../../../features/GetIncomeCategories/GetIncomeCategories';

const Income = ()=> {
  const { getPageTitle, getActivePage } = useThemeConfig();
  const { income, fetchIncome, fetchTotalExpense, fetchTotalIncome } = useAuth();
  const [expenselength, setExpenselength] = useState(0);
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState('');
  const [expenseCategory, setExpenseCategory] = useState("");
  const [expenseAccount, setExpenseAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [check, setCheck] = useState(false);  
  const [disabled,setDisabled] = useState(false);
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  useEffect(() => { 
    if(income !== null && income?.length > 0){   
    setExpenselength(Object.keys(income).length)
    }
  }, [income])

  // PageTitle
  useEffect(() => {      
    getPageTitle(`Add Income`);
    getActivePage('add');
    }, []);

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const [date, setDate] = useState(`${year}-${month}-${day}`);
  let Uid = GetCurrentUserUID();
  function getExpenseCategory(data) {
    setExpenseCategory(data);
  }
  function getExpenseAccount(data) {
    setExpenseAccount(data);
  }

  const uniqueId = Date.now().toString(20);
  const addingExpenseData = async (e) => {
    e.preventDefault();
    setDisabled(true)
    if (expenseCategory === '') {
      setErrorMessage('Please select a category.');
      setDisabled(false)
    } else if (expenseAccount === '') {
      setErrorMessage('Please select an account.');
      setDisabled(false)
    } else {
      try {
        let addingData = await addIncomeDataToFirestore(Uid, uniqueId, note, amount, expenseCategory, date, expenseAccount, noteDescription, currentDate);
        if (addingData === "success") {
          setNote('')
          setAmount('')
          setExpenseCategory('')
          setExpenseAccount('')
          setNoteDescription('')
          setCheck(true); 
          if(income !== null && income?.length > 0){                     
          setExpenselength(Object.keys(income).length);
          }
         await fetchIncome(Uid).then(()=>{
          setCheck(false); 
          });
          fetchTotalExpense(Uid)
          fetchTotalIncome(Uid)          
        }
        setErrorMessage('');
        setDisabled(false);

      } catch (error) {
        console.error('Error adding expense data:', error);
        setErrorMessage('An error occurred while adding expense data.');
        setDisabled(false)
      }
    }
  };
return(
    <>
      <div className='p-3 md:p-5 ' >
        <ExpenseTab active={true} page="Income" />
        <section className='w-full flex md:flex-nowrap flex-wrap justify-center gap-6 x-xsm-tab:flex-wrap'>
          <div className={`x2xl:flex-[2] xxl:flex-1 w-full transition-all x-xsm-tab:flex-none duration-500 bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700 ${disabled ? ' cursor-not-allowed animate-pulse' : ''}`}>
            <div className="p-3 md:p-5 space-y-4 md:space-y-6">
              <Heading headingStyle="h2" text="Add Income" />
              <form className='md:flex-nowrap flex-wrap flex flex-col gap-4' action='#' onSubmit={addingExpenseData}>
                <div className='md:flex-nowrap flex-wrap flex gap-4'>

                  <div className='sm:flex-1 w-full'>
                    <Input type='text' placeholder="Coffee at cafe" name="name" required={true} label='Note *' setData={setNote} value={note} />
                  </div>
                  <div className='sm:flex-1 w-full'>
                    <Input type='number' placeholder="1500" name="amount" required={true} label='Amount *' setData={setAmount} value={amount} />
                  </div>
                </div>
                <div className='md:flex-nowrap flex-wrap flex gap-4 xxl:flex-wrap'>
                <div className='sm:flex-1 w-full xxl:flex-auto xxl:w-auto'>
                                      <GetIncomeCategories getCategory={getExpenseCategory} setErrorMessage={setErrorMessage} reset={check} />
                  </div>
                  <div className='sm:flex-1 w-full xxl:flex-auto xxl:w-auto'>
                    <DefaultAccounts getAccount={getExpenseAccount} setErrorMessage={setErrorMessage} reset={check}/>
                  </div>
                  <div className='sm:flex-1 w-full xxl:flex-auto xxl:w-auto'>
                    <Input type='date' placeholder="Coffee at cafe" name="Date" label='Date' setData={setDate} value={date} />
                  </div>
                </div>
                {note !== '' && (<Textarea value={noteDescription} setData={setNoteDescription} rows={4} placeholder="Add Description Here" label="Description (Optional)" />)}

                {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
                )}
                <Button type="solid" btnType='submit' color="blue" label="Save" />
              </form>
            </div>
          </div>
         
          <div className='xxl:flex-1'>
           <RecentIncome expenselength={expenselength} limit={4} check={check} />
           </div>
          
        </section>
        </div>
    </>
)
}
export default Income;