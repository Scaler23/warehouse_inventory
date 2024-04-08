import {useState} from "react";
import {useAuthContext} from "./useAuthContext";
import {login} from "../api/account";

export const useSignIn = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const {dispatch} = useAuthContext();

  const signIn = async (values) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await login(values);

      if (response) {
        const {token} = await response;
        dispatch({type: "LOGIN", payload: token});
        setIsLoading(false);
        return token;
      } else {
        setIsLoading(false);
        setError(response.error);
        throw new Error("Authentication failed");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
      return false;
    }
  };
  return {signIn, isLoading, error};
};
