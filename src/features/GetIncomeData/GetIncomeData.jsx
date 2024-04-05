import React, {useState, useEffect} from 'react';
import './style.css'
import { useAuth } from '../../contexts/authContexts';
import IncomeCard from '../../components/ui/IncomeCard/IncomeCard';

const GetAllIncome = ({recheck})=>{
    const { income } = useAuth();
    const [recentIncome, setRecentIncome] = useState('');     
    useEffect(() => {     
      
        if(income){
        setRecentIncome(income)
        }

      }, [income, recheck]);  
     
      return(
        <>

         { recentIncome !== '' && Object.entries(recentIncome).map(([key, value]) => (              
         <IncomeCard  key={key} uqId={value?.uniqueId} value={value} />
      ))}
  
        </>
      ) 
}
export default GetAllIncome;