import React, { useEffect, useState } from 'react';
import './style.css';
import { GetCurrentUserUID, GetOneExpenseData, UpdateExpenseDataToFirestore } from '../../../lib/firebase/auth';
import { Navigate, useLocation } from 'react-router-dom';
import Input from '../../../components/Form/Input/Input';
import ExpenseCategoriesDropdown from '../../../features/GetExpenseCategories/ExpenseCategoriesDropdown';
import DefaultAccounts from '../../../features/GetAccount/GetAccount';
import Button from '../../../components/Form/Button/Button';
import Textarea from '../../../components/Form/Textarea/Textarea';
import Heading from '../../../components/ui/Heading/Heading';
import { useAuth } from '../../../contexts/authContexts';
import useThemeConfig from '../../../contexts/ThemeConfig';

const EditExpense = () => {
  const { getPageTitle} = useThemeConfig();
  const currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }
  const { fetchTotalExpense, fetchTotalIncome, fetchExpenseData } = useAuth();
  let Uid = GetCurrentUserUID();
  const [note, setNote] = useState('');
  const [amount, setAmount] = useState(0);
  const [expenseCategory, setExpenseCategory] = useState("");
  const [date, setDate] = useState(`${year}-${month}-${day}`);
  const [expenseAccount, setExpenseAccount] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [noteDescription, setNoteDescription] = useState('');
  const [data, setExpenseData] = useState(false);
  const [index, setIndex] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let uqId = location.pathname.split("/all-expense/edit/");
  uqId = uqId[1];
  useEffect(() => {
    const fetchExpenseCategories = async (Uid, uqId) => {
      const expenseData = await GetOneExpenseData(Uid, uqId);
      if (expenseData === null) {
        setExpenseData(true);
        setDisabled(false)
      }
      else {
        const item = expenseData.item;
        setDisabled(false)
        setAmount(item.amount)
        setNote(item.note)
        setExpenseCategory(item.expenseCategory)
        setExpenseAccount(item.expenseAccount)
        setNoteDescription(item.noteDescription)
        setDate(item.date)
        setIndex(item.index)
      }
    };
    fetchExpenseCategories(Uid, uqId);
  }, [Uid, uqId]);
  // PageTitle
  useEffect(() => {
    getPageTitle(`Edit Expenses - ${uqId}`)
  }, []);
  //  Fetching  Category
  function getExpenseCategory(data) {
    setExpenseCategory(data);
  }
  //  Fetching  Account
  function getExpenseAccount(data) {
    setExpenseAccount(data);
  }
  // Updating Data
  const addingExpenseData = async (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    if (expenseCategory === '') {
      setErrorMessage('Please select a category.');
    } else if (expenseAccount === '') {
      setErrorMessage('Please select an account.');
    } else {
      try {
        let addingData = await UpdateExpenseDataToFirestore(index, Uid, note, amount, expenseCategory, date, expenseAccount, noteDescription, currentDate);
        console.log(addingData)
        if (addingData === "success") {
          setExpenseData(true);
          setDisabled(false);
          setLoading(false);
          fetchTotalExpense(Uid)
          fetchTotalIncome(Uid)
          fetchExpenseData(Uid)
        }
        setErrorMessage('');
      } catch (error) {
        setLoading(false);
        setDisabled(false);
        setExpenseData(true);
        console.error('Error adding expense data:', error);
        setErrorMessage('An error occurred while adding expense data.');
      }
    }
  };



  return (
    <>
      {data && (<Navigate to={'/'} />)}
      <div className='p-3 md:p-5' >
        <section className={'w-full flex justify-center gap-6' + `${disabled ? ' cursor-not-allowed animate-pulse' : ''}`}>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <Heading headingStyle="h2" text="Edit Expense" />
              <form className='flex flex-col gap-4' action='#' onSubmit={addingExpenseData}>
                <div className='flex gap-4'>

                  <div className='flex-1'>
                    <Input type='text' placeholder="Coffee at cafe" name="name" required={true} label='Note *' setData={setNote} value={note} />
                  </div>
                  <div className='flex-1'>
                    <Input type='number' placeholder="1500" name="amount" required={true} label='Amount *' setData={setAmount} value={amount.toString()} />
                  </div>
                </div>
                <div className='flex gap-4'>
                  <div className='flex-1'>
                    <ExpenseCategoriesDropdown getCategory={getExpenseCategory} setErrorMessage={setErrorMessage} expenseCategory={expenseCategory} />
                  </div>
                  <div className='flex-1'>
                    <DefaultAccounts getAccount={getExpenseAccount} setErrorMessage={setErrorMessage} expenseAccount={expenseAccount} />
                  </div>
                  <div className='flex-1'>
                    <Input type='date' placeholder="Coffee at cafe" name="Date" label='Date' setData={setDate} value={date} />
                  </div>
                </div>
                {note !== '' && (<Textarea value={noteDescription} setData={setNoteDescription} rows={4} placeholder="Add Description Here" label="Description (Optional)" />)}

                {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
                )}
                <Button type="solid" btnType='submit' color="blue" label="Save" loading={loading} loadingText="Saving..." />
              </form>
            </div>
          </div>

        </section>
      </div>
    </>
  )
}

export default EditExpense;