import * as request from "./requester";

const BASE_URL = "http://localhost:3030/api/expenses";

const getAll = async () => {
  const expenses = [
    {
      id: 1,
      name: "Rent",
      category: "Housing",
      amount: 500,
      date: "01/01/2021",
    },
    {
      id: 2,
      name: "Groceries",
      category: "Food",
      amount: 100,
      date: "01/01/2021",
    },
    {
      id: 3,
      name: "Salary",
      category: "Income",
      amount: 1000,
      date: "01/01/2021",
    },
  ];
  return expenses;
};

const getById = async (expenseId) => {
  //request.get(`${BASE_URL}/${expenseId}`);
  const expense = {
    id: 1,
    name: "Rent",
    category: "Housing",
    amount: 500,
    date: "01/01/2021",
    price: 500,
    quantity: 1,
  };
  return expense;
};

const create = async (expenseData) => {
  request.post(BASE_URL, expenseData);
};



const expenseAPI = {
  getAll,
  getById,
};

export default expenseAPI;
