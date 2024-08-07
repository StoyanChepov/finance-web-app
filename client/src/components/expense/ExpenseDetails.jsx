import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import expenseAPI from "../../api/expense-api";
import { get } from "../../api/requester";
import { getAllExpenses, getOneExpense } from "../../hooks/expenseHooks";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ExpenseDetails() {
  const { expenseId } = useParams();
  const [expense, setExpense] = getOneExpense(expenseId);
  const { email, userId } = useAuthContext();
  const isOwner = expense._ownerId === userId;
  const navigate = useNavigate();

  const expenseDeleteHandler = async () => {
    try {
      const response = await expenseAPI.remove(expenseId);
      console.log(response);
      navigate("/expenses");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="expense-details">
      <h2>Title: {expense.title}</h2>
      <p>Amount: {expense.amount} $</p>
      <p>Date: {expense.date}</p>
      <p>Category: {expense.category}</p>
      <p>Price: {expense.price} $</p>
      <p>Quantity: {expense.quantity}</p>

      {isOwner && (
        <Link to={`/expenses/${expense._id}/edit`} className="edit-button">
          Edit
        </Link>
      )}
      {isOwner && (
        <Link onClick={expenseDeleteHandler} className="delete-button">
          Delete
        </Link>
      )}
    </div>
  );
}
