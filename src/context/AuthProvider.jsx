import { useReducer } from "react";
import { AuthContext } from "./AuthContext";

const getInitialState = () => {
  const savedUser = localStorage.getItem("netflix_user");
  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    isAuthenticated: !!savedUser,
  };
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
  const [state, dispatch] = useReducer(authReducer, null, getInitialState);

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
