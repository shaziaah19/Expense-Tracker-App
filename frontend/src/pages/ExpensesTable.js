import React from 'react';

const ExpensesTable = ({expenses,handleDeleteExpense}) => {


  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-4">
        {expenses?.map((expense, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition duration-300"
          >
            <button onClick={()=>handleDeleteExpense(expense._id)}
              className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition duration-200"
            >
              X
            </button>
            <div className="flex-1 text-gray-800 ml-4 font-medium">
              {expense.text}
            </div>
            <div className="text-gray-600 font-semibold">₹{expense.amount}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpensesTable;
