import { store } from "./store";
import { createContext, useContext, useReducer } from "react";
import {
  CREATE_USER,
  CREATE_USER_PROFILE,
  CREATE_USER_SESSION,
  DELETE_USER_SESSION,
  LOAD_ON_CREATE_USER,
  LOAD_ON_LOGIN_USER,
  LOAD_ON_PROFILE_UPDATE,
} from "./actions";

/***
 * TODO:
 * make changes to ensure that a user profile is created with user.
 * implement CRUD operations on users and profiles.
 *
 */

const UserContextProvider = createContext(undefined);

export const useUserContext = () => useContext(UserContextProvider);

function reducer(state, action) {
  switch (action.type) {
    case CREATE_USER:
      return { ...state, user: action.payload };

    case CREATE_USER_SESSION:
      return { ...state, isAuthenticated: true, user: action.payload };

    case CREATE_USER_PROFILE:
      return { ...state, user_profile: action.payload };

    case LOAD_ON_CREATE_USER:
      return {
        ...state,
        isCreateAccountLoading: !state.isCreateAccountLoading,
      };

    case LOAD_ON_LOGIN_USER:
      return {
        ...state,
        isLoginLoading: !state.isLoginLoading,
      };

    case LOAD_ON_PROFILE_UPDATE:
      return {
        ...state,
        isUpdatingProfile: !state.isUpdatingProfile,
      };

    case DELETE_USER_SESSION:
      return { ...state, user: {}, isAuthenticated: false };

    default:
      throw Error("Unknown action specified!");
  }
}

const UserContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, store);

  console.log(state);

  return (
    <UserContextProvider.Provider value={{ state, dispatch }}>
      {children}
    </UserContextProvider.Provider>
  );
};

export default UserContext;
