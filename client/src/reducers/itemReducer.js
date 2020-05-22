//where actual state goes

import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from '../actions/types';

const initialState = {
    items:[],
    loading: false
    
}

//The spread operator (...) takes the current state. Then you reassign the variables to be updated. This allows us to update an immutable type
export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false //turn off loading once you have the payload
            };
        case DELETE_ITEM:
            return {
                ...state, 
                items: state.items.filter(item => item._id !== action.payload)
            };
        case ADD_ITEM:
            return {
                ...state, 
                items: [action.payload, ...state.items]
            };

        case ITEMS_LOADING:
            return {
                ...state,
                loading: true
            }    
        default:
            return state;
    }
}