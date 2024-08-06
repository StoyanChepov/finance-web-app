import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseDetails from "./components/expense/ExpenseDetails";
import { AuthContextProvider } from "./contexts/AuthContext";
import Logout from "./components/logout/Logout";

function App() {
  return (
    <AuthContextProvider>
      <div id="box">
        <Header />
        <main id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/expenses" element={<ExpenseList />} />
            <Route
              path="/expenses/:expenseId/details"
              element={<ExpenseDetails />}
            />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </main>
      </div>
    </AuthContextProvider>
  );
}

export default App;
