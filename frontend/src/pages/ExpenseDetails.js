import React from "react";

const ExpenseDetails = ({ incomeAmount, expenseAmount }) => {
  return (
    <div className="bg-gray-100 p-6 max-w-2xl mx-auto rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 text-center mb-4">Your Balance</h2>
      <div className="flex items-center justify-center space-x-10">
        {/* Balance */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">Balance</p>
          <p className="text-2xl font-bold text-green-600">{incomeAmount - expenseAmount}</p>
        </div>

        {/* Income */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">Income</p>
          <p className="text-xl font-semibold text-green-500">₹{incomeAmount}</p>
        </div>

        {/* Expense */}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">Expense</p>
          <p className="text-xl font-semibold text-red-500">₹{expenseAmount}</p>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetails;
