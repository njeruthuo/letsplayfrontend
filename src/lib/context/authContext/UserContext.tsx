import { store } from "./store";
import { createContext, useContext, useReducer } from "react";

const UserContextProvider = createContext(undefined);

export const useUserContext = () => useContext(UserContextProvider);

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return { ...state, user: action.payload };

    case "LOAD_ON_CREATE_USER":
      return {
        ...state,
        isCreateAccountLoading: !state.isCreateAccountLoading,
      };

    case "CREATE_USER_SESSION":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "DELETE_USER_SESSION":
      return { ...state, user: {}, isAuthenticated: false };

    case "LOAD_ON_LOGIN_USER":
      return {
        ...state,
        isLoginLoading: !state.isLoginLoading,
      };

    default:
      throw Error("Unknown action specified!");
  }
}

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, store);

  return (
    <UserContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
