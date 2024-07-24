import { useState, useEffect } from "react";
import expenseAPI from "../api/expense-api";

export function getAllExpenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const expenses = await expenseAPI.getAll();
      setExpenses(expenses);
    })();
  }, []);

  return [expenses, setExpenses];
}

export function getOneExpense(expenseId) {
  const [expense, setExpense] = useState({});

  useEffect(() => {
    (async () => {
      const expense = await expenseAPI.getById(expenseId);
      setExpense(expense);
    })();
  }, [expenseId]);

  return [expense, setExpense];
}
