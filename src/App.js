import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { AuthProvider } from "./contexts/authContexts";
import { ThemeProvider } from "./contexts/ThemeMode";
import { ThemeConfiger } from "./contexts/ThemeConfig";
import { auth } from "./lib/firebase/firebase";
import Home from './routes/Home/Home';
import Register from "./routes/Account/Register/Register";
import Login from "./routes/Account/Login/Login";
import Forgot from "./routes/Account/Forgot/Forgot";
import Header from "./layouts/Header/Header";
import SideBar from "./layouts/Sidebar/Sidebar";
import AddExpense from "./routes/Expense/Add/AddExpense";
import EditExpense from "./routes/Expense/Edit/EditExpense";
import AllExpense from "./routes/Expense/All/AllExpense";
import ViewExpense from "./routes/Expense/View/ViewExpense";
import AddExpenseCategory from "./routes/Expense/AddExpenseCategory/AddExpenseCategory";
import AddAccounts from "./routes/Expense/AddAccounts/AddAccounts";
import Income from "./routes/Income/AddIncome/Income";
import AllIncome from "./routes/Income/AllIncome/AllIncome";
import ViewIncome from "./routes/Income/View/ViewIncome";
import AddIncomeCategory from "./routes/Income/Categories/AddIncomeCategory";
import EditIncome from "./routes/Income/Edit/EditIncome";
import Profile from "./routes/Profile/View/ViewProfile";
function App() {
  const [themeMode, setThemeMode] = useState('light');  
  const userActive = auth.currentUser;  
  const routesArray = [
    {
      path: "*",
      element: <Login />,
    },
    {
      path: "/home",
      element: <Home />,
    },
    {
      path: "/create-account",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forgot-password",
      element: <Forgot />,
    },
     {
      path: "/your-profile",
      element: <Profile />,
    },
    {
      path: "/add",
      element: <AddExpense />,
    },
    {
      path: "/all-expense/edit/:id",
      element: <EditExpense />,
    },
    {
      path: "/all-expense/:id",
      element: <ViewExpense />,
    },
    {
      path: "/all-expense",
      element: <AllExpense />,
    },
    
    {
      path: "/expense-categories",
      element: <AddExpenseCategory />,
    },
    {
      path: "/accounts",
      element: <AddAccounts />,
    },
    {
      path: "/income",
      element: <Income />,
    },
    {
      path: "/all-income",
      element: <AllIncome />,
    },
    {
      path: "/all-income/:id",
      element: <ViewIncome />,
    },
    {
      path: "/income-categories",
      element: <AddIncomeCategory />,
    },
    {
      path: "/all-income/edit/:id",
      element: <EditIncome />,
    }
    
  ];
  let routesElement = useRoutes(routesArray);
  const darkMode = ()=>{    
    setThemeMode('dark')
    localStorage.setItem("mode", "dark");    
  }
  const lightMode = ()=>{    
    setThemeMode('light')
    localStorage.setItem("mode", "light");
  }
  return (
<>

<ThemeProvider value={{themeMode, darkMode, lightMode}}>
  <ThemeConfiger>
<div className={themeMode}>
<div className={ userActive === null ? 'dark:bg-gray-900 bg-gray-100 min-h-[100vh] flex justify-center items-center' : 'dark:bg-gray-900 bg-gray-100 min-h-[100vh]'}>

<div className={ userActive === null ? 'w-full' : 'p-0 sm:pl-[70px] sm:pb-[0px] pb-[50px]'}>

<AuthProvider>
<SideBar /> <Header />
{routesElement}
</AuthProvider>
</div>
 </div> 
 </div>
 </ThemeConfiger>
 </ThemeProvider>
</>

  );
}

export default App;
