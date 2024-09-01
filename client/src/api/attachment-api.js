import * as request from "./requester";

const BASE_URL = "http://localhost:3000/attachments";

const create = async (expenseId, url, name) =>
  request.post(`${BASE_URL}/create`, { expenseId, url, name });

const getAll = async (expenseId) => {
  const attachments = await request.get(`${BASE_URL}/${expenseId}`);
  return attachments;
};

const attachmentAPI = {
  create,
  getAll,
};

export default attachmentAPI;
