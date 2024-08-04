import { store } from "./store";
import { createUserAccount } from "@/lib/actions/createUser";
// import { loginUser } from "@/lib/actions/loginUser";
import { createContext, useContext, useReducer } from "react";

const UserContextProvider = createContext(undefined);

export const useUserContext = () => useContext(UserContextProvider);

function reducer(state, action) {
  switch (action.type) {
    case "CREATE_USER":
      return { ...state, user: action.payload };

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
