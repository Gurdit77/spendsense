import React, {useState, useEffect} from 'react';
import './style.css'
import ExpenseCard from '../../components/ui/ExpenseCard/ExpenseCard';
import { useAuth } from '../../contexts/authContexts';

const GetAllExpense = ({recheck,limit})=>{
    const { expense } = useAuth();
    const [recentExpense, setRecentExpense] = useState('');  
    useEffect(() => { 
      if(expense.length === 0){
      }
      else{
        setRecentExpense(expense?.values)
      }
      }, [expense, recheck]);  
     
      return(
        <>
 
    
         { recentExpense !== '' && Object.entries(recentExpense).slice(0, limit).map(([key, value]) => (              
         <ExpenseCard  key={key} uqId={value?.uniqueId} value={value} />
      ))}
  
        </>
      ) 
}
export default GetAllExpense;