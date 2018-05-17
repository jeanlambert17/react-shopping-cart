import React from 'react'
import * as mui from 'material-ui'
import {isLogged} from '../../contexts/isLogged'

import img from '../../static/images/img.jpg'

const styles = theme => ({
    card: {
        width: 275,
    },
    header: {
        marginBottom:'10px',
    },
    info: {
        display:'flex',
        justifyContent:'space-between',
    },
    action: {
        display:'flex',
        justifyContent: 'flex-end',
    },
    cover: {
        width: 275,
        height: 150,
    },
})



class ProductCard extends React.Component {

    render() {
        const {classes} = this.props;
        const {name,username,price,stock} = this.props.data;
        // brand,description,img,name,price,productid,stock,userid,username

        return (
            <mui.Card className={classes.card}>
                <mui.CardMedia image={img} title="imageTitle" className={classes.cover} />
                <mui.CardContent>
                    <div className={classes.header}>
                        <mui.Typography variant="title">
                            {name}
                        </mui.Typography>
                        <mui.Typography variant="caption">
                            by {username}
                        </mui.Typography>
                    </div>
                    <div className={classes.info}>
                        <mui.Typography>
                            ${price}
                        </mui.Typography>
                        <mui.Typography>
                            On stock: {stock}
                        </mui.Typography>
                    </div>
                </mui.CardContent>            
                    <isLogged.Consumer>                                                
                    {({authType}) => (
                        <mui.CardActions className={classes.action}>
                            {(authType==='invited') ? (
                                <div />) : (
                                <this.props.options data={this.props.data}/>
                            )}
                        </mui.CardActions>             
                    )}                              
                </isLogged.Consumer>
            </mui.Card>
        );
    }
}



export default mui.withStyles(styles)(ProductCard)
