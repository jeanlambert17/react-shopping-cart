import React from 'react'
import * as mui from 'material-ui'
import MenuIcon from '@material-ui/icons/Menu';

const styles = theme => ({
    logButton: {
        color: 'white',
    },
})

class UserBar extends React.Component {
    render() {
        const {handleDrawer} = this.props;

        return (
            <div>                                
                <mui.IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawer}                                            
                >
                    <MenuIcon />
                </mui.IconButton>
            </div>
        )
    }

}

export default mui.withStyles(styles)(UserBar)