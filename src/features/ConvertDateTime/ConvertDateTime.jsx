import React, { useEffect, useState } from 'react';
import { Months } from '../../server/Data';

function ConvertDateTime({value}) {
    const [created, setCreated] = useState([]);   
    useEffect(()=>{
        const milliseconds = value?.seconds * 1000 + Math.round(value?.nanoseconds / 1000000);
        const date = new Date(milliseconds);
        const monthList = Months;
        let day = date.getDate();
        let month = date.getMonth();
        const year = date.getFullYear();
        if (day < 10) {
            day = "0" + day;
        }
        setCreated(day + ", " + monthList[month] + " " + year + " | " + date.toLocaleTimeString())
    },[value])
  return (
  <>
  {created}
  </>
  );
}

export default ConvertDateTime;
