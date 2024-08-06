import { Link } from "react-router-dom";

export default function Expense({ _id, title, amount, date, category }) {
  return (
    <div className="allExpenses-info">
      <h2>{title}</h2>
      <p>Amount: {amount} $</p>
      <p>Date: {date}</p>
      <p>Category: {category}</p>
      <Link to={`/expenses/${_id}/details`} className="details-button">
        Details
      </Link>
    </div>
  );
}
