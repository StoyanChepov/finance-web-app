import { useState, useEffect } from "react";
import expenseAPI from "../api/expense-api";
import aggregationAPI from "../api/aggregation-api";

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

export function GetAggregatedExpenses(number) {
  const [aggregatedExpenses, setAggregatedExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const expenses = await aggregationAPI.getChartData(number);
      setAggregatedExpenses(expenses);
    })();
  }, []);

  return [aggregatedExpenses, setAggregatedExpenses];
}

export function GetOneExpense(expenseId) {
  const [expense, setExpense] = useState({
    title: "",
    amount: 0,
    date: "",
    category: "",
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
  return expenseCreateHandler;
}
