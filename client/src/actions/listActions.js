import axios from "axios";
import { ITEMS_LOADING, ADD_LIST, DELETE_LIST, GET_LISTS } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

//get Lists
export const getLists = (userid) => (dispatch, getState) => {
  //dispatch allows us to send async requests
  console.log("== In action");
  console.log("== userid", userid);
  dispatch(setItemsLoading());
  axios
    .get(`/api/lists/${userid}`, tokenConfig(getState)) //make request to api endpoint
    .then((res) => {
      console.log("== res.data: ", res.data);
      dispatch({
        type: GET_LISTS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addList = (userid, list) => (dispatch, getState) => {
  axios
    .post(`/api/lists/${userid}`, list, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: ADD_LIST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteList = (listid, userid) => (dispatch, getState) => {
  axios
    .delete(`/api/lists/${userid}/${listid}`, tokenConfig(getState))
    .then((res) =>
      dispatch({
        type: DELETE_LIST,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};
