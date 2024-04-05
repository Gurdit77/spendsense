import React, { useState, useEffect } from 'react';
import './style.css';
import Icon from '../../components/ui/Icons/Icon';
import NavLink from '../../components/ui/NavButton/NavButton'
import Logout from '../../routes/Account/Logout/Logout';
import Mode from '../../features/SiteMode/Mode';
import useThemeConfig from '../../contexts/ThemeConfig';
import { useAuth } from '../../contexts/authContexts';
const Header = () => {
  const { pagetitle } = useThemeConfig();
  const [userLogger, setIsLoggedIn] = useState(false);
  const [profileClick, setProfileClick] = useState(false);
  const {userLoggedIn, userAllData, userProfileImg} = useAuth();
  const [userProfile, setUserProfile] = useState('');
  useEffect(() => {
    setIsLoggedIn(userLoggedIn)
  }, [userLoggedIn]);
  useEffect(() => {
    setUserProfile(userProfileImg)
  }, [userAllData, userProfileImg]);

  const heading = pagetitle;

  let profileClasses = 'min-w-60 w-full transition-all duration-300 ease-in-out bg-white rounded-lg p-2 sm:p-4 absolute right-0 top-8 shadow border-transparent border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700';
  let profileClassesOverlay = 'z-10 fixed top-0 w-full h-full right-0';
  return (
    <>
      {userLogger && (<header className='border-gray-700 border-b-[1px]'>
        <div className='flex justify-between gap-10 items-center p-5'>
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{heading}</h1>
          <div className='flex gap-3 items-center'>
            <Mode />
            <div className='relative z-20'>
              <button type='button' className='block cursor-pointer' onClick={() => setProfileClick(prevState => !prevState)}>
              {userProfile === '' && (<Icon type="profile" colorClass="fill-gray-900 dark:fill-white transition-all duration-300" size="30px" />)} 
              {userProfile!== '' && (<img src={userProfile} alt='Profile Pic' className='object-cover border-1 border-gray-500 w-[30px] h-[30px] rounded-full' />) } 
                
              </button>
              <div className={profileClick ? `animate-dropdown ${profileClasses}` : ` unanimate-dropdown ${profileClasses}`}>
                <NavLink type="nav" link={'/your-profile'} color="blue" label="Your Profile" additionalCss="block p-3 text-gray-800 text-left border-b dark:border-gray-700 border-gray-200 hover:border-gray-200 dark:hover:text-blue-500  dark:hover:border-gray-700 hover:text-gray-400 dark:hover:text-blue-300" />
                <Logout type="nav" color="blue" label="Logout" additionalCss="block p-3 text-left text-gray-800 dark:text-blue-300 hover:text-gray-400 dark:hover:text-blue-500 dark:hover:border-blue-300" />
              </div>

            </div>
            <div onClick={() => setProfileClick(prevState => !prevState)} className={profileClick ? `block ${profileClassesOverlay}` : ` hidden ${profileClassesOverlay}`}></div>
          </div>
        </div>
      </header>)}


    </>

  )
}

export default Header;