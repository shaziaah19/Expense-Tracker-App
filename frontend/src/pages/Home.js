import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { APIUrl, handleError, handleSuccess } from "../utils";
import { ToastContainer } from "react-toastify";
import ExpensesTable from "./ExpensesTable";
import ExpenseTrackerForm from "./ExpenseTrackerForm";
import ExpenseDetails from "./ExpenseDetails";

function Home() {
  const [loggedInUser, setLoggedInUser] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [incomeAmount, setIncomeAmount] = useState(0);

  const navigate = useNavigate();

  // Set logged-in user's name from localStorage
  useEffect(() => {
    setLoggedInUser(localStorage.getItem("loggedInUser") || "Guest");
  }, []);

  useEffect(() => {
    const amounts = expenses.map((item) => item.amount);
    console.log(amounts);

    const income = amounts
      .filter((item) => item > 0)
      .reduce((acc, item) => (acc += item), 0);
    console.log("Income:", income);

    const exp =
      amounts
        .filter((item) => item < 0)
        .reduce((acc, item) => (acc += item), 0) * -1;
    console.log("expense:", exp);

    setIncomeAmount(income);
    setExpenseAmount(exp);
  }, [expenses]);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Logged Out");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  // Fetch expenses from API
  const fetchExpenses = async () => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
    } catch (err) {
      handleError(err);
    }
  };
  // Fetch products from API
  const addExpenses = async (data) => {
    try {
      const url = `${APIUrl}/expenses`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    try {
      const url = `${APIUrl}/expenses/${expenseId}`;
      const headers = {
        headers: {
          Authorization: localStorage.getItem("token"),
          "content-type": "application/json",
        },
        method: "DELETE",
      };
      const response = await fetch(url, headers);
      if (response.status === 403) {
        navigate("/login");
        return;
      }
      const result = await response.json();
      setExpenses(result.data);
      handleSuccess(result.message);
    } catch (err) {
      handleError(err);
    }
  };

  // Fetch expenses on component mount
  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, <span className="text-blue-500">{loggedInUser}</span>!
      </h1>
      <button
        onClick={handleLogout}
        className="absolute top-5 right-5 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:ring-2 focus:ring-red-300 shadow-lg"
      >
        Logout
      </button>

      <ExpenseDetails
        incomeAmount={incomeAmount}
        expenseAmount={expenseAmount}
      />
      <ExpenseTrackerForm addExpenses={addExpenses} />
      <ExpensesTable
        expenses={expenses}
        handleDeleteExpense={handleDeleteExpense}
      />

      <ToastContainer />
    </div>
  );
}

export default Home;
