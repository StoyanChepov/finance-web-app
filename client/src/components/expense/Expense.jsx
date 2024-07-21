import { Link } from "react-router-dom";

export default function Expense({ id, title, amount, date, category }) {
  return (
    <div className="allExpenses-info">
      <h2>{title}</h2>
      <p>{amount}</p>
      <p>{date}</p>
      <p>{category}</p>
      <Link to={`/expenses/${id}/details`} className="details-button">
        Details
      </Link>
    </div>
  );
}
