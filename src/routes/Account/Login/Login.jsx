import React, { useState } from 'react';
import './style.css';
import Input from '../../../components/Form/Input/Input';
import Button from '../../../components/Form/Button/Button';
import { doSignInWithEmailAndPassword, doSignInWithGoogle } from '../../../lib/firebase/auth';
import { useAuth } from '../../../contexts/authContexts';
import { Navigate } from 'react-router-dom';
import NavButton from '../../../components/ui/NavButton/NavButton';
import Heading from '../../../components/ui/Heading/Heading';
import Notification from '../../../components/ui/Notification/Success/Notification';


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSigningIn, setIsSigningIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const {userLoggedIn} = useAuth();

    const onSubmitLogin = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            setIsSigningIn(true);

            await doSignInWithEmailAndPassword(email, password).then((response) => {
               
                if (response.includes("invalid-credential")) {
                    setIsSigningIn(false);
                    setErrorMessage("Email or password is not correct.")
                }
                else{
                    setLoading(true);
                }
            });
            // doSendEmailVerification();
        }
    };
    const onGoogleSignIn = (e) => {
        e.preventDefault()
        if (!isSigningIn) {
            setIsSigningIn(true)
            doSignInWithGoogle().then((response)=>{
                setLoading(true);
            })
            .catch(err => {
                setIsSigningIn(false)
            })
        }
    }
    const setEmailChange = (e)=> {
        setEmail(e);
        setErrorMessage('');
    }
    return (
        <>
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}
            <div className='p-3 md:p-16'>
                <section className='w-full flex justify-center'>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <div className='text-center'><Heading headingStyle={"h1"} text={'Login To Your Account'} /> </div>
                            <form onSubmit={onSubmitLogin} className='flex flex-col gap-4' action='#'>
                                <Input type='email' placeholder="example@youdomain.com" name="email" required={true} label='Your Email' setData={ (e)=> setEmailChange(e)} value={email} />
                                <Input type='password' placeholder="********" name="password" required={true} label='Your Password' setData={setPassword} value={password} />
                                {errorMessage && (
                                    <span className='text-red-600 font-bold mt-2'>{errorMessage}</span>
                                )}
                                <Button type="solid" color={"blue"} btnType='submit' label="Sign In" loading={isSigningIn} loadingText="Signing In..." />
                                <button
                                    disabled={isSigningIn}
                                    onClick={(e) => { onGoogleSignIn(e) }}
                                    className={`w-full flex items-center justify-center gap-x-3 py-2.5 border transition-all duration-300 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-blue-700 hover:text-white  ${isSigningIn ? 'cursor-not-allowed' : ' dark:hover:bg-gray-900 dark:hover:text-white transition duration-300 active:bg-gray-100'}`}>
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
                                    {isSigningIn ? 'Signing In...' : 'Sign in with Google'}
                                </button>
                                <span className='text-base text-gray-900 dark:text-gray-400 block text-center'>Or</span>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400 rounded-sm text-center">
                             <span>   Don’t have an account yet?  {'   '}
                        
                      <NavButton type="underline" color="blue" link={"/create-account"} label={"Continue"} additionalCss="inline-block"> 
                      
            </NavButton></span> <span>|</span>  <span>                           
                        <NavButton type="underline" color="gray" link={"/forgot-password"} label={"Forgot Password"} additionalCss="inline-block"> 
                        
              </NavButton></span> 
            </p>
                            </form>

                        </div></div></section>

                <Notification active={loading} message="Please wait! Fetching data.."/>
            </div>
        </>
    )
}

export default Login;