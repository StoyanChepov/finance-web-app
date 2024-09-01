import requester from "./requester";
const BASE_URL = "http://localhost:3000/users";

export const login = (email, password) =>
  requester.post(`${BASE_URL}/login`, { email, password });

export const register = (email, password, repass) =>
  requester.post(`${BASE_URL}/register`, {
    email,
    password,
    repass
  });

export const logout = () => requester.get(`${BASE_URL}/logout`);
