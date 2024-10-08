import React, { useState, useEffect, DependencyList } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  startLoading,
  stopLoading,
} from "../redux/loadingSlice";
import { useIsFocused } from "@react-navigation/native";

// Define the types for the serverError
type ServerError = any; // Replace 'any' with the actual error type you expect from the API

const useFetch = <T,>(
  service: () => Promise<T>,
  dependencies: DependencyList = [],
) => {
  const [apiData, setApiData] = useState<T | null>(null);
  const isLoading = useSelector(selectLoading);
  const [serverError, setServerError] = useState<ServerError | null>(null);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const fetchData = async () => {
    dispatch(startLoading());
    try {
      const data = await service();
      setApiData(data);
    } catch (error) {
      setServerError(error);
    } finally {
      dispatch(stopLoading());
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchData();
    }
  }, [isFocused, ...dependencies]);

  return { apiData, serverError, isLoading };
};

export default useFetch;
