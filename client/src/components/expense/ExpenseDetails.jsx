import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import expenseAPI from "../../api/expense-api";
import { get } from "../../api/requester";
import { getAllExpenses, getOneExpense } from "../../hooks/expenseHooks";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ExpenseDetails() {
  const { expenseId } = useParams();
  const [expense, setExpense] = getOneExpense(expenseId);
  const { email, userId } = useAuthContext();
  const isOwner = expense._ownerId === userId;

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
    </div>
  );
}
