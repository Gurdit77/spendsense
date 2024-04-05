import React, { useState,useEffect } from 'react';
import './style.css';
import SiteLogo from "../../assets/images/site-logo.svg"

import NavButton from '../../components/ui/NavButton/NavButton';
import Icon from '../../components/ui/Icons/Icon';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/authContexts';
import useThemeConfig from '../../contexts/ThemeConfig';

const SideBar = ()=>{
    const location = useLocation();
    const {userLoggedIn,userProfileImg} = useAuth();
    const {activePage} = useThemeConfig();
    const [userProfile, setUserProfile] = useState('');
    useEffect(() => {
      setUserProfile(userProfileImg)
    }, [userProfileImg]);
    return(
        <>
         {userLoggedIn && (
<aside className='fixed left-0 sm:max-w-[70px] z-50 sm:bg-transparent sm:dark:bg-transparent  bg-white dark:border-t sm:dark:border-t-0 dark:bg-gray-800 dark:border-gray-700  bottom-0 sm:block flex justify-between   w-full border-gray-700 sm:border-r-[1px] sm:h-full'>

<NavButton type="nav" link={'/home'} color={"blue"} additionalCss={activePage === 'home' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-1" : "sm:p-5 p-2 block bg-black dark:bg-transparent xsm:order-1"}>
<img src={SiteLogo} className='block max-h-[32px]' alt='Logo' />
</NavButton>
<NavButton type="nav" link={'/add'} color={"blue"} additionalCss={activePage === 'add' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-4" : "sm:p-5 p-2 block xsm:order-4"}>
  <Icon type="add" size="30px" colorClass={activePage === 'add' ? "fill-white  dark:fill-white" : "fill-gray-900  dark:fill-white"} />
</NavButton>
<NavButton type="nav" link={'/all-expense'} color={"blue"} additionalCss={activePage === 'expense' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-2" : "sm:p-5 p-2 block xsm:order-2"}>
  <Icon type="expense" size="30px" colorClass={activePage === 'expense' ? "fill-white  dark:fill-white" : "fill-gray-900  dark:fill-white"} />
</NavButton>
<NavButton type="nav" link={'/all-income'} color={"blue"} additionalCss={activePage === 'income' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-3" : "sm:p-5 p-2 block xsm:order-3"}>
  <Icon type="income" size="30px" colorClass={activePage === 'income' ? "fill-white  dark:fill-white" : "fill-gray-900  dark:fill-white"} />
</NavButton>
<NavButton type="nav" link={'/expense-categories'} color={"blue"} additionalCss={activePage === 'categories' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-5" : "sm:p-5 p-2 block xsm:order-5"}>
  <Icon type="category" size="30px" colorClass={activePage === 'categories' ? "fill-white  dark:fill-white" : "fill-gray-900  dark:fill-white"} />
</NavButton>
<NavButton type="nav" link={'/accounts'} color={"blue"} additionalCss={activePage === 'account' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-6" : "sm:p-5 p-2 block xsm:order-6"}>
  <Icon type="card" size="30px" colorClass={activePage === 'account' ? "fill-white  dark:fill-white" : "fill-gray-900  dark:fill-white"} />
</NavButton>
<NavButton type="nav" link={'/your-profile'} color={"blue"} additionalCss={activePage === 'profile' ? "bg-blue-500 sm:p-5 p-2 block xsm:order-7 " : "sm:p-5 p-2 block xsm:order-7"}>
{userProfile === '' && (<Icon type="profile" colorClass="fill-gray-900 dark:fill-white transition-all duration-300" size="30px" />)} 
              {userProfile!== '' && (<img src={userProfile} alt='Profile Pic' className='object-cover border-1 border-gray-500 w-[30px] h-[30px] rounded-full' />) } 
              </NavButton>

</aside>)} 
</>
    )
}
export default SideBar;