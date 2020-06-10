import axios from "axios";
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//get Lists -> turn in to get items
export const getItems = (userid, listid) => (dispatch, getState) => {
  //dispatch allows us to send async requests
  console.log("== In action");
  console.log("== userid", userid);
  console.log("== listid", listid);
  dispatch(setItemsLoading());
  axios
    .get(`/api/lists/${userid}/${listid}`, tokenConfig(getState)) //make request to api endpoint
    .then((res) => {
      console.log("== res.data: ", res.data);
      dispatch({
        type: GET_ITEMS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addItem = (userid, listid, item) => (dispatch, getState) => {
  axios
    .post(`/api/lists/${userid}/${listid}`, item, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = (listid, userid) => (dispatch, getState) => {
  console.log("==in delete item func");
  axios
    .delete(`/api/lists/${userid}/${listid}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_ITEM,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  console.log("== after delete item func");
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
