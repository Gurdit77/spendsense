import React, { useState } from 'react';
import './style.css';
import Input from '../../../components/Form/Input/Input';
import Heading from '../../../components/ui/Heading/Heading'
import Button from '../../../components/Form/Button/Button';
import NavButton from '../../../components/ui/NavButton/NavButton';
import { doCreateUserWithEmailAndPassword, doSignInWithGoogle } from "../../../lib/firebase/auth"
import { useAuth } from '../../../contexts/authContexts';
import { Navigate } from 'react-router-dom';

const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const { userLoggedIn } = useAuth(); 
    let userLoggedInOrNot = userLoggedIn;
    
    const register = async (e) => {
        e.preventDefault()
        if (password === confirmPassword) {
            if (password.length >= 8) {
                if (/[a-z]/.test(password) && /[A-Z]/.test(password) && /[0-9]/.test(password)) {
                    if( password === "Example123"){
                        setErrorMessage("Please use another password.");
                    }
                    else{
                        if (!isRegistering) {
                            setIsRegistering(true);
                            setErrorMessage('');                        
                            const userCredential = await doCreateUserWithEmailAndPassword(email, password);                            
                            if (userCredential === 'email-already-in-use') {
                                setErrorMessage('Email already in use. Please select another Email');
                                setIsRegistering(false);
                            } else {
                                setErrorMessage('Error creating user. Please try again later.');
                                setIsRegistering(false);
                            }
                        }                                                
                    }
                } else {
                         setErrorMessage('Password must contain at least one lowercase letter, one uppercase letter, and one digit.');
                }
            } else {
                setErrorMessage('Password must be at least 8 characters long.');
            }
            
        } else {
            setErrorMessage('The password and confirm password do not match.');
        }
    }
    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isRegistering) {
            setIsRegistering(true)
            doSignInWithGoogle().catch(err => {
                console.log(err)
                setIsRegistering(false)
            })
        }
    }
    const setEmailChange = (e)=> {
        setEmail(e);
        setErrorMessage('');
    }
    return (
        <>
         {userLoggedInOrNot && (<Navigate to={'/login'} replace={true} />)}
         <div className='p-3 md:p-16'>
                <section className='w-full flex justify-center'>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                           <div className='text-center'><Heading headingStyle={"h1"} text={'Create Your Account'} /> </div> 
                            <form onSubmit={register} className='flex flex-col gap-4' action='#'>
                                <Input type='email' placeholder="example@youdomain.com" name="email" required={true} label='Your Email' setData={(e)=>setEmailChange(e)} value={email} />
                                <Input type='password' placeholder="********" name="password" required={true} label='Your Password' setData={setPassword} value={password} />
                                <Input type='password' placeholder="********" name="Confirm password" required={true} label='Confirm Your Password' setData={setConfirmPassword} value={confirmPassword} />
                                {errorMessage && (
                            <span className='text-red-600 font-bold'>{errorMessage}</span>
                        )}
                                <Button type="solid" color={"blue"} btnType='submit' label="Sign Up" loading={isRegistering} loadingText="Signing Up..." />
                                <button
                        disabled={isRegistering}
                        onClick={(e) => { onGoogleSignIn(e) }}
                        className={`w-full flex items-center justify-center gap-x-3 py-2.5 border transition-all duration-300 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-700 hover:text-white  ${isRegistering ? 'cursor-not-allowed' : ' dark:hover:bg-gray-900 dark:hover:text-white transition duration-300 active:bg-gray-100'}`}>
                        <svg className="w-5 h-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_17_40)">
                                <path d="M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z" fill="#4285F4" />
                                <path d="M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z" fill="#34A853" />
                                <path d="M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z" fill="#FBBC04" />
                                <path d="M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z" fill="#EA4335" />
                            </g>
                            <defs>
                                <clipPath id="clip0_17_40">
                                    <rect width="48" height="48" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        {isRegistering ? 'Signing Up...' : 'Sign up with Google'}
                    </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 rounded-sm">
                        Already have an account? {'   '}
                        
                      <NavButton type="underline" color="blue" link={"/login"} label={"Continue"} additionalCss="inline-block"> 
                      
            </NavButton>
            </p>
                                <p className='bg-gray-50 border transition duration-300 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                                Note: Password must contain at least one lowercase letter, one uppercase letter, and one digit. e.g Example123
                                </p>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        </>
    )
}

export default Register;