import * as request from "./requester";

const BASE_URL = "http://localhost:3000/categories";

const create = async (name) =>
  request.post(`${BASE_URL}/create`, { name });

const getAll = async () => {
  const categories = await request.get(`${BASE_URL}`);
  return categories;
};

const categoryAPI = {
  create,
  getAll,
};

export default categoryAPI;
