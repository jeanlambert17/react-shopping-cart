import React from 'react'
import Routes from './routes'
import * as mui from 'material-ui'
import classNames from 'classnames'
import {TopBar,CartDrawer} from './components/'
import { drawerWidth } from './components/Drawer'
import { isLogged } from "./contexts/isLogged";

const styles = theme =>({
    root: {
        display:'flex',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    container: {
        flexGrow: 1,
        backgroundColor: 'white', // theme.palette.background.default
        paddingTop: theme.spacing.unit * 8,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,        
        }),
        marginRight: -drawerWidth,
    },
    containerShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },

})

class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false
        }
    }

    handleDrawer = () => {
        this.setState(state => ({
            open:
                state.open === true
                    ? false
                    : true
        }))

    }
    
    render() {
        const {classes} = this.props;
        const {open} = this.state;

        return (
            <div className={classes.root}>
                <TopBar open={open} handleDrawer={this.handleDrawer}/>
                <div 
                    className={classNames(classes.container, { 
                        [classes.containerShift]: open,                         
                })}>
                    <Routes />
                </div>
                <isLogged.Consumer>
                    {({authType}) => (
                        <div>
                            {(authType === 'invited') ? (
                                <div style={{position:'relative', width:drawerWidth}} /> ) : ( // LA MARAÑA DEL AÑOOOOOOOOOOO! 
                                <CartDrawer open={open} />
                            )}
                        </div>
                    )}
                </isLogged.Consumer>              
            </div>
        )
    }
}

export default mui.withStyles(styles, {withTheme:true})(Main)