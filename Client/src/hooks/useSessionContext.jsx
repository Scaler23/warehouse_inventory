import {SessionContext} from "../context/SessionContext";
import {useContext} from "react";

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within an SessionProvider");
  }
  return context;
};
