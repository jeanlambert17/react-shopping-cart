import React from 'react'
import * as mui from 'material-ui'

const styles = theme => ({
    container: {
        display:'flex',
        width: theme.spacing.unit * 50,
        flexDirection:'column',
        padding: theme.spacing.unit * 4,
        position:'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
    },
    textField: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
    },

})

class ModifyModal extends React.Component {
    constructor() {
        super();
        this.state = {
            productId: '',
            name: '',
            brand: '',
            price: '',
            stock: '',
            description: '',
        }
    }
    componentWillReceiveProps = (nextProps) => {
        let {productid,name,brand,price,stock,description} = nextProps.data;
        this.setState({
            productId: productid,
            name: name,
            brand:brand,
            price:price,
            stock:stock,
            description:description,
        })
    }

    render() {
        const {classes,open,handleClose} = this.props; 

        return (
            <mui.Modal 
                aria-labelledby="modal1"
                aria-describedby="modal2" 
                open={open} 
                onClose={handleClose}
            >
                <div className={classes.container}>
                    <mui.TextField 
                        id="name" label="Name" 
                        margin="normal" 
                        value={this.state.name} 
                        className={classes.textField} 
                        onChange={this.handleChange('name')} 
                    />
                    <mui.TextField 
                        id="brand" label="Brand" 
                        margin="normal" 
                        value={this.state.brand} 
                        className={classes.textField} 
                        onChange={this.handleChange('brand')} 
                    />
                    <mui.TextField
                        id="price" label="Price"
                        margin="normal"
                        value={this.state.price}
                        className={classes.textField}
                        onChange={this.handleChange('price')}
                    />
                    <mui.TextField 
                        id="stock" label="Stock" 
                        margin="normal" 
                        value={this.state.stock} 
                        className={classes.textField} 
                        onChange={this.handleChange('stock')} 
                    />
                    <mui.TextField 
                        id="description" label="Description" 
                        margin="normal" multiline 
                        rowsMax="4" 
                        value={this.state.description}
                        className={classes.textField} onChange={this.handleChange('description')} 
                    />
                    <mui.Button variant="raised" color="primary" onClick={this.handleClick}>SAVE CHANGES</mui.Button>
                </div>
            </mui.Modal>
        );
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleClick = () => {
        console.log(this.state)
        fetch('http://localhost:10036/product/modify', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(this.state)
        }).then(response => response.json())
            .then(data => {
                console.log(data)
            }).catch(error => {
                console.log(error);
            })
    }
}

export default mui.withStyles(styles)(ModifyModal)