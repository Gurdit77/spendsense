import React, { useEffect, useState } from 'react';
import './style.css';
import Button from '../../components/Form/Button/Button';
import { useNavigate } from 'react-router-dom';
// import Button from '../../components/ui/NavButton/NavButton';


const ExpenseTab = ({ active, page, left }) => {
    const navigate = useNavigate();
    const [position, setPostiton] = useState(left);
    const [show, setShow] = useState(true);
    const [show2, setShow2] = useState(true);
    const [incomeActiveButton, setIncomeActive] = useState(false);
    const [expenseActiveButton, setExpenseActive] = useState(true);
    useEffect(() => {
        if (active === true && page === "Expense") {
            setShow(false);
            setShow2(false);
            setIncomeActive(false);
            setExpenseActive(true);

            setPostiton('left-1/2')
        }
        if (active === true && page === "Income") {
            setShow(false);
            setIncomeActive(true);
            setExpenseActive(false);
            setPostiton('left-0  duration-500');
        }
    }, [active, page])

    const incomeActive = () => {
        setPostiton('left-0  duration-500')
        setShow(false);   
        setShow2(true);
        setIncomeActive(true);
        setExpenseActive(false); 
        setTimeout(() => {
            navigate('/income')
        }, 500)
    }
    const expenseActive = () => {
        setPostiton('left-2/4  duration-500')
        setShow(false);
        setShow2(false);
        setIncomeActive(false);
        setExpenseActive(true);
        setTimeout(() => {
            navigate('/add')
        }, 500)
    }
    return (
        <>
            <section className='w-full  flex justify-center  pb-4  py-3 bg-gray-200 dark:bg-gray-800 rounded-md mb-4 relative max-w-md mx-auto'>

                <Button btnType='button' event={incomeActive} color="gray" type="nav" additionalCss={" w-full flex justify-center items-center z-10 " + `${incomeActiveButton ? ' text-white dark:text-white' : ''}` } >
                    Income
                </Button>
                <span className={'text-gray-700  transition-all ' + `${show ? 'opacity-1' : 'opacity-0'}` }>|</span>
                <Button btnType='button' event={expenseActive} color="gray" type="nav" additionalCss={" w-full flex justify-center items-center z-10" + `${expenseActiveButton ? ' text-white dark:text-white' : ''}` } >
                    Expense
                </Button>
                <span className={'w-1/2 bg-blue-600 absolute top-0 h-full transition-all rounded-md ' + position}></span>
            </section>
        </>
    )
}

export default ExpenseTab;