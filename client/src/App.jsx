import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseDetails from "./components/expense/ExpenseDetails";

function App() {
  return (
    <>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route
              path="/expenses/:expenseId/details"
              element={<ExpenseDetails />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
