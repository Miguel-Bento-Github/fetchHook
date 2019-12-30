export function dataFetchReducer(state, action) {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        error: {
          active: false,
          message: ""
        }
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        error: {
          active: false,
          message: ""
        },
        data: action.payload
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: {
          active: true,
          message: action.payload
        }
      };
    default:
      throw new Error();
  }
}
