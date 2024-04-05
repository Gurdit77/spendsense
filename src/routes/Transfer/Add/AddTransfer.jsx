import React from 'react';
import ExpenseTab from '../../../layouts/ExpenseTabs/ExpenseTabs';

function AddTransfer() {
  return (
    <div className='p-3 md:p-5 ' >
        <ExpenseTab active={true} page="Transfer" />
        </div>
  );
}

export default AddTransfer;
