import { CreateOneExpense } from "../../hooks/useExpenseHooks";
import { useForm } from "../../hooks/useForm";
import { useNavigate, useParams } from "react-router-dom";
import { GetAllCategories, CreateOneCategory } from "../../hooks/useCategory";
import { GetAllItems, CreateOneItem } from "../../hooks/useItem";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ConfirmCreate from "../modal/ConfirmCreate";
import ConfirmItemCreate from "../modal/ConfirmItemCreate";
import categoryAPI from "../../api/category-api";
import itemAPI from "../../api/item-api";
import { useAuthContext } from "../../contexts/AuthContext";

const initialValues = {
  title: "",
  date: "",
  category: "",
  price: "",
  quantity: "",
  amount: "",
  item: "",
  itemType: "",
};

export default function ExpenseCreate() {
  const navigate = useNavigate();
  const createExpense = CreateOneExpense();
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);
  const { userId } = useAuthContext();
  const [categories, setCategories] = GetAllCategories(userId);
  const [items, setItems] = GetAllItems(userId);
  const createHandler = async (values) => {
    values.category =
      categories.length > 0 && values.category == ""
        ? categories[0]._id
        : values.category;

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
    setShowCategoryModal(true);
  };

  const itemCreateHandler = async () => {
    setShowItemModal(true);
  };

  const handleConfirmCategoryCreate = async (name) => {
    setShowCategoryModal(false);
    try {
      const response = await categoryAPI.create(name);
      console.log("The response", response);
      setCategories((prev) => [response, ...prev]);
      values.category = response._id;
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleConfirmItemCreate = async (name, type) => {
    setShowItemModal(false);
    try {
      const response = await itemAPI.create(name, type);
      console.log("The response", response);
      setItems((prev) => [response, ...prev]);
      values.item = response._id;
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowItemModal(false);
    setShowCategoryModal(false);
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
          value={values.category}
          onChange={changeHandler}
          required
        >
          {categories.length > 0 &&
            categories.map((category) => (
              <option
                className="custom-select__option"
                key={category._id}
                value={category._id}
              >
                {category.name}
              </option>
            ))}{" "}
          {categories.length === 0 && (
            <option className="custom-select__option" value="">
              No categories
            </option>
          )}
        </select>
        <Link
          onClick={categoryCreateHandler}
          className="button"
          id="create-category-button"
          title="Create Category"
        >
          +
        </Link>

        <select
          className="custom-select__control"
          id="item"
          name="item"
          value={values.item}
          onChange={changeHandler}
          required
        >
          {items.length > 0 &&
            items.map((item) => (
              <option
                className="custom-select__option"
                key={item._id}
                value={item._id}
              >
                {item.name}
              </option>
            ))}{" "}
          {items.length === 0 && (
            <option className="custom-select__option" value="">
              No items
            </option>
          )}
        </select>
        <Link
          onClick={itemCreateHandler}
          className="button"
          id="create-category-button"
          title="Create Item"
        >
          +
        </Link>

        <div className="item-position">
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
        </div>
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
      <ConfirmItemCreate
        isOpen={showItemModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmItemCreate}
        object="Item"
      />
      <ConfirmCreate
        isOpen={showCategoryModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmCategoryCreate}
        object="Category"
      />
    </div>
  );
}
