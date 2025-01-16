import React, { useState } from "react";

const ExpenseTrackerForm = ({ addExpenses }) => {
  // State for form inputs
  const [expenseText, setExpenseText] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  // Handle form submission
  const handleAddExpense = (e) => {
    e.preventDefault(); // Prevent page reload

    console.log("Expense Description:", expenseText);
    console.log("Expense Amount:", expenseAmount);

  

    // Create a new expense object
    const newExpense = {
      text: expenseText,
      amount: parseFloat(expenseAmount),
    };

    // Call the addExpenses function passed from the parent component
    addExpenses(newExpense);

    // Clear input fields
    setExpenseText("");
    setExpenseAmount("");
  };

  return (
    <div className="container mx-auto p-4 max-w-md">
      <h1 className="text-2xl font-bold text-center mb-6">Expense Tracker</h1>

      {/* Form */}
      <form
        onSubmit={handleAddExpense}
        className="bg-white shadow-md rounded-lg p-4 border border-gray-200 mb-6"
      >
        <div className="mb-4">
          <label
            htmlFor="expenseText"
            className="block text-gray-700 font-medium mb-2"
          >
            Expense Description
          </label>
          <input
            type="text"
            id="expenseText"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={expenseText}
            onChange={(e) => setExpenseText(e.target.value)}
            placeholder="Enter expense name (e.g., Groceries)"
            required
          />
        </div>
        <div className="mb-4">
          <label 
            htmlFor="expenseAmount"
            className="block text-gray-700 font-medium mb-2"
          >
            Amount
          </label >
          <input
            type="number"
            id="expenseAmount"
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            placeholder="Enter amount (e.g., 100)"
            required 
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
};

export default ExpenseTrackerForm;
