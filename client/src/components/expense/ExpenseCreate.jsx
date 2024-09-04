import { CreateOneExpense } from "../../hooks/useExpenseHooks";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllCategories, CreateOneCategory } from "../../hooks/useCategory";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmCreate from "../modal/ConfirmCreate";
import categoryAPI from "../../api/category-api";
import { useAuthContext } from "../../contexts/AuthContext";

const initialValues = {
  title: "",
  date: "",
  category: "",
  price: "",
  quantity: "",
  amount: "",
};

export default function ExpenseCreate() {
  const navigate = useNavigate();
  const createExpense = CreateOneExpense();
  const [showModal, setShowModal] = useState(false);
  const { userId } = useAuthContext();
  const [categories, setCategories] = GetAllCategories(userId);
  const createHandler = async (values) => {
    try {
      const { _id: expenseId } = await createExpense(values);
      if (expenseId) {
        navigate(`/expenses/${expenseId}/details`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    createHandler
  );
  values.amount = values.price * values.quantity;
  const categoryCreateHandler = async () => {
    setShowModal(true);
  };

  const handleConfirmCreate = async (name) => {
    setShowModal(false);
    try {
      const response = await categoryAPI.create(name);
      console.log("The response", response);
      setCategories((prev) => [response, ...prev]);
      //navigate("/expenses");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="expense-create">
      <h2>Create Expense</h2>
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
          onChange={changeHandler}
          required
        >
          <option className="custom-select__option" value="">
            Select category
          </option>
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
        <div className="buttons">
          <button className="button" type="submit">
            Create
          </button>
        </div>
      </form>
      <ConfirmCreate
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmCreate}
      />
    </div>
  );
}
