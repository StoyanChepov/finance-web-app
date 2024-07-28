import { Routes, Route } from "react-router-dom";

import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import ExpenseList from "./components/expense/ExpenseList";
import ExpenseDetails from "./components/expense/ExpenseDetails";
import { AuthContext } from "./contexts/AuthContext";
import { useState } from "react";

function App() {
  const [authState, setAuthState] = useState({ isLoggedIn: false });

  const changeAuthState = (newAuthState) => {
    setAuthState({ ...authState, ...newAuthState });
  };

  const contextData = {
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState: changeAuthState,
  };
  return (
    <AuthContext.Provider value={contextData}>
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
    </AuthContext.Provider>
  );
}

export default App;
