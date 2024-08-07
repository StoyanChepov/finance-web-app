import { useEffect, useState } from "react";
import expenseAPI from "../../api/expense-api";

export default function Home() {
  const [latestExpenses, setLatestExpenses] = useState([]);

  useEffect(() => {
    (async () => {
      const expenses = await expenseAPI.getLatest(3);
      setLatestExpenses(expenses);
    })();
  }, []);
  return (
    <section id="home">
      <div className="welcome-message">
        <h3>Latest Expenses</h3>
      </div>
      <div className="latestExpenses">
        {latestExpenses.map((expense) => (
          <div key={expense._id} className="expense">
            <h3>{expense.title}</h3>
            <p>Amount: {expense.amount} $</p>
            <p>Date: {expense.date}</p>
            <p>Category: {expense.category}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
