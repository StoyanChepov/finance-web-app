import requester from "./requester";

const BASE_URL = "http://localhost:3030/data/attachments";

const create = async (expenseId, url, name) =>
  requester.post(BASE_URL, { expenseId, url, name });

const getAll = async (expenseId) => {
  const result = await requester.get(
    BASE_URL + `?where=expenseId%3D%22${expenseId}%22`
  );
  const attachments = Object.values(result);
  return attachments;
};

const attachmentAPI = {
  create,
  getAll,
};

export default attachmentAPI;
