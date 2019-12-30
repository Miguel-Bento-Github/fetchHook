import axios from "axios";
import { useState, useEffect, useReducer } from "react";
import { dataFetchReducer } from "../reducers/dataFetchReducer";

/**
 * The hook itself doesn't know anything about the API.
 * It receives all parameters from the outside
 * and only manages necessary states such as the data,
 * loading and error state.
 * It executes the request and returns the data to the component
 * using it as custom data fetching hook.
 *
 * State management is encapsulated with its own logic.
 * By providing action types and optional payloads,
 * you will always end up with a predictable state change.
 * In addition, you will never run into invalid states.
 *
 * @param {string} initialUrl
 * @param {object || JSON} initialData
 * @returns { state, setUrl }
 */
export default function useDataApi(initialUrl, initialData) {
  const [url, setUrl] = useState(initialUrl);
  const [state, dispatch] = useReducer(dataFetchReducer, {
    data: initialData,
    error: {
      active: false,
      message: ""
    },
    isLoading: false
  });

  /**
   * We use a boolean flag called didCancel.
   * It'll to let our data fetching logic know about the state.
   * (mounted/unmounted)
   */
  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });

      try {
        const result = await axios(url);
        if (!cancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!cancel) {
          dispatch({ type: "FETCH_FAILURE", payload: error.message });
        }
      }

      return () => {
        cancel = true;
      };
    };

    fetchData();
  }, [url]);

  return [state, setUrl];
}
