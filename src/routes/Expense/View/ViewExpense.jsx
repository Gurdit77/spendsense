import React, { useEffect, useState } from 'react';
import './style.css'
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useThemeConfig from '../../../contexts/ThemeConfig';
import NavButton from '../../../components/ui/NavButton/NavButton';
import Button from '../../../components/Form/Button/Button';
import Icon from '../../../components/ui/Icons/Icon';
import { DeleteExpenseData, GetCurrentUserUID, GetOneExpenseData } from '../../../lib/firebase/auth';
import { useAuth } from '../../../contexts/authContexts';
import Heading from '../../../components/ui/Heading/Heading';
import Currency from 'react-currency-formatter';
import Text from '../../../components/ui/Text/Text';
import ConvertDateTime from '../../../features/ConvertDateTime/ConvertDateTime';
import { storeCurrency } from '../../../server/Data';
import SkeletonLoader from '../../../components/ui/SkeletonLoader/SkeletonLoader';
function ViewExpense() {
  const Uid = GetCurrentUserUID();
  const navigate = useNavigate();
  const { recheckData, fetchTotalExpense, fetchTotalIncome, fetchExpenseData } = useAuth();
  const { getPageTitle, getActivePage } = useThemeConfig();
  const [item, setItem] = useState([]);
  const [expenseCategory, setExpenseCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  let uqId = location.pathname.split("/all-expense/");
  uqId = uqId[1];
  useEffect(() => {
    setLoading(true);
    getPageTitle(`Expense - ${uqId}`);
    getActivePage('expense');
    const item = async () => {
      const expenseData = await GetOneExpenseData(Uid, uqId);      
      if (expenseData.item === undefined) {
        setItem(null)
      }
      else {
        setTimeout(function () {
          setLoading(false);
        }, 1000)

        setItem(expenseData.item)
        setExpenseCategory(expenseData.item.expenseCategory.toLowerCase())

      }

    };
    item()
  }, []);




  const delExpenseData = async () => {
    try {
      let addingData = await DeleteExpenseData(Uid, uqId);

      if (addingData === "success") {
        setTimeout(function () {
          recheckData(Uid);
        }, 400)
        fetchTotalExpense(Uid)
        fetchTotalIncome(Uid)
        fetchExpenseData(Uid)
        navigate('/all-expense')
      }

    } catch (error) {
      console.error('Error adding expense data:', error);
    }
  };
  return (
    <>
      {item === null && (<Navigate to={'/home'} />)}
      <div className='p-3 md:p-5' >
        <section className={'w-full flex  gap-6 xxl:flex-wrap'}>
          <div className=" bg-white rounded-lg w-1/3 xxl:w-full xxl:flex-1 shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className='flex flex-col'>
                <div className='pb-2'>
                  <Heading headingStyle="h3">
                    Details:
                  </Heading>
                </div>
                <div className='border-t border-gray-500 py-2 flex items-center justify-between'>
                  <span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    Date :
                  </span>
                  {loading && (<SkeletonLoader type="line" height="h-[28px]" styles="justify-end" width="w-36" />)}
                  {!loading && (<Heading headingStyle="h4">
                    {item?.date}
                  </Heading>)}
                </div>
                <div className='border-t border-gray-500 py-2 flex items-center justify-between'>
                  <span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    Note :
                  </span>
                  {loading && (<SkeletonLoader type="line" height="h-[28px]" styles="justify-end" width="w-32" />)}
                  {!loading && (<Heading headingStyle="h4">
                    {item?.note}
                  </Heading>
                  )}
                </div>
                <div className='border-t border-gray-500 py-2 flex items-center justify-between'>
                  <span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    Amount :
                  </span>
                  {loading && (<SkeletonLoader type="line" height="h-[28px]" styles="justify-end" width="w-40" />)}
                  {!loading && (<Heading headingStyle="h4">
                    <Currency
                      quantity={item?.amount || 0}
                      currency={storeCurrency}
                    />
                  </Heading>)}
                </div>
                <div className='border-t border-gray-500 py-2 flex items-center justify-between'>
                  <span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    Category :
                  </span>
                  {loading && (<SkeletonLoader type="line" height="h-[28px]" styles="justify-end" width="w-32" />)}
                  {!loading && (<Heading headingStyle="h4">

                    <span className='flex items-center gap-1 rounded-full py-[2px] px-2 bg-green-500 text-white text-sm'><Icon type={expenseCategory} size="24px" colorClass="dark:fill-white fill-gray-900" />   {item.expenseCategory}
                    </span>

                  </Heading>)}
                </div>

                <div className='border-t border-gray-500 py-2 flex items-center justify-between'>
                  <span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    Account :
                  </span>
                  {loading && (<SkeletonLoader type="line" height="h-[28px]" styles="justify-end" width="w-40" />)}
                  {!loading && (<Heading headingStyle="h4">
                    {item?.expenseAccount}
                  </Heading>)}
                </div>
                <div className='border-t border-gray-500 py-2 flex items-center justify-between'>
                  <span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    Created On :
                  </span>
                  {loading && (<SkeletonLoader type="line" height="h-[20px]" styles="justify-end" width="w-40" />)}
                  {!loading && (<span className="block text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                    <ConvertDateTime value={item?.createdDate} />
                  </span>)}
                </div>
              </div>


            </div>
          </div>
          <div className=" bg-white rounded-lg w-1/3 xxl:w-full xxl:flex-1 x-sm-tab:flex-none shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className='flex flex-col'>
                <div className='pb-2'>
                  <Heading headingStyle="h3">
                    Description:
                  </Heading>
                  {loading && (<SkeletonLoader type="multiline" styles="justify-end mt-2" width="w-40" lines={10} />)}
                  {item?.noteDescription && !loading && (<Text className="block mb-2 border-t border-gray-500 pt-2 mt-2 text-md  transition duration-300 text-gray-900 dark:text-gray-400">{item?.noteDescription}</Text>)}
                  {!loading && item?.noteDescription === '' && (<Text className="block mb-2 border-t border-gray-500 pt-2 mt-2 text-md  transition duration-300 text-gray-900 dark:text-gray-400">Please add description.</Text>)}
                </div>
              </div>
            </div>
          </div>
          <div className=" bg-white rounded-lg w-1/3 xxl:w-full shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className='flex flex-col'>
                <div className='pb-2'>
                  <div className='pb-2'>
                    <Heading headingStyle="h3">
                      Update:
                    </Heading>
                  </div>
                  <div className='flex gap-4 border-t border-gray-500 py-2'>
                    <NavButton link={`/all-expense/edit/${uqId}`} additionalCss="flex items-center justify-center gap-2" >
                      <Icon type={"edit"} size="24px" colorClass="fill-white" /> Edit
                    </NavButton>

                    <Button btnType='button' type="solid" event={delExpenseData} additionalCss="cursor-pointer flex items-center justify-center gap-2 bg-red-600">
                      <Icon type={"delete"} size="24px" colorClass="fill-white" /> Remove
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>


    </>
  );
}

export default ViewExpense;
