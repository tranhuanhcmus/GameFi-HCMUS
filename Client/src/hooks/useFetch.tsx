import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from "../redux/loadingSlice";

// Define the types for the serverError
type ServerError = any; // Replace 'any' with the actual error type you expect from the API

const useFetch = <T,>(service: () => Promise<T>) => {
  const [apiData, setApiData] = useState<T | null>(null);
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(startLoading());
    const fetchData = async () => {
      try {
        const data = await service();
        setApiData(data);
      } catch (error) {
        setServerError(error);
      } finally {
        dispatch(stopLoading());
      }
    };
    fetchData();
  }, []);

  return { apiData, serverError };
};

export default useFetch;
