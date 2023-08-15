import { useEffect, useCallback, useReducer, useRef } from 'react';

import { ERROR_NAMES, HTTP_VERBS } from 'utils/constants';

const ACTIONS = {
  EXECUTING: 'EXECUTING',
  EXECUTED: 'EXECUTED',
  ERROR: 'ERROR',
  CANCELED: 'CANCELED',
  RESET: 'RESET',
};

function apiReducer(state, action) {
  switch (action.type) {
    case ACTIONS.EXECUTING:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ACTIONS.EXECUTED:
      return {
        ...state,
        isLoading: false,
        result: action.payload,
      };
    case ACTIONS.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ACTIONS.CANCELED:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case ACTIONS.RESET:
      return {
        ...state,
        isLoading: false,
        error: null,
        result: null,
      };
    default:
      throw new Error(`Unsupported action type: ${action.type}`);
  }
}

// hook responsible for handling api calls
export const useApi = (
  path,
  {
    baseUrl = process.env.REACT_APP_API_URL,
    verb = HTTP_VERBS.GET,
    initialFetch = true,
    throwOnError = false,
    returnType = 'json',
  } = {},
) => {
  const url = `${baseUrl}/${path}`;
  const controller = useRef(new AbortController());
  const [state, dispatch] = useReducer(apiReducer, {
    result: null,
    error: null,
    isLoading: initialFetch,
  });

  const execute = useCallback(
    (obj) => {
      let req = null;
      const headers = {
        'Content-Type': `application/${returnType}`,
      };

      switch (verb) {
        case HTTP_VERBS.POST:
          req = fetch(url, {
            headers,
            method: HTTP_VERBS.POST,
            signal: controller.current.signal,
            body: JSON.stringify(obj),
          });
          break;
        default: // defaulting to GEY
          req = fetch(url, {
            headers,
            method: HTTP_VERBS.GET,
            signal: controller.current.signal,
          });
          break;
      }

      return req;
    },
    [returnType, url, verb],
  );

  const executeRequest = useCallback(
    async (obj, id = null) => {
      dispatch({ type: ACTIONS.EXECUTING });
      try {
        const response = await execute(obj, id);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message);
        }

        const items = await response.json();

        dispatch({ type: ACTIONS.EXECUTED, payload: items });
      } catch (err) {
        if (err.name === ERROR_NAMES.ABORT_ERROR) return; // no need to throw an error if the request was aborted

        const error = !(err instanceof Error) ? new Error(err) : err;
        dispatch({ type: ACTIONS.ERROR, payload: error });
        if (throwOnError) throw error;
      }
    },
    [execute, throwOnError],
  );

  const cancelRequest = useCallback(() => {
    controller.current.abort();
    controller.current = new AbortController();
    dispatch({ type: ACTIONS.CANCELED });
  }, []);

  const resetState = useCallback(() => {
    dispatch({ type: ACTIONS.RESET });
  }, []);

  useEffect(() => {
    if (initialFetch) {
      executeRequest();
    }
  }, [executeRequest, initialFetch]);

  return [
    {
      result: state.result,
      isLoading: state.isLoading,
      error: state.error,
    },
    executeRequest,
    cancelRequest,
    resetState,
  ];
};
