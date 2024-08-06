import { login, register, logout } from "../api/auth-api";
import { useAuthContext } from "../contexts/AuthContext";
export const loginHook = () => {
  const { changeAuthState } = useAuthContext();
  const loginHandler = async (email, password) => {
    try {
      console.log("Login authHook: ", email, password);
      const { password: pass, ...authData } = await login(email, password);
      console.log("Auth: ", authData);
      changeAuthState(authData);
      //localStorage.setItem("auth", JSON.stringify(authData));
    } catch (error) {
      console.log(error);
    }
  };
  return loginHandler;
};

export const registerHook = () => {
  const { changeAuthState } = useContext(AuthContext);
  const registerHandler = async (email, password) => {
    const { password: pass, ...authData } = await register(email, password);
    console.log("Auth data for state: ", authData);
    changeAuthState(authData);
    //localStorage.setItem("auth", JSON.stringify(authData));
    return authData;
  };
  return registerHandler;
};

export const logoutHook = () => {
  const { logout: localLogout } = useAuthContext();
  const logoutHandler = async () => {
    await logout();
    localLogout();
  };
  return logoutHandler;
};
