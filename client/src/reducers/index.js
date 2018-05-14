import { SET_CART_ITEMS, ADD_TO_CART, DELETE_FROM_CART } from "../actions";

function reducers(state = {items: []}, action) {
    switch(action.type) {
        case SET_CART_ITEMS: {
            return {
                type: SET_CART_ITEMS,
                items: action.items,
            };            
            // Object.assign({}, state, {
            //     type: SET_CART_ITEMS,
            //     items: action.items,
            // });
        }
        case ADD_TO_CART: {
            return {
                type: ADD_TO_CART,
                items: [...state.items, action.item],
            };
            
            // Object.assign({}, state, {
            //     type: ADD_TO_CART,
            //     items: [ ...state.items, action.item],
            // });
        }
        case DELETE_FROM_CART: {
            const items = state.items.filter(item => item.id !== action.id);
            return {
                type: DELETE_FROM_CART,
                items: items,
            };            
            // Object.assign({}, state, {
            //     type: DELETE_FROM_CART,
            //     items: items,
            // });
        }
        default: {
            return state;
        }
    }
}

export default reducers