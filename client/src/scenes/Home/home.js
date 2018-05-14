import React from 'react';
import { withStyles, Grid } from "material-ui";
import * as mui from 'material-ui'
import { ProductCard } from './../../components/'
import CartOptions from './../../components/Products/components/cartOptions'

import img from './../../static/images/img.jpg'

const styles = theme => ({
    root: {
        flex: 1,
        marginTop: theme.spacing.unit * 4,
        justifyContent:'center',
    },
    header: {
        height: 400,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    list: {
        marginTop: theme.spacing.unit * 4,
        marginRight: theme.spacing.unit * 2,
        marginLegt: theme.spacing.unit * 2,
    },
    product: {
        display:'flex',
        justifyContent:'center',
    }, 
    info: {
        marginTop: theme.spacing.unit * 4,
        height: 250,
        backgroundColor: 'gray',
    }
})

const Home = ({classes, list, ...props}) => {

    let cards = list.map((product,i) =>
        <Grid item xs={3} key={i} className={classes.product}>
            <ProductCard options={CartOptions} data={product} />
        </Grid>
    )

    return (
        <div className={classes.root}>
            <Grid container justify="center">
                <Grid item xs={10} className={classes.header}>                    
                    <img className={classes.image} src={img} alt="Something"/>                    
                </Grid>
            </Grid>
            <Grid container className={classes.list}>
                {cards}
            </Grid>
            <Grid container spacing={24} className={classes.info}>

            </Grid>
        </div>
    )
};

export default withStyles(styles)(Home)