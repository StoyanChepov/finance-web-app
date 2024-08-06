import * as request from "./requester";

const BASE_URL = "http://localhost:3030/data/expenses";

const getAll = async () => {
  const expenses = await request.get(BASE_URL);
  return expenses;
};

const getById = async (expenseId) => {
  const expense = await request.get(`${BASE_URL}/${expenseId}`);
  /*
  const expense = {
    id: 1,
    name: "Rent",
    category: "Housing",
    amount: 500,
    date: "01/01/2021",
    price: 500,
    quantity: 1,
  };
  */
  return expense;
};

export const create = async (expenseData) =>
  request.post(BASE_URL, expenseData);

export const update = async (expenseData) => request.put(BASE_URL, expenseData);

const expenseAPI = {
  getAll,
  getById,
  create,
};

export default expenseAPI;
