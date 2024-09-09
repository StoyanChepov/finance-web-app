import * as request from "./requester";

const BASE_URL = "http://localhost:3000/aggregation";

export const getChartData = async (number) => {
  const urlSearchParams = new URLSearchParams({
    //sortBy: '_createdOn desc',
    chartId: number,
  });
  const aggregations = await request.get(
    `${BASE_URL}?${urlSearchParams.toString()}`
  );

  const latestExpenses = Object.values(aggregations);
  return latestExpenses;
};

const getById = async (aggregationId) => {
  const aggregation = await request.get(`${BASE_URL}/${aggregationId}`);
  /*
  const aggregation = {
    id: 1,
    name: "Rent",
    category: "Housing",
    amount: 500,
    date: "01/01/2021",
    price: 500,
    quantity: 1,
  };
  */
  return aggregation;
};

export const create = async (aggregationData) =>
  request.post(`${BASE_URL}/create`, aggregationData);

export const update = async (aggregationId, aggregationData) =>
  request.put(`${BASE_URL}/${aggregationId}`, aggregationData);
export const remove = async (aggregationId) =>
  request.del(`${BASE_URL}/${aggregationId}`);

const aggregationAPI = {
  getChartData,
  getById,
  create,
  update,
  remove,
};

export default aggregationAPI;
