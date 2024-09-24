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
import ItemPositionCreate from "../modal/ItemPositionCreate";
import ItemPositionEdit from "../modal/ItemPositionEdit";
import LineItemEdit from "./LineItemEdit";

const saveToCache = (value) => {
  sessionStorage.setItem("itemPositionsEdit", JSON.stringify(value));
};

export default function ExpenseEdit() {
  const { expenseId } = useParams();
  const [showItemPosModal, setShowItemPosModal] = useState(false);
  const [showItemPosModalEdit, setShowItemPosModalEdit] = useState(false);
  const [itemPosId, setItemPosId] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const { userId } = useAuthContext();
  const [categories, setCategories] = GetAllCategories(userId);
  let [expense, setExpense] = GetOneExpense(expenseId);
  if (sessionStorage.getItem("itemPositionsEdit")) {
    expense.itemPositions = JSON.parse(
      sessionStorage.getItem("itemPositionsEdit")
    );
  }
  const navigate = useNavigate();

  const { values, changeHandler, submitHandler } = useForm(
    expense,
    async (values) => {
      const updatedExpense = await expenseAPI.update(expenseId, {
        ...values,
        categoryId:
          values.category._id !== undefined
            ? values.category._id
            : values.category,
      });
      console.log("Updated Expense: ", updatedExpense);
      console.log("Item Positions: ", values.itemPositions);

      if (values.itemPositions.length > 0) {
        for (let item of values.itemPositions) {
          if (item._id !== undefined) {
            await expenseAPI.updateItemPosition(item._id, {
              itemId: item.itemId,
              quantity: item.quantity,
              price: item.price,
              amount: item.amount,
              unit: JSON.stringify(item.unit),
              item: JSON.stringify(item.item),
              positionId: expenseId,
            });
          } else {
            await expenseAPI.createItemPosition({
              _id: item._id,
              itemId: item.itemId,
              quantity: item.quantity,
              price: item.price,
              amount: item.amount,
              unit: JSON.stringify(item.unit),
              item: JSON.stringify(item.item),
              positionId: expenseId,
            });
          }
        }
      }
      sessionStorage.removeItem("itemPositionsEdit");
      navigate(`/expenses/${expenseId}/details`);
    },
    { reinititializeForm: true }
  );
  const categoryCreateHandler = async () => {
    setShowCategoryModal(true);
  };

  const handleCloseModal = () => {
    setShowCategoryModal(false);
    setShowItemPosModal(false);
    setShowItemPosModalEdit(false);
  };

  const handleConfirmItemPosCreate = async (res) => {
    setShowItemPosModal(false);
    values.itemPositions = [...values.itemPositions, res];
    saveToCache([...values.itemPositions]);
  };

  const handleConfirmItemPosEdit = async (res) => {
    setShowItemPosModalEdit(false);
    values.itemPositions = values.itemPositions.map((item) =>
      item.itemId === res.itemId ? res : item
    );
    saveToCache([...values.itemPositions]);
  };

  const handleConfirmCategoryCreate = async (name) => {
    setShowCategoryModal(false);
    try {
      const response = await categoryAPI.create(name);
      setCategories((prev) => [response, ...prev]);
      values.category = response._id;
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const itemPosCreateHandler = async () => {
    setShowItemPosModal(true);
  };

  // Load data from sessionStorage on component mount
  useEffect(() => {
    const cachedData = sessionStorage.getItem("itemPositionsEdit");
    console.log("cachedData", cachedData);
    if (cachedData) {
      values.itemPositions = JSON.parse(cachedData);
    }
  }, []); // Empty dependency array to run this effect once when the component mounts

  return (
    <div className="expense-edit">
      <h2>Edit Expense</h2>
      <form id="edit" onSubmit={submitHandler}>
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
        <div className="expense-info">
          <div className="form-group">
            <label className="expense-detail" htmlFor="date">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="date"
              placeholder="Enter date"
              value={values?.date?.split("T")[0]}
              onChange={changeHandler}
              title="Enter date"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <div className="add-item">
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
            </div>
          </div>
        </div>
        {values.itemPositions?.length > 0 && (
          <table id="allExpenses">
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {values.itemPositions?.map((itempos, index) => (
                <LineItemEdit
                  key={index}
                  {...itempos}
                  setShowItemPosModalEdit={setShowItemPosModalEdit}
                  setItemPosId={setItemPosId}
                />
              ))}
            </tbody>
          </table>
        )}
        <Link
          onClick={itemPosCreateHandler}
          className="button"
          id="create-category-button"
          title="Add a line"
        >
          + Add a line
        </Link>
        <div className="form-group">
          <label htmlFor="amount">Total</label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={values.amount}
            onChange={changeHandler}
            required
            readOnly
          />
        </div>
        <div className="buttons">
          <button className="button" type="submit">
            Save
          </button>
        </div>
      </form>
      <ConfirmCreate
        isOpen={showCategoryModal}
        onRequestClose={handleCloseModal}
        onConfirm={handleConfirmCategoryCreate}
        object="Category"
      />
      <ItemPositionCreate
        isOpen={showItemPosModal}
        onRequestClose={handleCloseModal}
        onConfirmItemPos={handleConfirmItemPosCreate}
      />
      <ItemPositionEdit
        isOpen={showItemPosModalEdit}
        onRequestClose={handleCloseModal}
        onConfirmItemPos={handleConfirmItemPosEdit}
        itemPosId={itemPosId}
      />
    </div>
  );
}
