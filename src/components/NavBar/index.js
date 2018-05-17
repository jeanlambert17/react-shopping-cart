import React from 'react'
import { Link } from 'react-router-dom'
import { isLogged } from '../../contexts/isLogged'
import * as mui from 'material-ui/'
import {CommonBar,UserBar} from './components/'

const styles = theme => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        position: 'absolute',
    },
    titleContainer: {
        display:'flex',
        alignItems:'center',
    },
    title: {
        color: 'white',        
    },
    noLinkStyle: {
        textDecoration: 'none',
        fontColor: 'white',
    },
});

class TopBar extends React.Component {

    render() {
        const {handleDrawer,classes} = this.props;

        return (
            <div>
                <mui.AppBar 
                    position="static" 
                    color="secondary" 
                    className={classes.appBar}                    
                >
                    <mui.Toolbar>
                        <mui.Grid container justify="space-between">
                            <mui.Grid item className={classes.titleContainer}>
                                <Link to="/" className={classes.noLinkStyle}>
                                <mui.Typography variant="title" className={classes.title}>
                                    Shopping-cart
                                </mui.Typography>
                                </Link>
                            </mui.Grid>
                            <mui.Grid item>
                                <isLogged.Consumer>
                                {({authType}) => (
                                    <div>                                        
                                        {(authType==='invited') ? (
                                            <CommonBar noLinkStyle={classes.noLinkStyle} /> ) : (
                                            <UserBar handleDrawer={handleDrawer}/>
                                        )}
                                    </div>
                                )}
                                </isLogged.Consumer>
                            </mui.Grid>
                        </mui.Grid>
                    </mui.Toolbar>
                </mui.AppBar>
                
            </div>
        );
    }

}

export default mui.withStyles(styles)(TopBar);