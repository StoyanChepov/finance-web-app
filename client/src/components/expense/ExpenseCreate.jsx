import { createOneExpense } from '../../hooks/expenseHooks';
import { useForm } from '../../hooks/useForm'
import { useNavigate } from 'react-router-dom';

const initialValues = {
    title: '',
    amount: '',
    date: '',
    category: '',
    price: '',
    quantity: ''
};

export default function ExpenseCreate() {
    const navigate = useNavigate();
    const createExpense = createOneExpense();
const createHandler = async (values) => {
    try {
        const {_id: expenseId} = await createExpense(values);
        navigate(`/expenses/${expenseId}/details`);
    }    
    catch (error) {
        console.log(error);
    }    
}

    const {values, changeHandler, submitHandler} = useForm(initialValues, createHandler);

    return (
        <div className="expense-create">
            <h2>Create Expense</h2>
            <form id="create" onSubmit={submitHandler}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" name="title" value={form.title} onChange={changeHandler} />
                <label htmlFor="amount">Amount</label>
                <input type="number" id="amount" name="amount" value={form.amount} onChange={changeHandler} />
                <label htmlFor="date">Date</label>
                <input type="date" id="date" name="date" value={form.date} onChange={changeHandler} />
                <label htmlFor="category">Category</label>
                <input type="text" id="category" name="category" value={form.category} onChange={changeHandler} />
                <label htmlFor="price">Price</label>
                <input type="number" id="price" name="price" value={form.price} onChange={changeHandler} />
                <label htmlFor="quantity">Quantity</label>
                <input type="number" id="quantity" name="quantity" value={form.quantity} onChange={changeHandler} />
                <button type="submit">Create</button>
            </form>
        </div>
    )
}
