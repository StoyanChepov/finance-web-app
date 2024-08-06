import { useEffect, useState } from "react";
import expenseAPI from "../../api/expense-api";
import Expense from "./Expense";
import { getAllExpenses } from "../../hooks/expenseHooks";

export default function ExpenseList() {
  const [expenses] = getAllExpenses();
  return (
    <section id="expense-list">
      <h1>Expenses</h1>
      <div className="allExpenses">
        {expenses.map((expense) => (
          <Expense key={expense._id} {...expense} />
        ))}
      </div>
    </section>
  );
}
