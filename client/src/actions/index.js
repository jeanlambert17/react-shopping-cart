export const SET_CART_ITEMS = 'SET_CART_ITEMS'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'

export function setCartItems(items) {
    return {
        type: SET_CART_ITEMS,
        items,
    }
}

export function addToCart(item) {
    return {
        type: ADD_TO_CART,
        item,
    }
}

export function deleteFromCart(id) {
    return {
        type: DELETE_FROM_CART,
        id,
    }
}
