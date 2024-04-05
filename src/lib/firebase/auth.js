import { useEffect, useState }  from 'react';
import { auth } from './firebase';
import { doc, setDoc, getDoc, updateDoc, collection, arrayUnion } from "firebase/firestore"; 
import { db } from "./firebase";
import { useAuth } from '../../contexts/authContexts';
import { getStorage, ref, uploadBytes, getDownloadURL, listAll } from "firebase/storage";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { DefaultUserData } from '../../server/Data';


export const doCreateUserWithEmailAndPassword = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const frankDocRef = doc(db, "usersData", userCredential.user.uid);    
    await setDoc(frankDocRef, {
      email: userCredential.user.email,
      profile: { coverImage: "", userImage: "", fullName: "", firstName:"", lastName:"", mobileNumber:"", address:"", City:"", country:"", region:""  }       
    });
    DefaultUserData(db,userCredential.user.uid, userCredential.user.email);
    return userCredential;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return 'email-already-in-use';
    }

  }
};

export const GetCurrentUserUID = () => {
  let getId = useAuth();  
  let Uid = getId.currentUser.uid;   
  return Uid;
}

export const doSignInWithEmailAndPassword = (email, password) => {
  const signIN =   signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in     
    return "Logged In";
    // ...
  })
  .catch((error) => {
     const errorMessage = error.message;
    return errorMessage;
  });
  return signIN;
};

export const doSignInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  const result = await signInWithPopup(auth, provider);
  const user = result.user;
  const isNewUser = user.metadata.creationTime === user.metadata.lastSignInTime;
  if(isNewUser){
    DefaultUserData(db,result.user.uid, result.user.email)
  }
 
  return result;
  // add user to firestore
};

export const doSignOut = () => {
  return auth.signOut();
};

export const doPasswordReset = (email) => {
  return sendPasswordResetEmail(auth, email)
    .then(() => {
      return "sent";
    })
    .catch((error) => {
      console.error(error);
      return error.message;
    });
};


export const doPasswordChange = (password) => {
  return updatePassword(auth.currentUser, password);
};

export const doSendEmailVerification = () => {
  const sendEmail =  sendEmailVerification(auth.currentUser, {
    url: `${window.location.origin}/home`,
  }).then((response) => {    
    // Signed in     
    return response;
    // ...
  })
  .catch((error) => {
     const errorMessage = error.message;
    return errorMessage;
  });

  return sendEmail;
};

export const GetUserData = () => {
  const [userData, setUserData] = useState(null);
  const Uid = GetCurrentUserUID();
  useEffect(() => {
        
    const fetchUserData = async () => {
        try {
            const userRef = doc(db, 'usersData', Uid);
            const userDoc = await getDoc(userRef);
            
            if (userDoc.exists()) {
                setUserData(userDoc.data());
            } else {
                setUserData(null)
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error fetching city data:', error);
        }
    };

    fetchUserData();
}, [Uid]);
  return(userData);
};


export const UpdateUser = async (user) => {
  const frankDocRef = doc(db, "usersData", user.id);
  updateDoc(frankDocRef, {
    profile: user.profile
});
};



export const GetExpenseCategories = async (Uid) => {
  try {    
    const userRef = doc(collection(db, 'usersData', Uid, 'expense'), 'categories');
    const userDoc = await getDoc(userRef); 
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};

export const GetDefaultAccounts = async (Uid) => {
  try {
    const userRef = doc(collection(db, 'usersData', Uid, 'expense'), 'account');
    const userDoc = await getDoc(userRef); 
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};


export const AddExpenseCategories = async (categoryName) => {
  try {
    const Uid = GetCurrentUserUID();  
    const expenseCategoriesRef = doc(collection(db, 'usersData', Uid, 'expense'), 'categories');
    const categoriesDoc = await getDoc(expenseCategoriesRef);  
    if (categoriesDoc.exists()) {
      await updateDoc(expenseCategoriesRef, {
        [categoryName]: true
      });            
    } else {
      await setDoc(expenseCategoriesRef, {
        [categoryName]: true
      });
    }
    return 'success';
  } catch (error) {
    console.error('Error adding expense categories:', error);
    return 'error';
  }
}
//  Expense
export const addExpenseDataToFirestore = async (Uid, uniqueId, note, amount, expenseCategory, date, expenseAccount, noteDescription, createdDate) => {
  try {
    const addExpenseData = {
      note: note,
      amount: parseFloat(amount),
      expenseCategory: expenseCategory,
      date: date,
      expenseAccount: expenseAccount,
      noteDescription: noteDescription,
      createdDate:createdDate,
      uniqueId:uniqueId
    };
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'expenseData');
    const expenseDocSnapshot = await getDoc(expenseDocRef);
    if (expenseDocSnapshot.exists()) {
    const expenseDocData = expenseDocSnapshot.data();
    let total = expenseDocData?.total || 0;
    total = parseFloat(total) + parseFloat(amount);
    await updateDoc(expenseDocRef, {
      total: total
  });
    const valuesArray = expenseDocData.values || [];
    valuesArray.unshift(addExpenseData);
    await updateDoc(expenseDocRef, {
        values: valuesArray
    });
} else {
    await setDoc(expenseDocRef, {
        values: [addExpenseData]
    });
}

    return 'success';
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};


export const GetExpenseData = async (Uid) => {
  try {
    const userRef = doc(collection(db, 'usersData', Uid, 'expense'), 'expenseData');
    const userDoc = await getDoc(userRef); 
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};

export const DeleteExpenseData = async (Uid,item) => {
  try {
    const userRef = doc(collection(db, 'usersData', Uid, 'expense' ),'expenseData');
    const userDoc = await getDoc(userRef);     
    const updatedValues = userDoc.data()?.values.filter(value => value.uniqueId !== item);
    const notUpdatedValues = userDoc.data()?.values.filter(value => value.uniqueId === item);
     let total = userDoc.data()?.total || 0;
     total = total - notUpdatedValues[0]?.amount;     
     await updateDoc(userRef, {
       total: total
   });
    await updateDoc(userRef, {
        values: updatedValues
    });

   return 'success';
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};


export const GetOneExpenseData = async (Uid, field) => {
  try {    
    const userRef = doc(collection(db, 'usersData', Uid, 'expense'), 'expenseData');
    const userDoc = await getDoc(userRef); 
    if (userDoc.exists()) {
      let values = {};
      const expenseData = userDoc.data()?.values;
      const updatedValues = expenseData.filter(value => value.uniqueId === field);
      expenseData.filter((value,index)=>{
        if(value.uniqueId === field){
          value.index = index;
        }
      })
      if (updatedValues) {
        values.item = updatedValues[0];
        return values;
      } else {        
        return null;
      }
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching expense data:', error);
    return null;
  }
};



export const UpdateExpenseDataToFirestore = async (index, Uid, note, amount, expenseCategory, date, expenseAccount, noteDescription, currentDate) => {
  try {
   const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'expenseData');
   const expenseDocSnapshot = await getDoc(expenseDocRef);    
 
    const valuesArray = expenseDocSnapshot.data()?.values || [];   
    const actualAmount = valuesArray[index].amount; 
    valuesArray[index].note = note;
    valuesArray[index].amount = parseFloat(amount);
    valuesArray[index].expenseCategory = expenseCategory;
    valuesArray[index].date = date;
    valuesArray[index].expenseAccount = expenseAccount;
    valuesArray[index].noteDescription = noteDescription;
    valuesArray[index].updateDate = currentDate;
    if (expenseDocSnapshot.exists()) {    
      await updateDoc(expenseDocRef, {
        values: valuesArray
    }).then(()=>{    
      let total = expenseDocSnapshot.data()?.total || 0;      
      total = parseFloat(total) - parseFloat(actualAmount);
      total = parseFloat(total) + parseFloat(amount);
      updateDoc(expenseDocRef, {
        total: total
    });
    });
    return 'success'; 
    }    
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};



export const addExpenseCategory = async (Uid,value) => {
  try {
    const addExpenseData = {   
  value:value,
  status:true,
  icon:"datalist"
    };
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'categories');

    const expenseDocSnapshot = await getDoc(expenseDocRef);
    if (expenseDocSnapshot.exists()) {
   await updateDoc(expenseDocRef, {
        values: arrayUnion(addExpenseData)
    });
    return "success";
} else {
 await setDoc(expenseDocRef, {
        values: [addExpenseData]
    });
    return "success";
}
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};


export const UpdateExpenseCategory = async (Uid, index, status) => {
  try {
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'categories');
    const expenseDocSnapshot = await getDoc(expenseDocRef); 
    const valuesArray = expenseDocSnapshot.data()?.values || [];    
    valuesArray[index].status = status;
    if (expenseDocSnapshot.exists()) {    
      await updateDoc(expenseDocRef, {
        values: valuesArray
    }).then(()=>{
      return 'success'; 
    });

    }    
    return 'success';
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};

export const UpdateAccounts = async (Uid, index, status) => {
  try {
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'account');
    const expenseDocSnapshot = await getDoc(expenseDocRef); 
    const valuesArray = expenseDocSnapshot.data()?.values || [];    
    valuesArray[index].status = status;
    if (expenseDocSnapshot.exists()) {    
      await updateDoc(expenseDocRef, {
        values: valuesArray
    }).then(()=>{
      return 'success'; 
    });

    }    
    return 'success';
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};



export const AddAccountFirebase = async (Uid,value) => {
  try {
    const addExpenseData = {   
  value:value,
  status:true
    };
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'account');

    const expenseDocSnapshot = await getDoc(expenseDocRef);
    if (expenseDocSnapshot.exists()) {
   await updateDoc(expenseDocRef, {
        values: arrayUnion(addExpenseData)
    });
    return "success";
} else {
 await setDoc(expenseDocRef, {
        values: [addExpenseData]
    });
    return "success";
}
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};



// Income 
export const addIncomeDataToFirestore = async (Uid, uniqueId, note, amount, expenseCategory, date, expenseAccount, noteDescription, createdDate) => {
  try {
    const addExpenseData = {
      note: note,
      amount: parseFloat(amount),
      expenseCategory: expenseCategory,
      date: date,
      expenseAccount: expenseAccount,
      noteDescription: noteDescription,
      createdDate:createdDate,
      uniqueId:uniqueId
    };
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'Income'), 'incomeData');
    const expenseDocSnapshot = await getDoc(expenseDocRef);
    if (expenseDocSnapshot.exists()) {
    const expenseDocData = expenseDocSnapshot.data();
    let total = expenseDocData?.total || 0;
    total = parseFloat(total) + parseFloat(amount);
    await updateDoc(expenseDocRef, {
      total: total
  });
    const valuesArray = expenseDocData.values || [];
    valuesArray.push(addExpenseData);
    await updateDoc(expenseDocRef, {
        values: valuesArray
    });

} else {
    await setDoc(expenseDocRef, {
        values: [addExpenseData]
    });
}

    return 'success';
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};



export const GetIncomeData = async (Uid) => {
  try {
    const userRef = doc(collection(db, 'usersData', Uid, 'Income'), 'incomeData');
    const userDoc = await getDoc(userRef);     
    if (userDoc.exists()) {
      
      return userDoc.data()?.values;
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};


export const DeleteIncomeData = async (Uid,item) => {
  try {
    const userRef = doc(collection(db, 'usersData', Uid, 'Income' ),'incomeData');
    const userDoc = await getDoc(userRef);     
    const updatedValues = userDoc.data()?.values.filter(value => value.uniqueId !== item);
    const notUpdatedValues = userDoc.data()?.values.filter(value => value.uniqueId === item);
     let total = userDoc.data()?.total || 0;
     total = total - notUpdatedValues[0]?.amount;     
     await updateDoc(userRef, {
       total: total
   });
    await updateDoc(userRef, {
        values: updatedValues
    });

   return 'success';
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};


export const GetOneIncomeData = async (Uid, field) => {
  try {    
    const userRef = doc(collection(db, 'usersData', Uid, 'Income'), 'incomeData');
    const userDoc = await getDoc(userRef); 
    if (userDoc.exists()) {
      let values = {};
      const expenseData = userDoc.data()?.values;

      const updatedValues = expenseData.filter(value => value.uniqueId === field);
      expenseData.filter((value,index)=>{
        if(value.uniqueId === field){
          value.index = index;
        }
      })
      if (updatedValues) {
        values.item = updatedValues[0];
        return values;
      } else {        
        return null;
      }

    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching expense data:', error);
    return null;
  }
};


export const AddIncomeCategories = async (Uid,value) => {
  try {
    const addExpenseData = {   
  value:value,
  status:true,
  icon:"datalist"
    };
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'Income'), 'categories');

    const expenseDocSnapshot = await getDoc(expenseDocRef);
    if (expenseDocSnapshot.exists()) {
   await updateDoc(expenseDocRef, {
        values: arrayUnion(addExpenseData)
    });
    return "success";
} else {
 await setDoc(expenseDocRef, {
        values: [addExpenseData]
    });
    return "success";
}
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};


export const UpdateIncomeCategory = async (Uid, index, status) => {
  try {
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'Income'), 'categories');
    const expenseDocSnapshot = await getDoc(expenseDocRef); 
    const valuesArray = expenseDocSnapshot.data()?.values || [];    
    valuesArray[index].status = status;
    if (expenseDocSnapshot.exists()) {    
      await updateDoc(expenseDocRef, {
        values: valuesArray
    }).then(()=>{
      return 'success'; 
    });

    }    
    return 'success';
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};


export const GetIncomeCategories = async (Uid) => {
  try {    
    const userRef = doc(collection(db, 'usersData', Uid, 'Income'), 'categories');
    const userDoc = await getDoc(userRef);     
    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching city data:', error);
    return null;
  }
};


export const UpdateIncomeDataToFirestore = async (index, Uid, note, amount, expenseCategory, date, expenseAccount, noteDescription, currentDate) => {
  try {
   const expenseDocRef = doc(collection(db, 'usersData', Uid, 'Income'), 'incomeData');
   const expenseDocSnapshot = await getDoc(expenseDocRef);    
 
    const valuesArray = expenseDocSnapshot.data()?.values || [];   
    const actualAmount = valuesArray[index].amount; 
    valuesArray[index].note = note;
    valuesArray[index].amount = parseFloat(amount);
    valuesArray[index].expenseCategory = expenseCategory;
    valuesArray[index].date = date;
    valuesArray[index].expenseAccount = expenseAccount;
    valuesArray[index].noteDescription = noteDescription;
    valuesArray[index].updateDate = currentDate;
    if (expenseDocSnapshot.exists()) {    
      await updateDoc(expenseDocRef, {
        values: valuesArray
    }).then(()=>{    
      let total = expenseDocSnapshot.data()?.total || 0;      
      total = parseFloat(total) - parseFloat(actualAmount);
      total = parseFloat(total) + parseFloat(amount);
      updateDoc(expenseDocRef, {
        total: total
    });
    });
    return 'success'; 
    }    
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};



// Home



export const TotalExpense = async (Uid) => {
  try {
var date = new Date(), y = date.getFullYear(), m = date.getMonth();
var firstDay = new Date(y, m, 1);
var lastDay = new Date(y, m + 1, 0);
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'expense'), 'expenseData');
    const expenseDocSnapshot = await getDoc(expenseDocRef); 
    const items = expenseDocSnapshot.data()?.values.filter((item)=>{
      const milliseconds = item.createdDate?.seconds * 1000 + Math.round(item.createdDate?.nanoseconds / 1000000);
      let itemDate = new Date(milliseconds);
      return(itemDate>= firstDay &&
          itemDate<= lastDay);
    });
    let total = 0;
    items.filter((item)=>{
      total += item.amount;
    });
      return total;
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};

export const TotalIncome = async (Uid) => {
  try {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
    const expenseDocRef = doc(collection(db, 'usersData', Uid, 'Income'), 'incomeData');
    const expenseDocSnapshot = await getDoc(expenseDocRef); 
    const items = expenseDocSnapshot.data()?.values.filter((item)=>{
      const milliseconds = item.createdDate?.seconds * 1000 + Math.round(item.createdDate?.nanoseconds / 1000000);
      let itemDate = new Date(milliseconds);
      return(itemDate>= firstDay &&
          itemDate<= lastDay);
    });
    let total = 0;
    items.filter((item)=>{
      total += item.amount;
    });
      return total;
  } catch (error) {
    console.error('Error adding expense data:', error);
    throw error; 
  }
};


export const fetchUserData = async (Uid) => {
  try {
      const userRef = doc(db, 'usersData', Uid);
      const userDoc = await getDoc(userRef);      
      if (userDoc.exists()) {
          let user54 = userDoc.data();             
          return userDoc.data();
      } 
      else{
        return "Not Found";
      }
  } catch (error) {
      console.error('Error fetching city data:', error);
  }
};

export const changeCoverImage = (e,Uid) => {

  const imageUrl =  e.target.files[0]
  const storage = getStorage();
 const imageRef = ref(storage, 'userCoverImage/user-' + Uid + '/' + e.target.files[0].name);

 uploadBytes(imageRef, imageUrl)
.then((snapshot) => {
getDownloadURL(snapshot.ref).then( async (url) => {      
const frankDocRef = doc(db, "usersData", Uid);
const updated = await updateDoc(frankDocRef, {
  "profile.coverImage": url
});
return 'success';
});
}).catch((error) => {
console.error('Upload failed', error);

});
}


export const changeProfileImage = async (e,Uid) => {
  try {
    const frankDocRef = doc(db, "usersData", Uid);
    const imageUrl =  e.target.files[0]
    const storage = getStorage();
   const imageRef = ref(storage, 'userProfileImage/user-' + Uid + '/' + e.target.files[0].name);
   const userDoc = await getDoc(frankDocRef); 
  const prevImage = userDoc.data().profile.userImage;
   uploadBytes(imageRef, imageUrl)
  .then((snapshot) => {
  getDownloadURL(snapshot.ref).then((url) => {      
  
  updateDoc(frankDocRef, {
    "profile.userImage": url
  }).then(()=>{

  })

  });
  }).catch((error) => {
  console.error('Upload failed', error);
  
  });
} catch (error) {
    console.error('Error fetching city data:', error);
}


}