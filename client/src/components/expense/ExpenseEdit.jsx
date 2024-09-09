import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { GetOneExpense } from "../../hooks/useExpenseHooks";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import expenseAPI from "../../api/expense-api";
import { GetAllCategories, CreateOneCategory } from "../../hooks/useCategory";
import { Link } from "react-router-dom";
import ConfirmCreate from "../modal/ConfirmCreate";
import categoryAPI from "../../api/category-api";
import { useAuthContext } from "../../contexts/AuthContext";

export default function ExpenseEdit() {
  const { expenseId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const { userId } = useAuthContext();
  const [categories, setCategories] = GetAllCategories(userId);
  const [expense, setExpense] = GetOneExpense(expenseId);
  const navigate = useNavigate();

  const { values, changeHandler, submitHandler } = useForm(
    expense,
    async (values) => {
      const updatedExpense = await expenseAPI.update(expenseId, values);
      console.log(updatedExpense);
      navigate(`/expenses/${expenseId}/details`);
    },
    { reinititializeForm: true }
  );
  values.amount = values.price * values.quantity;
  const categoryCreateHandler = async () => {
    setShowModal(true);
  };

  const handleConfirmCreate = async (name) => {
    setShowModal(false);
    try {
      const response = await categoryAPI.create(name);
      setCategories((prev) => [response, ...prev]);
      values.category._id = response._id;
      //navigate("/expenses");
    } catch (error) {
      console.log(error);
    }
  };
  console.log("Expense v", values);
  console.log("Categories", categories);

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <div className="expense-edit">
      <h2>Edit Expense</h2>
      <form id="create" onSubmit={submitHandler}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter title"
          value={values.title}
          onChange={changeHandler}
          required
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          className="date"
          placeholder="Enter date"
          value={values.date.split("T")[0]}
          onChange={changeHandler}
          title="Enter date"
          required
        />
        <label htmlFor="category">Category</label>
        <select
          className="custom-select__control"
          id="category"
          name="category"
          value={values.category._id}
          defaultValue={values.category._id}
          onChange={changeHandler}
          required
        >
          {categories.map((category) => (
            <option
              className="custom-select__option"
              key={category._id}
              value={category._id}
            >
              {category.name}
            </option>
          ))}
        </select>
        <Link
          onClick={categoryCreateHandler}
          className="button"
          id="create-category-button"
          title="Create Category"
        >
          +
        </Link>
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          value={values.price}
          onChange={changeHandler}
          required
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Enter quantity"
          value={values.quantity}
          onChange={changeHandler}
          required
        />
        <label htmlFor="amount">Amount</label>
        <div>Final Amount</div>
        <input
          type="number"
          id="amount"
          name="amount"
          value={values.amount}
          onChange={changeHandler}
          required
          readOnly
        />
        <button className="button" type="submit">
          Save
        </button>
      </form>
      <ConfirmCreate
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmCreate}
      />
    </div>
  );
}
