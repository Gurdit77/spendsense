import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useAuth } from '../../../contexts/authContexts';
import './style.css'
ChartJS.register(ArcElement, Tooltip, Legend);


export default function PieChart() {
    const {totalExpense,totalIncome} = useAuth();
    const [totalExpenseAmount, setTotalExpenseAmount] = useState(1);
    const [totalIncomeAmount, setTotalIncomeAmount] = useState(1);
     useEffect(()=>{ 
        if(totalExpense === 0 && totalIncome === 0){
          setTotalExpenseAmount(1);
          setTotalIncomeAmount(1);
        }
        else{
            setTotalExpenseAmount(totalExpense);
            setTotalIncomeAmount(totalIncome);
        }
     },[totalExpense,totalIncome])
     const data = {
        labels: ["Expense","Income"],
        datasets: [
          {
            label: 'Amount',
            data: [totalExpenseAmount, totalIncomeAmount],
            backgroundColor: [              
              'rgba(147, 197, 253, 1)',
              'rgba(59, 130, 246, 1)'
                ],
            borderColor: [
                'rgba(147, 197, 253, 1)',
              'rgba(59, 130, 246, 1)'
                ],
            borderWidth: 1,
          },
        ],
      };

  return <div className='pie-canvas'><Pie data={data} /></div>;
}
