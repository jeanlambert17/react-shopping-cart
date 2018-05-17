import React from 'react'
import * as mui from 'material-ui'
import {AddTab,DeleteTab} from './components/';

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
    bar: {
        backgroundColor: 'white',
    }
});

class Profile extends React.Component {
    state = {
        value: 0,
    };
    render() {
        const {classes} = this.props;
        const {value} = this.state;
        
        return (
            <div className={classes.root}>       
                <mui.AppBar position="static" className={classes.bar} elevation={0}>
                <mui.Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="secondary"   
                    onChange={this.handleChange}             
                >
                    <mui.Tab label="ADD PRODUCT" />
                    <mui.Tab label="DELETE PRODUCT" />
                </mui.Tabs>
            </mui.AppBar>
                {value === 0 && <AddTab>ITEM 2</AddTab>}
                {value === 1 && <DeleteTab>ITEM 3</DeleteTab>}                
            </div>
        )
    }
    handleChange = (event,value) => {
        this.setState({value});
    }
}



export default mui.withStyles(styles)(Profile)