import { useForm } from "../../hooks/useForm";
import { useNavigate } from "react-router-dom";
import { GetOneExpense } from "../../hooks/useExpenseHooks";
import { useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import expenseAPI from "../../api/expense-api";

export default function ExpenseEdit() {
  const { expenseId } = useParams();
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
          placeholder="Enter date"
          value={values.date.split("T")[0]}
          onChange={changeHandler}
          required
        />
        <label htmlFor="category">Category</label>
        <input
          type="text"
          id="category"
          name="category"
          placeholder="Enter category"
          value={values.category}
          onChange={changeHandler}
          required
        />
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
    </div>
  );
}
