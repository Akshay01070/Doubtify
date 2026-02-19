import React, { useState } from "react";
import UserContext from "./userContext";

const UserContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    profile_picture: null,
    bio: '',
    interests: [],
    createdAt: ''
  });
  const logo_url =
    "https://res.cloudinary.com/dbghqv6ep/image/upload/v1717357720/logo_hpfbyj.jpg";

  const backend_url = "http://localhost:3000";

  return (
    <UserContext.Provider value={{ token, setToken, user, setUser, logo_url, backend_url }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
