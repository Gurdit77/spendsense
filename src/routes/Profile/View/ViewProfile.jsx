import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../contexts/authContexts';
import { GetCurrentUserUID, changeCoverImage, changeProfileImage, doSignOut } from '../../../lib/firebase/auth';

import { Navigate, useNavigate } from 'react-router-dom';
import Icon from '../../../components/ui/Icons/Icon';
import CoverPlaceholder from "../../../assets/images/cover-placeholder.svg"
import EditProfile from '../Edit/EditProfile';
import useThemeConfig from '../../../contexts/ThemeConfig';



const Profile = () => {   
    const {getActivePage} = useThemeConfig(); 
    const navigate = useNavigate();
    const {userLoggedIn} = useAuth();
    let userImage = <div className='border-2 border-gray-500 p-1 w-[100px] h-[100px] rounded-full'><Icon type="profile" colorClass=" dark:fill-white" size="100%" /></div>;
    const [user, setUserData] = useState(null);
    const [userImageMain, setUserImage] = useState('');
    const [coverImageMain, setCoverImage] = useState(CoverPlaceholder);
    const [imageCoverLoading, setImageCoverLoading] = useState(false);
    const Uid = GetCurrentUserUID();
    const {userAllData, userData, userProfileImg, userProfileImage} = useAuth();
    useEffect(()=>{
        getActivePage('profile');
    },[])
    useEffect(() => {      
        const expenseData   = userAllData;        
        setUserData(expenseData);
        setCoverImage(expenseData?.profile?.coverImage)
        setUserImage(expenseData?.profile?.userImage)
        
}, [userAllData]); 
const changingCoverImage = async (e)=>{
    const imageUrl_ =  URL.createObjectURL(e.target.files[0])
    setCoverImage(imageUrl_);
    const result = changeCoverImage(e,Uid); 
    if(result == 'success'){
    userData(Uid);  
    }
}
const changingProfileImage = async (e)=>{
    try {
    const imageUrl_ =  URL.createObjectURL(e.target.files[0])
    setUserImage(imageUrl_);
    const result = await changeProfileImage(e,Uid);    
    userProfileImage(imageUrl_)
    }
    catch (error) {
        console.error('Error adding expense data:', error);
      }

}

    if (!userLoggedIn) {
        return (
            <Navigate to={'/login'} replace={true} />
        )
    }
    else {

    
            return (
                <>
       
                    <section className='my-4 p-5 relative'>
                        <img src={coverImageMain} className='grayscale opacity-20 w-full h-[200px] sm:h-[300px] object-cover rounded-xl' />
                        <input type='file' onChange={(e) => changingCoverImage(e)} className='absolute right-0 top-0 hidden' id="changeCover" />
                        <label htmlFor='changeCover' className='absolute top-7 right-7 px-5 py-2.5 text-center rounded text-sm border-[1px] border-gray-500 text-gray-500 hover:bg-primary-700 hover:text-white hover:border-primary-700'>{imageCoverLoading ? 'Changing Image...' : 'Change Cover'}</label>
                    </section>
                    <section className='w-full flex mt-[-120px] p-3 md:px-16 z-10 gap-6 mb-6 relative xxl:flex-wrap'>
                        <div className="w-full bg-white rounded-lg shadow dark:border max-w-96 xxl:max-w-full md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-3 md:p-5">
                                <div className="text-center sm:max-w-md gap-4 mx-auto">
                                    <div className="m-2 flex justify-center">
                                    <input type='file' onChange={(e) => changingProfileImage(e)} className='absolute right-0 top-0 hidden' id="changeProfile" />
                        <label htmlFor='changeProfile' className=''>
                          {userImageMain === '' && (userImage)}
                          {userProfileImg !== ''  && (<img src={userProfileImg} alt='Profile Pic' className='object-cover border-2 border-gray-500 p-1 w-[100px] h-[100px] rounded-full' />) }
                        </label>
                                        
                                    </div>
                                    <label className="block mb-2 text-2xl font-medium text-gray-900 dark:text-white">
                                        {user?.profile?.fullName}
                                    </label>
                                </div>
                                <div className='mt-8'>
                                    <div className=' dark:text-white text-gray-900 py-3 border-t-[1px] border-gray-700 flex justify-between'>
                                        Email : <span className="dark:text-gray-300  text-gray-900">{user?.email}</span>
                                    </div>
                                    <div className=' dark:text-white text-gray-900 py-3 border-y-[1px] border-gray-700 flex justify-between'>
                                        Mobile Number : <span className="dark:text-gray-300  text-gray-900">{user?.profile?.mobileNumber}</span>
                                    </div>
                                    <div className='flex justify-center mt-6'>
                                        <button type='button' onClick={() => { doSignOut().then(() => { navigate('/login') }) }} className='px-5 py-2.5 text-center rounded text-sm border-[1px] border-gray-500 text-gray-500 hover:bg-primary-700 hover:text-white hover:border-primary-700'>Sign Out</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0  xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-3 md:p-5">
                                <div className="block text-2xl font-medium text-gray-900 dark:text-white pb-4 mb-4 border-gray-700 border-b-[1px]">
                                    Account Details
                                </div>
                                <EditProfile />
                            </div>
                        </div>
                    </section>
                </>

            );
        
    }
};

export default Profile;
