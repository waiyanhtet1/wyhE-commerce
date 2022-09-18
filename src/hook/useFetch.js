import { useState, useEffect } from "react";
import { userRequest } from "../requestMethod";

const useFetch = (url) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await userRequest.get(url);
        setData(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [url]);

  const reFetch = async () => {
    try {
      const res = await userRequest.get(url);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return { data, reFetch };
};

export default useFetch;
