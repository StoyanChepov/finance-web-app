import requester from "./requester";
const BASE_URL = "http://localhost:3030/users";

export const login = async (email, password) => {
  console.log("Login", email, password);
  const authData = requester.post(`${BASE_URL}/login`, {
    email,
    password,
  });
  return authData;
};

export const register = async (email, password) => {
  const authData = requester.post(`${BASE_URL}/register`, {
    email,
    password,
  });
  return authData;
};
