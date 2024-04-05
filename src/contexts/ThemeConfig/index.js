import React, { useContext,useState } from 'react';
const ThemeConfigerContext = React.createContext();

export default function useThemeConfig (){
    return useContext(ThemeConfigerContext);
}

export function ThemeConfiger({ children }) {
    const [pagetitle , setPagetitle] = useState('Home');
    const [activePage, setActivePage] = useState('home');
    const [filter,setFilter] = useState([]);
    const getPageTitle = (title)=>{
        setPagetitle(title);
    }
    const getFilterData = (title)=>{
      setFilter(title);
  }
  const getActivePage = (title)=>{
    setActivePage(title);
}
    const value = {
        pagetitle,
        getPageTitle,
        filter,
        getFilterData,
        activePage,
        getActivePage
      };
    return (
        <ThemeConfigerContext.Provider value={value}>
          {children}
        </ThemeConfigerContext.Provider>
      );
}