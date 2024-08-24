import Expense from "./Expense";
import { getAllExpenses } from "../../hooks/expenseHooks";

export default function ExpenseList() {
  const [expenses] = getAllExpenses();
  return (
    <section id="expense-list">
      <h1>Expenses</h1>
      <table id="allExpenses">
        <thead>
          <tr>
            <th>Title</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <Expense key={expense._id} {...expense} />
          ))}
        </tbody>
      </table>
    </section>
  );
}
