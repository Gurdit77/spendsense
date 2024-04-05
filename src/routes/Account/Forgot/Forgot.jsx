import React, { useState } from 'react';
import './style.css';
import { doPasswordReset } from '../../../lib/firebase/auth';
import Input from '../../../components/Form/Input/Input';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContexts';
import Heading from '../../../components/ui/Heading/Heading'
import Button from '../../../components/Form/Button/Button';
import NavButton from '../../../components/ui/NavButton/NavButton';

const Forgot = () => {
    const [email, setEmail] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [hide, setHide] = useState(true)
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth(); 
    let userLoggedInOrNot = userLoggedIn;
    const onSubmitForm = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);
            const passwordRest = await doPasswordReset(email);
            console.log(passwordRest)
            if(passwordRest === "sent"){
                setIsSigningIn(false);
                setHide(false);
                setErrorMessage(`An password reset email is sent to ${email}.`);
            }
        }
    };


    return (
        <>
            {userLoggedInOrNot && (<Navigate to={'/home'} replace={true} />)}          
            <div className='p-3 md:p-16 w-full'>
                <section className='w-full flex justify-center'>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className='text-center'><Heading headingStyle={"h1"} text={'Forgot Password'} /> </div>
                            {hide && (<form onSubmit={onSubmitForm} className='flex flex-col gap-4' action='#'>
                                <Input type='email' placeholder="example@youdomain.com" name="email" required={true} label='Your Email' setData={(e) => setEmail(e)} value={email} />                               
                                <Button type="solid" color={"blue"} btnType='submit' label="Send" loading={isSigningIn} loadingText="Sending..." />                                
                                <span className='text-base text-gray-900 dark:text-gray-400 block text-center'>Or</span>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 rounded-sm text-center">
                             <span>   
                        
                      <NavButton type="underline" color="blue" link={"/login"} label={"← Go Back"} additionalCss="inline-block"> 
                      
            </NavButton></span>
            </p>
                            </form>)}
                            {errorMessage && (
                                    <span className='text-blue-400 font-semibold mt-6 block text-center'>{errorMessage}</span>
                                )}
                                {errorMessage && (
                                    <NavButton type="solid" color="blue" link={"/login"} label={"Continue to Login"} > 
                      
                      </NavButton>
                                ) }
                        </div></div></section></div>
        </>)
}

export default Forgot;