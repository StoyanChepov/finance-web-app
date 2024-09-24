import { Link } from "react-router-dom";
import Expense from "./Expense";
import { GetAllExpenses } from "../../hooks/useExpenseHooks";

export default function ExpenseList() {
  const [expenses] = GetAllExpenses();
  sessionStorage.removeItem("itemPositionsEdit");
  return (
    <section id="expense-list">
      <div className="buttons">
        <Link to="/expenses/create" className="button">
          Add Еxpense
        </Link>
      </div>
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
