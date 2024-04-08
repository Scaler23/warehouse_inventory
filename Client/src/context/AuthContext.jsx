import {createContext, useContext, useReducer} from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, isLoggedIn: true, token: action.payload};
    case "LOGOUT":
      return {...state, isLoggedIn: false, token: null};
    default:
      return state;
  }
};

export const AuthProvider = ({children}) => {
  const [authState, dispatch] = useReducer(authReducer, {
    isLoggedIn: false,
    token: null,
  });

  console.log("Auth Context State: ", authState);
  return (
    <AuthContext.Provider value={{...authState, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};
