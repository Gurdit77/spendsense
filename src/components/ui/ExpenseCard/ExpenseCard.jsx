import React from 'react';
import './style.css'
import Heading from '../Heading/Heading';
import Currency from 'react-currency-formatter';
import Text from '../Text/Text';
import NavButton from '../NavButton/NavButton';
import ConvertDateTime from '../../../features/ConvertDateTime/ConvertDateTime';
import { storeCurrency } from '../../../server/Data';
const ExpenseCard = ({ uqId, value}) => {
  let noteDescription = value?.noteDescription;
  if(noteDescription){
  if(value?.noteDescription.length > 100){
    noteDescription = noteDescription.substring(0, 100) + "...";
  }  
}
  return (
    <>
      <div id={"id-" + uqId} className={`w-full bg-white rounded-lg shadow dark:border md:mt-0 l:p-0 dark:bg-gray-800 dark:border-gray-700 p-3`}>
      <NavButton link={`/all-expense/${uqId}`} type="nav">
        <div className='flex items-start justify-between gap-4 mb-2' >
      
          <Heading headingStyle="h4" text={value?.note} />

          <div className='flex gap-3 text-gray-700 dark:text-blue-600'>
            <span className='rounded-full p-2 py-0 pt-[2px] bg-green-500 text-white text-sm'>
              <Currency
                quantity={value?.amount || 0}
                currency={storeCurrency}
              />
            </span>           

          </div>     </div>
        {noteDescription && (<Text className="block mb-2 border-t border-gray-600 pt-2  text-sm  transition duration-300 text-gray-900 dark:text-gray-400">{noteDescription}</Text>)}
        <div className='border-t border-gray-600 py-1 flex items-center justify-between'>
                                    <span className="flex justify-between w-full text-sm  transition duration-300 font-medium text-gray-900 dark:text-gray-400">
                                        Created On : <span>  <ConvertDateTime value={value?.createdDate} /> </span>
                                    </span>                              
                                </div>
        </NavButton>
      </div>
    </>
  )
}
export default ExpenseCard;