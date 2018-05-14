import React from 'react'
import {connect} from 'react-redux'
import { setCartItems, deleteFromCart } from './../../../../actions/'
import Cart from './cart'

class CartContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
        }
    }

    componentDidMount = () => { // PASAR A OTRA FUNCION!
        let {setItems} = this.props;
        fetch('http://localhost:10036/cart/items', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                setItems(data.items);
            }).catch(error => {
                // TODO: handleError
                console.log(error)
            })
    }

    handleDelete = id => event => {
        let productCartId = id;
        let {deleteItem} = this.props;
        
        fetch('http://localhost:10036/cart/delete', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({productCartId}),
        }).then(response => response.json())
            .then(data => {
                deleteItem(productCartId)
            }).catch(error => {
                console.log(error);
                
            })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            items: nextProps.items,
        });
    }

    render() {
        const {items} = this.state;
        console.log(items);

        return <Cart total={0} handleDelete={this.handleDelete} items={items}/>
    }
}

const stateToProps = state => {
    return {
        items: state.items,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        setItems: items => {
            dispatch(setCartItems(items))
        },
        deleteItem: id => {
            dispatch(deleteFromCart(id))
        },
    }
}

export default connect(stateToProps,mapDispatchToProps)(CartContainer)
