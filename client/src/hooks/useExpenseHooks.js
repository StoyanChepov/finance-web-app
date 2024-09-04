import { useState, useEffect } from "react";
import expenseAPI from "../api/expense-api";

export function GetAllExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const expenses = await expenseAPI.getAll();
      setExpenses(expenses);
    })();
  }, []);

  return [expenses, setExpenses];
}

export function GetOneExpense(expenseId) {
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,
    date: "",
    category: "",
    quantity: 0,
    price: 0,
  });

  useEffect(() => {
    (async () => {
      const expense = await expenseAPI.getById(expenseId);
      setExpense(expense);
    })();
  }, [expenseId]);

  return [expense, setExpense];
}

export function CreateOneExpense() {
  const expenseCreateHandler = (expenseData) => expenseAPI.create(expenseData);

  console.log("Res", expenseCreateHandler);
  return expenseCreateHandler;
}
