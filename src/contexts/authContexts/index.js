import React, {useContext,useState,useEffect} from 'react';
import { onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../lib/firebase/firebase';
import { GetDefaultAccounts, GetExpenseCategories, GetExpenseData, GetIncomeCategories, GetIncomeData, TotalExpense, TotalIncome, fetchUserData } from '../../lib/firebase/auth';
const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [isGoogleUser, setIsGoogleUser] = useState(false);
    const [expense,setExpense] = useState([]);
    const [income,setIncome] = useState([]);
    const [expenseCategories,setExpenseCategories] = useState([]);
    const [incomeCategories,setIncomeCategories] = useState([]);
    const [accounts,setAccounts] = useState([]);
    const [totalExpense,setTotalExpense] = useState([]);
    const [totalIncome,setTotalIncome] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userAllData, setUserData] = useState(null);
    const [userProfileImg, setUserProfileImg] = useState('');
    
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, initializeUser);
      return unsubscribe;
    }, []);
  
    async function initializeUser(user) {
      if (user) {
        setCurrentUser({ ...user });
  
        // check if provider is email and password login
        const isEmail = user.providerData.some(
          (provider) => provider.providerId === "password"
        );
        setIsEmailUser(isEmail);
  
        // check if the auth provider is google or not
        const isGoogle = user.providerData.some(
          (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
        );

        setIsGoogleUser(isGoogle);  
        setUserLoggedIn(true);
        fetchExpenseData(user.uid);
        fetchExpenseCategories(user.uid);
        fetchIncomeCategories(user.uid)
        fetchAccounts(user.uid)
        fetchTotalExpense(user.uid)
        fetchTotalIncome(user.uid)
        fetchIncome(user.uid)
        userData(user.uid)
      } else {
        setCurrentUser(null);
        setUserLoggedIn(false);
      }
  
      setLoading(false);
    }
    const fetchExpenseData = async (Uid) => {
      const expenseData = await GetExpenseData(Uid).then((response)=>{
        setExpense(response)
        return response;
      });      
    };    
    const fetchExpenseCategories = async (id) => {
      const expenseData = await GetExpenseCategories(id);
      if(expenseData !== null){
        setExpenseCategories(expenseData.values);
      }   
    };
    const fetchTotalExpense = async (id) => {
      const expenseData = await TotalExpense(id);      
if(expenseData !== null){
  setTotalExpense(expenseData);
}

    };
    const fetchAccounts = async (id) => {
      const expenseData = await GetDefaultAccounts(id);      
if(expenseData !== null){
      setAccounts(expenseData.values);
}
    };

    const recheckData = async (Uid) =>{
      await GetExpenseData(Uid).then((response)=>{
        setExpense(response)        
      });      
    }
    const fetchIncome = async (Uid) =>{
      await GetIncomeData(Uid).then((response)=>{
        setIncome(response)        
      });  
    }
    const fetchTotalIncome = async (id) => {
      const expenseData = await TotalIncome(id);      
if(expenseData !== null){
  setTotalIncome(expenseData);
}
    }
const fetchIncomeCategories = async (id) => {
  const expenseData = await GetIncomeCategories(id);
  if(expenseData !== null){
   setIncomeCategories(expenseData.values);
  }   
};
const userData = async (Uid) => {  
  const expenseData = await fetchUserData(Uid);
  setUserData(expenseData);
  setUserProfileImg(expenseData?.profile?.userImage)
}
const userProfileImage = async (userImage) => {  
  setUserProfileImg(userImage)
}

    const value = {
      userLoggedIn,
      isEmailUser,
      isGoogleUser,
      currentUser,
      expense,
      expenseCategories,
      fetchExpenseCategories,
      accounts,
      fetchExpenseData,
      fetchAccounts,
      totalExpense,
      fetchTotalExpense,
      recheckData,
      fetchIncome,
      income,
      totalIncome,
      fetchTotalIncome,
      setCurrentUser,
      incomeCategories,
      setIncomeCategories,
      userData,
      userAllData,
      userProfileImg,
      userProfileImage      
    };
  
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  }
  