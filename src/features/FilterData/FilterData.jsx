import React, {useEffect, useState} from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import './style.css'
import Button from '../../components/Form/Button/Button';
import { Months } from '../../server/Data';
import useThemeConfig from '../../contexts/ThemeConfig';
import { useAuth } from '../../contexts/authContexts';
import Text from '../../components/ui/Text/Text';
import Icon from '../../components/ui/Icons/Icon';

  
function FilterData() {
const {expense} = useAuth();
const { getFilterData } = useThemeConfig();
const [todayDate, setTodayDate] = useState('');
const [profileClick, setProfileClick] = useState(false);
const [lastDate, setLastDate] = useState('');
const [click, setClick] = useState(false);
const currentDate = new Date();
const [endDate,setEndDate]= useState(new Date());
const [startDate,setStartDate]= useState(new Date());
const lastWeekDate = new Date(currentDate.getTime() - 31 * 24 * 60 * 60 * 1000);
const monthList = Months;
let day = currentDate.getDate();
const month = currentDate.getMonth();
const year = currentDate.getFullYear();
if (day < 10) {
    day = "0" + day;
}
let lastWeekDay = lastWeekDate.getDate();
const lastWeekMonth = lastWeekDate.getMonth();
const lastWeekYear = lastWeekDate.getFullYear();
if (lastWeekDay < 10) {
    lastWeekDay = "0" + lastWeekDay;
}



useEffect(()=>{ 
setStartDate(new Date(currentDate.getTime() - 31 * 24 * 60 * 60 * 1000))
  setClick(false);
if(expense?.length === 0){

}else{
  if(expense !== null){
  const items = expense?.values.filter((item)=>{
    const milliseconds = item.createdDate?.seconds * 1000 + Math.round(item.createdDate?.nanoseconds / 1000000);
    let itemDate = new Date(milliseconds);
    return(itemDate>= startDate &&
        itemDate<= endDate);
  });
  getFilterData(items)

}      
}

},[expense,click,startDate])
useEffect(()=>{ 
  setTodayDate(day + ', ' + monthList[month] + ' ' + year )
  setLastDate(lastWeekDay + ', ' + monthList[lastWeekMonth] + ' ' + lastWeekYear )
  setStartDate(lastWeekDate);    

},[expense]);
const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection'
  }
      const handleSelect = (ranges)=>{
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);    
        setClick(true)    
      }
      const dropdown = (e)=> {
        setProfileClick(prevState => !prevState)
      }
      const profileClasses = 'w-auto transition-all duration-300 z-20 ease-in-out bg-white rounded-lg p-2 sm:p-4 absolute right-0 top-8 shadow border-transparent border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700';
      const profileClassesOverlay = 'cursor-pointer z-10 fixed top-0 w-full h-full right-0';
      return (
        <>
   
       <div className='flex items-center gap-2'> 
       <Text className="block  text-md  transition duration-300 text-gray-900 dark:text-gray-400">Filter: </Text>
       <Button event={dropdown} btnType="button" type="solid" additionalCss=" cursor-pointer flex items-center" >
       {lastDate + ' - ' + todayDate}
       <span className={profileClick ? 'rotate-180 transition-all duration-300 origin-center': 'rotate-0 duration-300 transition-all origin-center' }>
       <Icon type="expand" colorClass="fill-gray-900 dark:fill-white transition-all duration-300" size="24px" />
       </span>
       </Button>
       </div>
        <div className={'absolute top-full x-xsm-tab:max-full x-xsm-tab:overflow-auto'+ profileClasses + `${profileClick ? ' animate-dropdown' : ' unanimate-dropdown'}` } >
        <DateRangePicker     
          ranges={[selectionRange]}
          onChange={handleSelect}
          editableDateInputs={true}          
          staticRanges={[]}          
          inputRanges={[]}
          rangeColors={["#3b82f6"]}
        />
        </div>
        <div onClick={() => setProfileClick(prevState => !prevState)} className={profileClick ? `block ${profileClassesOverlay}` : ` hidden ${profileClassesOverlay}`}></div>
        </>
      )
}

export default FilterData;
