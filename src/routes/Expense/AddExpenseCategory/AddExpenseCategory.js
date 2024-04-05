import React, {useState,useEffect } from 'react';
import './style.css';
import { useAuth } from '../../../contexts/authContexts';
import { Navigate } from 'react-router-dom';
import { GetCurrentUserUID, UpdateExpenseCategory, addExpenseCategory } from '../../../lib/firebase/auth';
import Icon from '../../../components/ui/Icons/Icon';
import Switch from '../../../components/ui/Switch/Switch';
import Heading from '../../../components/ui/Heading/Heading';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import Notification from '../../../components/ui/Notification/Success/Notification';
import LoaderNotification from '../../../components/ui/Notification/Loader/LoaderNotification';
import useThemeConfig from '../../../contexts/ThemeConfig';
import CategoriesTabs from '../../../layouts/CategoriesTabs/CategoriesTabs';

function AddExpenseCategory() {  
  const {getPageTitle, getActivePage} = useThemeConfig();  
    const [newName, setNewName] = useState('');
    const Uid = GetCurrentUserUID();
    const {userLoggedIn, expenseCategories,fetchExpenseCategories} = useAuth();
    const [data, setData] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('The category have succesfully added.');
    const [successStatus, setSuccessStatus] = useState(false);
    const [loading, setloading] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState('Adding Category');
      // PageTitle
  useEffect(() => {      
    getPageTitle(`Categories`);
    getActivePage('categories');
    }, []);
      const handleChange = async (e) => {  
        setDisabled(true)
        
        if(e.target.value === "true" || e.target.value === true){
            setLoaderMessage('Deactiviating ...');
         const result = await UpdateExpenseCategory(Uid, e.target.dataset.index , false);    
         setData({ ...data, [e.target.name]: false });
                
         if(result === "success"){                 
         setSuccessMessage('The category is deactivated.')
         setSuccessStatus(true);
         fetchExpenseCategories(Uid);
         setDisabled(false)
         setTimeout(()=>{
            setSuccessStatus(false);
        },1500)
        setTimeout(()=>{
            setloading(false)           
            setSuccessMessage('')
        },1800)
         }
        }
        else{
            setLoaderMessage('Activiating ...');
            const result = await UpdateExpenseCategory(Uid,e.target.dataset.index , true);              
            setData({ ...data, [e.target.name]: true });    
            if(result === "success"){
            setSuccessMessage('The category is activated.')
            setSuccessStatus(true);
            fetchExpenseCategories(Uid);
            setDisabled(false)
            setTimeout(()=>{
                setSuccessStatus(false);
            },1500)
            setTimeout(()=>{
                setloading(false)           
                setSuccessMessage('')
            },1800)
            }
        }
      };
      const addingExpenseData = async (e)=>{
        e.preventDefault();
        setloading(true)    
        if (newName === '') {     
            setloading(false)           
            setErrorMessage('Please enter a name.');
          } 
          else{
            const hi = await addExpenseCategory(Uid,newName);            
            if(hi === "success"){
                setErrorMessage('');
                setNewName('');
                setSuccessMessage('The category have succesfully added.')
                setSuccessStatus(true);
                setTimeout(()=>{
                    setSuccessStatus(false);
                    fetchExpenseCategories(Uid);
                },1500)
                setTimeout(()=>{
                    setloading(false)           
                    setSuccessMessage('')
                },1800)
            }
          }
                 
      }

  return (
    <>
    {!userLoggedIn && (<Navigate to={'/'} />)}
      <div className='p-3 md:p-5' >   
      <CategoriesTabs active={true} page="Expense" />
      <section className='w-full flex md:flex-nowrap flex-wrap justify-center gap-6 x-sm-tab:flex-wrap'>

<div className={`w-full transition-all duration-500 bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700`}>
    
<div className="p-3 sm:p-6 space-y-4 md:space-y-6">
<Heading headingStyle="h2" text="Expense Categories" />
<ul className='grid sm:grid-cols-2 gap-x-3'>
      {Object.entries(expenseCategories).map(([key, val], index) => (
    <li key={key}  className={`group flex items-center justify-between gap-2 py-3 px-2 border-t border-gray-700 hover:bg-gray-700  cursor-pointer text-left text-gray-800 dark:text-blue-300 hover:text-gray-400 dark:hover:text-blue-500 `}>
      <span className='flex items-center gap-2'><Icon type={val?.icon} size="24px" colorClass="dark:fill-blue-300 fill-gray-800 group-hover:fill-gray-400 dark:group-hover:fill-blue-500" /> {val?.value}</span>
      <Switch onChange={handleChange} name={val?.value} index={index} value={data[val?.value]} checked={val?.status}/>
    </li>  
))}
</ul>
</div>
    </div>
    <div className={`w-full sm:max-w-md x-sm-tab:max-w-full transition-all duration-500 bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700 ${loading ? ' cursor-not-allowed animate-pulse' : ''}`}>
<div className="p-3 sm:p-6 space-y-4 md:space-y-6">
      <Heading headingStyle="h2" text="Add Category" />
              <form className='md:flex-nowrap flex-wrap flex flex-col gap-4' action='#' onSubmit={addingExpenseData}>
                <div className='md:flex-nowrap flex-wrap flex gap-4'>

                  <div className='sm:flex-1 w-full'>
                    <Input type='text' placeholder="Car Wash" name="name" required={true} label='Name *' setData={setNewName} value={newName} />
                  </div>
   
                </div>
                {errorMessage && (
                  <span className='text-red-600 font-bold'>{errorMessage}</span>
                )}
                <Button type="solid" btnType='submit' color="blue" label="Save" loading={loading} loadingText="Saving Category..."/>
              </form>
              </div>
</div>
    <Notification active={successStatus}>
                {successMessage}
            </Notification>            
                <LoaderNotification active={disabled}>
                {loaderMessage}
            </LoaderNotification>
</section>
      </div> 
    </>
  );
}

export default AddExpenseCategory;
