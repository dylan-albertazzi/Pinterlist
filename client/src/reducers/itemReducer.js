//where actual state goes

import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING,
  ADD_ITEM_NO_USER,
} from "../actions/types";

const initialState = {
  items: [],
  listName: null,
  loading: false,
};

//The spread operator (...) takes the current state. Then you reassign the variables to be updated. This allows us to update an immutable type
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      console.log("== in reducer");
      console.log("== payload:", action.payload);
      return {
        ...state,
        items: action.payload.groceryList.itemCollection,
        listName: action.payload.listName,
        loading: false, //turn off loading once you have the payload
      };
    case DELETE_ITEM:
      console.log("== in delete reducer");
      console.log("delte action payload", action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case ADD_ITEM_NO_USER:
      return {
        ...state,
        items: [...state.items, action.payload],
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
