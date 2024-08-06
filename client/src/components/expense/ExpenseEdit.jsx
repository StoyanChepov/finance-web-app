import { updateOneExpense } from "../../hooks/expenseHooks";
import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";

const initialValues = {
  title: "",
  amount: "",
  date: "",
  category: "",
  price: "",
  quantity: "",
};

export default function ExpenseEdit() {
  const navigate = useNavigate();
  const editExpense = updateOneExpense();
  const createHandler = async (values) => {
    try {
      const { _id: expenseId } = await editExpense(values);
      navigate(`/expenses/${expenseId}/details`);
    } catch (error) {
      console.log(error);
    }
  };

  const { values, changeHandler, submitHandler } = useForm(
    initialValues,
    createHandler
  );

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
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Enter amount"
          value={values.amount}
          onChange={changeHandler}
        />
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          placeholder="Enter date"
          value={values.date}
          onChange={changeHandler}
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter category"
          value={values.category}
          onChange={changeHandler}
        />
        <label htmlFor="price">Price</label>
        <input
          type="number"
          id="price"
          name="price"
          placeholder="Enter price"
          value={values.price}
          onChange={changeHandler}
        />
        <label htmlFor="quantity">Quantity</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          placeholder="Enter quantity"
          value={values.quantity}
          onChange={changeHandler}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}
