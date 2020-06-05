//where actual state goes

import {
  ITEMS_LOADING,
  ADD_LIST,
  DELETE_LIST,
  GET_LISTS,
} from "../actions/types";

const initialState = {
  lists: [],
  loading: false,
};

//The spread operator (...) takes the current state. Then you reassign the variables to be updated. This allows us to update an immutable type
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LISTS:
      console.log("== in reducer");
      console.log("== payload:", action.payload);
      return {
        ...state,
        lists: action.payload,
        loading: false, //turn off loading once you have the payload
      };
    case ADD_LIST:
      return {
        ...state,
        lists: [action.payload, ...state.lists],
      };

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
