import { useEffect, useState } from "react";
import expenseAPI from "../../api/expense-api";
import Expense from "./Expense";

export default function ExpenseList() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    //expenseAPI.getAll().then((expenses) => setExpenses(expenses));
    (async () => {
      const expenses = await expenseAPI.getAll();
      setExpenses(expenses);
    })();
  }, []);

  return (
    <section id="expense-list">
      <h1>Expenses</h1>
      <div className="allExpenses">
        {expenses.map((expense) => (
          <Expense key={expense.id} {...expense} />
        ))}
      </div>
    </section>
  );
}
