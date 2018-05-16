import React from 'react'
import * as mui from 'material-ui'

const styles = theme => ({
    root: {
        flexGrow: 1,      
        marginLeft: theme.spacing.unit * 2,
        marginRight: theme.spacing.unit * 2,
    },
    container: {
        alignItems:'center',
        flexDirection: 'column',
    },
    textField: {
        marginRight: theme.spacing.unit,
        marginLeft: theme.spacing.unit,
    },

})

class AddTab extends React.Component {
    constructor() {
        super();
        this.state = {
            name: '',
            brand: '',
            price: '',
            stock: '',
            description: '',
        }
    }

    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}>
                
                <mui.Grid container className={classes.container} spacing={24}>
                    <mui.Grid item xs={5}>
                        <mui.TextField
                            id="name"                                                          
                            label="Name"
                            margin="normal"
                            value={this.state.name}
                            className={classes.textField}
                            onChange={this.handleChange('name')}
                        />
                        <mui.TextField
                            id="brand"
                            label="Brand"
                            margin="normal"
                            value={this.state.brand}
                            className={classes.textField}                              
                            onChange={this.handleChange('brand')}
                        />                            
                    </mui.Grid>
                    <mui.Grid item xs={5}>
                        <mui.TextField
                            id="price"
                            label="Price"                
                            value={this.state.price}            
                            className={classes.textField}
                            InputProps={{
                                startAdornment: <mui.InputAdornment position="start">$</mui.InputAdornment>,
                            }}
                            onChange={this.handleChange('price')}
                        />
                        <mui.TextField                        
                            id="stock"
                            label="Stock"
                            margin="normal"
                            value={this.state.stock}
                            className={classes.textField}
                            onChange={this.handleChange('stock')}
                        />                            
                        </mui.Grid>
                    <mui.Grid item xs={5}>
                        <mui.TextField
                            id="description"
                            label="Description"
                            margin="normal"
                            multiline rowsMax="4"
                            value={this.state.description}
                            className={classes.textField}                            
                            onChange={this.handleChange('description')}
                        />                   
                    </mui.Grid>
                    <mui.Grid item xs={5}>
                        <mui.Grid container justify="center">                            
                            <mui.Button variant="raised" color="secondary" onClick={this.handleClick}>
                                ADD
                            </mui.Button>                            
                        </mui.Grid>
                    </mui.Grid>
                </mui.Grid>
            </div>
        );
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }

    handleClick = () => {
        fetch('http://localhost:10036/product/new', {
            method:'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials:'include',
            body:JSON.stringify(this.state)
        }).then(response => response.json())
        .then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error);
        })
    }
}

export default mui.withStyles(styles)(AddTab)