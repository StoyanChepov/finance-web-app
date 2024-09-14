import * as request from "./requester";

const BASE_URL = "http://localhost:3000/items";

const create = async (name, type) => request.post(`${BASE_URL}/create`, { name, type });

const getAll = async () => {
  const items = await request.get(`${BASE_URL}`);
  return items;
};

const getAllItemTypes = async () => {
  const items = await request.get(`${BASE_URL}/types`);
  return items;
};

const itemAPI = {
  create,
  getAll,
  getAllItemTypes,
};

export default itemAPI;
