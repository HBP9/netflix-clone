import { useReducer, useEffect } from "react";
import { AuthContext } from "./AuthContext";

const InitialState = {
  user: null,
  isAuthenticated: false,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, InitialState);

  useEffect(() => {
    const savedUser = localStorage.getItem("netflix_user");
    if (savedUser) {
      dispatch({ type: "LOGIN", payload: JSON.parse(savedUser) });
    }
  }, []);

  const login = (email) => {
    const user = { email };
    localStorage.setItem("netflix_user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    localStorage.removeItem("netflix_user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
