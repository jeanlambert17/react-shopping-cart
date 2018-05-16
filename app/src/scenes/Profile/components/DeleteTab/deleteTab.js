import React from 'react'
import * as mui from 'material-ui'
import ProductCard from './../../../../components/Products'
import UserOptions from './../../../../components/Products/components/userOptions'


const styles = theme => ({

})

class DeleteTab extends React.Component {

    render() {
        // const { classes } = this.props;
        const {list} = this.props;

        const cards = list.map((product) => 
            <mui.Grid key={product.productid} item>
                <ProductCard options={UserOptions} data={product} />
            </mui.Grid>
        )
        return (
            <div>
                <mui.Grid container>
                {cards}
                </mui.Grid>
            </div>
        );
    }
}

export default mui.withStyles(styles)(DeleteTab)
