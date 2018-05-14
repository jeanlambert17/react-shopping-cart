import React from 'react'
import * as mui from 'material-ui'

const Cart = ({ items, handleDelete, total }) => (
    <div>
        <ul>
            {items.map(item =>
                <li key={item.id}>
                    {item.name}
                    <mui.Button value={item.id} onClick={handleDelete(item.id)}> Delete </mui.Button>
                </li>
            )}
        </ul>
        <div>Total = {total}</div>
        <div>Total items: {items.length}</div>
    </div>
)

export default Cart;