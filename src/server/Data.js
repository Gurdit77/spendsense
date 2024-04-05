import { doc, setDoc, collection } from "firebase/firestore"; 
export const IconsArray = ["profile", "add", "expense", "transport", "shopping", "emi", "health", "food", "education", "datalist", "category"];    

export const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const FullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const DefaultUserData = async (db,id, email)=>{
 const frankDocRef = doc(db, "usersData", id);    
  await setDoc(frankDocRef, {
    email: email,
    profile: { coverImage: "", userImage: "", fullName: "", firstName:"", lastName:"", mobileNumber:"", address:"", City:"", country:"", region:""  }      
  });
  const subcollectionRef = collection(frankDocRef, 'expense');
  const categoriesDocRef = doc(subcollectionRef, 'categories');
  await setDoc(categoriesDocRef, {
   values:[
    {
      value: "Education",
      status:true,
      icon:"education"
    },
    {
      value: "Food",
      status:true,
      icon:"food"
    },
    {
      value: "Health",
      status:true,
      icon:"health"
    },
    {
      value: "EMI",
      status:true,
      icon:"emi"
    },
    {
      value: "Shopping",
      status:true,
      icon:"shopping"
    },
    {
      value: "Transport",
      status:true,
      icon:"transport"
    }]
  });
  const dataDocRef = doc(subcollectionRef, 'expenseData');
  await setDoc(dataDocRef, {
             values:[]
  });
  const accountsDocRef = doc(subcollectionRef, 'account');
  await setDoc(accountsDocRef, {
    values:[
      {
        value: "Back account",
        status:true  
      },
      {
        value: "Card",
        status:true  
      },
      {
        value: "Cash",
        status:true  
      }
    ]
  });


  const incomeRef = collection(frankDocRef, 'Income');
  const incomeCategoriesDocRef = doc(incomeRef, 'categories');
  await setDoc(incomeCategoriesDocRef, {
   values:[
    {
      value: "Allowance",
      status:true,
      icon:"allowance"
    },
    {
      value: "Salary",
      status:true,
      icon:"salary"
    },
    {
      value: "Petty Cash",
      status:true,
      icon:"petty cash"
    },
    {
      value: "Bonus",
      status:true,
      icon:"bonus"
    }
    ]
  });
  const dataIncomeDocRef = doc(incomeRef, 'incomeData');
  await setDoc(dataIncomeDocRef, {
             values:[]
  });
}

export const storeCurrency = "INR";