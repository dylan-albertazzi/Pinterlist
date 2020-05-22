import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types';

export const getItems = () => dispatch => { //dispatch allows us to send async requests
    dispatch(setItemsLoading());
    axios
        .get('/api/items') //make request to api endpoint
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
            )
}

export const addItem = (item) => dispatch => {
    axios
        .post('/api/items', item)
        .then(res => 
            dispatch({
                type: ADD_ITEM, 
                payload: res.data
            }))
}

export const deleteItem = (id) => dispatch => {
    axios.delete(`/api/items/${id}`).then(res =>
        dispatch({
            type: DELETE_ITEM,
            payload: id
        })
        )
}



export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}