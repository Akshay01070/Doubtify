import { useEffect, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/userContext";

const useFetchUser = (token, setUser) => {
  const [loading, setLoading] = useState(true);
  const { backend_url } = useContext(UserContext);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await axios.get(
            `${backend_url}/api/user/userInfo`,
            {
              headers: { token },
            }
          );
          if (res.data.success) {
            setUser(res.data.user);
          } else {
            console.error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user information", error);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, [token, setUser, backend_url]);

  return loading;
};

export default useFetchUser;
