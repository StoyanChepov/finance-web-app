import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import expenseAPI from "../../api/expense-api";
import { get } from "../../api/requester";
import { getAllExpenses, getOneExpense } from "../../hooks/expenseHooks";
import { useAuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ConfirmExpenseDelete from "./ConfirmExpenseDelete";
import attachmentAPI from "../../api/attachment-api";
import { useForm } from "../../hooks/useForm";
import UploadForm from "../upload/UploadForm";
import { motion } from "framer-motion";
import {
  useGetAttachments,
  useCreateAttachment,
} from "../../hooks/useAttachments";

const initialValues = {
  attachment: "",
};

export default function ExpenseDetails() {
  const { expenseId } = useParams();
  const [expense, setExpense] = getOneExpense(expenseId);
  const [showModal, setShowModal] = useState(false);
  const [attachment, setAttachment] = useState("");
  const { email, userId } = useAuthContext();
  const { isAuthenticated } = useAuthContext();
  const [attachments, setAttachments] = useGetAttachments(expenseId);
  const isOwner = expense._ownerId === userId;
  const navigate = useNavigate();

  const expenseDeleteHandler = async () => {
    setShowModal(true);
    /*
    const isConfirmed = confirm(
      `Are you sure you want to delete the expense with title ${expense.title}?`
    );
    if (!isConfirmed) {
      return;
    }
    */
  };

  const handleConfirmDelete = async () => {
    setShowModal(false);
    try {
      const response = await expenseAPI.remove(expenseId);
      console.log(response);
      navigate("/expenses");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
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
        <div className="buttons">
          <Link
            to={`/expenses/${expense._id}/edit`}
            className="button"
            id="edit-button"
          >
            Edit
          </Link>

          <Link
            onClick={expenseDeleteHandler}
            className="button"
            id="delete-button"
          >
            Delete
          </Link>
        </div>
      )}
      <ConfirmExpenseDelete
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <h2>Attachments</h2>
      {
        <ul className="img-container">
          {attachments &&
            attachments.map((doc) => (
              <motion.li
                className="img-item"
                key={doc._id}
                layout
                whileHover={{ opacity: 1 }}
              >
                <motion.img
                  className="mot-img"
                  src={doc.url}
                  alt="uploaded pic"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                />
              </motion.li>
            ))}
        </ul>
      }
      {isAuthenticated && (
        <article className="add-attachment">
          <h2>Attachment file</h2>
          <UploadForm setAttachments={setAttachments} />
        </article>
      )}
    </div>
  );
}
