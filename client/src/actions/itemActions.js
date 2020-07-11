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

export const addPin = (userid, listid, pinURL) => (dispatch, getState) => {
  //post to pin s
  console.log("==in add pin post:", pinURL);
  console.log("==url type", typeof pinURL);
  axios
    .post(
      `/api/lists/${userid}/${listid}/addPin`,
      { pinURL: pinURL },
      tokenConfig(getState)
    )
    .then((res) => {
      console.log("== made it to response:", res);

      if (res.data.items.length < 1) {
        dispatch(
          returnErrors("Whoops, we can't find any ingrdients on this page", 204)
        );
      }
      var i;
      for (i = 0; i < res.data.items.length; i++) {
        var item = {
          ingredientName: res.data.items[i],
          quantity: 1,
        };
        console.log("== almost added item");
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
        console.log("==added item");
      }
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
  // axios
  //   .post(`/api/lists/${userid}/${listid}`, item, tokenConfig(getState))
  //   .then((res) =>
  //     dispatch({
  //       type: ADD_ITEM,
  //       payload: res.data,
  //     })
  //   )
  //   .catch((err) =>
  //     dispatch(returnErrors(err.response.data, err.response.status))
  //   );
};

export const deleteItem = (userid, listid, itemid) => (dispatch, getState) => {
  console.log("==in delete item func");
  axios
    .delete(`/api/lists/${userid}/${listid}/${itemid}`, tokenConfig(getState))
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
