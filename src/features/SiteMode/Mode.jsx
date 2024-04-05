import React, { useEffect } from 'react';
import './style.css';
import useTheme from '../../contexts/ThemeMode';
import Switch from '../../components/ui/Switch/Switch';

const Mode = () => {    
    const {themeMode, darkMode, lightMode} = useTheme();
    useEffect(() => {
        if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            darkMode();            
          } 
        if (localStorage.getItem("mode") === "dark") { 
            darkMode();     
        } else {
            lightMode(); 
        }
    }, []); 
   
    const onChange = (e) => {
        if (e.currentTarget.checked) {       
           darkMode();
        
        } else {
            lightMode(); 
        }
    };

    return (
        <Switch onChange={onChange} checked={themeMode === 'dark'} />
    );
};

export default Mode;
