import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import expenseAPI from "../../api/expense-api";

export default function ExpenseDetails() {
  const [expense, setExpense] = useState({});
  const { expenseId } = useParams();
  useEffect(() => {
    (async () => {
      const expense = await expenseAPI.getById(expenseId);
      setExpense(expense);
    })();
  }, []);

  return (
    <div className="expense-details">
      <h2>{expense.title}</h2>
      <p>{expense.amount}</p>
      <p>{expense.date}</p>
      <p>{expense.category}</p>
      <p>{expense.price}</p>
      <p>{expense.quantity}</p>

      <Link to={`/expenses/${expense.id}/edit`} className="edit-button">
        Edit
      </Link>
    </div>
  );
}
