import { createContext } from "react";

const UserContext = createContext({
  name: "",
  email: "",
});

export default UserContext;