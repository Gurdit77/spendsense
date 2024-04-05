import React, { useState } from 'react';
import { GetCurrentUserUID, GetUserData, UpdateUser } from '../../../lib/firebase/auth';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { useAuth } from '../../../contexts/authContexts';
const EditProfile = () => {
    let getId, {userData, userAllData} = useAuth();
    const Uid = GetCurrentUserUID();
    const user = userAllData;    
    const [firstName, setFirstName] = useState(user?.profile?.firstName);
    const [userImage, setUserImage] = useState(user?.profile?.userImage);
    const [coverImage, setCoverImage] = useState(user?.profile?.coverImage);
    const [lastName, setLastName] = useState(user?.profile?.lastName);
    const [mobileNumber, setMobileNumber] = useState(user?.profile?.mobileNumber);
    const [email, setEmail] = useState(user?.email);
    const [address, setAddress] = useState(user?.profile?.address);
    const [City, setCity] = useState(user?.profile?.City);
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const onUpdate = (e) => {        
        e.preventDefault();
        let updateUser = {};         
        updateUser.id = Uid;
        updateUser.profile = {}
        updateUser.profile.firstName = firstName || user?.profile?.firstName || '';
        updateUser.profile.lastName = lastName || user?.profile?.lastName || '';
        updateUser.profile.mobileNumber = mobileNumber || user?.profile?.mobileNumber || '';        
        updateUser.profile.address = address || user?.profile?.address || '';
        updateUser.profile.country = country || user?.profile?.country || '';
        updateUser.profile.region = region || user?.profile?.region || '';
        updateUser.profile.City = firstName || user?.profile?.City || '';
        updateUser.profile.userImage = userImage || user?.profile?.userImage || '';
        updateUser.profile.coverImage = coverImage || user?.profile?.coverImage || '';
        userData(Uid) 
        UpdateUser(updateUser);
    }
    return (
        <>
            <form action='edit-profile' onSubmit={onUpdate}>
                <div className='flex justify-between gap-5'>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            First Name
                        </label>
                        <input
                            type="text"

                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={user?.profile?.firstName || 'First Name'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Last Name
                        </label>
                        <input
                            type="text"

                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder={user?.profile?.lastName || 'Last Name'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className='flex justify-between gap-5 mt-5'>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            placeholder={user?.profile?.mobileNumber || 'Phone Number'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Email
                        </label>
                        <input
                            type="text"
                            disabled
                            value={user?.email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={user?.email  || 'Email'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className='flex justify-between gap-5 mt-5'>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Address
                        </label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            placeholder={user?.profile?.address || 'Address'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            City
                        </label>
                        <input
                            type="text"
                            value={City}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder={user?.profile?.City || 'City'}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />
                    </div>
                </div>
                <div className='flex justify-between gap-5 mt-5'>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Country
                        </label>
                        <CountryDropdown
                            value={country}
                            onChange={(val) => setCountry(val)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                    </div>
                    <div className='flex-1'>
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Region / State
                        </label>


                        <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => setRegion(val)}
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        />

                    </div>
                </div>
                <div className='flex justify-center mt-6'>
                    <button type='submit' className='px-5 py-2.5 text-center rounded text-sm border-[1px]  bg-primary-700 dark:text-white border-primary-700'>Update</button>
                </div>
            </form>
        </>)
}

export default EditProfile;