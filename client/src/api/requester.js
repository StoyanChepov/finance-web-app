export default async function requester(endpoint, method, body) {
  const url = `http://localhost:5000/api/${endpoint}`;
  const options = { method, headers: {} };

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }
  const response = await fetch(url, options);
  if (response.ok === false) {
    const error = await response.json();
    alert(error.message);
    throw new Error(error.message);
  }

  const result = await response.json();
  return result;
}

export const get = requester.bind(undefined, "", "GET");
export const post = requester.bind(undefined, "", "POST");
export const put = requester.bind(undefined, "PUT");
export const del = requester.bind(undefined, "DELETE");

