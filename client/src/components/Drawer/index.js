import React from 'react'
import { Link } from 'react-router-dom'
import * as mui from 'material-ui'
import PersonIcon from '@material-ui/icons/Person'
import {isLogged} from './../../contexts/isLogged'
import Cart from './components/Cart'

export const drawerWidth = 240;

const styles = theme => ({
    drawerPaper : {
        position:'relative',
        width: drawerWidth,
        marginLeft: theme.spacing.unit * 1,
    },
    drawerHeader: {
        marginTop: theme.spacing.unit * 9,
        marginBottom: '1px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
    },
    panel: {
        display: 'flex',
        flexGrow: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    detailPanel: {
        padding: '0 0 10px 0 '
    }
})

class CartDrawer extends React.Component {

    render() {
        const {open,classes} = this.props;

        return (            
            <mui.Drawer 
            variant="persistent" 
            anchor="right"
            open={open} 
            classes={{ paper: classes.drawerPaper, }}
            >        
            <div className={classes.drawerHeader}>
                <mui.ExpansionPanel 
                    className={classes.panel}
                    elevation={0}
                >
                    <mui.ExpansionPanelSummary >
                        <mui.IconButton style={{padding:'0'}}>
                            <PersonIcon/>
                        </mui.IconButton>
                    </mui.ExpansionPanelSummary>
                    <mui.ExpansionPanelDetails className={classes.detailPanel}>
                        <isLogged.Consumer>
                            {({changeAuth}) => (
                                <mui.Button onClick={this.handleLogout(changeAuth)}>LOGOUT</mui.Button>
                            )}                            
                        </isLogged.Consumer>
                        <Link to="/profile" style={{textDecoration:'none'}}>
                                <mui.Button >Profile</mui.Button>
                        </Link>
                    </mui.ExpansionPanelDetails>
                </mui.ExpansionPanel>
            </div>            
            <mui.Divider /> 
            <div>
                <Cart />
            </div>
            </mui.Drawer>
        )
    }

    handleLogout = callback => () => {
        fetch('http://localhost:10036/user/logout', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(response => response.json())
        .then(data => {
            if(data.status === 200) {
                callback();
            }
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    }
    
}

export default mui.withStyles(styles)(CartDrawer)