import * as request from "./requester";

const BASE_URL = "http://localhost:3030/data/expenses";

const getAll = async () => {
  const expenses = await request.get(BASE_URL);
  return expenses;
};

export const getLatest = async (count) => {
  const urlSearchParams = new URLSearchParams({
    //sortBy: "_createdOn desc",
    pageSize: count,
  });
  const expenses = await request.get(
    `${BASE_URL}?${urlSearchParams.toString()}`
  );

  const latestExpenses = Object.values(expenses);
  return latestExpenses;
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

export const update = async (expenseId, expenseData) =>
  request.put(`${BASE_URL}/${expenseId}`, expenseData);
export const remove = async (expenseId) =>
  request.del(`${BASE_URL}/${expenseId}`);

const expenseAPI = {
  getAll,
  getById,
  create,
  update,
  remove,
  getLatest,
};

export default expenseAPI;
