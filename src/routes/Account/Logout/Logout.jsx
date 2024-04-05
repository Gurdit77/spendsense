import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Form/Button/Button';
import { doSignOut } from '../../../lib/firebase/auth';


export default function Logout({color, type, label, additionalCss}){   
    const navigate = useNavigate() ;
    const loggedOut = ()=>{
        doSignOut().then(() => { navigate('/login') })
    }
    return(
            <>
            <Button btnType='button' color={color} type={type} label={label} event={loggedOut} additionalCss={additionalCss}/>
            </>        
    )
}