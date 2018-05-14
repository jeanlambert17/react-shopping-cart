import React from 'react'
import * as mui from 'material-ui/'
import {isLogged} from './../../contexts/isLogged'

const styles = theme => ({
    mainGrid: {
        marginTop: 75,
    },
    gridLogin: {
        flexDirection: 'column',
    },
    textField: {
        width: 225,
        flexBasis: 100,
        margin: theme.spacing.unit,
    },
    button: {
        marginTop: 25,
    }
});

class Login extends React.Component {
    constructor() {
        super();        
        this.state = {
            username: '',
            password: '',
        }
    }
    render() {
        const { classes } = this.props;
        
        return (
            <mui.Grid className={classes.mainGrid} container justify="center">
                <mui.Grid className={classes.gridLogin} >              
                        <mui.Grid item>
                            <mui.TextField
                                id="username"
                                label="Username"
                                className={classes.textField}
                                value={this.state.username}
                                onChange={this.handleChange('username')}
                                />
                        </mui.Grid>
                        <mui.Grid item>
                            <mui.TextField                                                                
                                id="password"
                                label="Password"
                                className={classes.textField}
                                value={this.state.password}
                                onChange={this.handleChange('password')}
                                helperText="Don't remember your password?"
                                InputProps={{
                                    type: "password",
                                }}
                            />
                        </mui.Grid>
                        <mui.Grid item>
                            <mui.Grid container justify="center">
                                <isLogged.Consumer>
                                {({changeAuth}) => (
                                    <div>
                                        <mui.Button className={classes.button} variant="raised" color="secondary" onClick={this.handleLogin(changeAuth)}>
                                            LOGIN
                                        </mui.Button>
                                    </div>
                                )}
                                </isLogged.Consumer>    
                            </mui.Grid>
                        </mui.Grid>
                </mui.Grid>
            </mui.Grid>            
        );
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        })
    }
    handleLogin = callback => () => {
        const body = this.state
        fetch('http://localhost:10036/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body),
        })
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    callback();
                }
                console.log(data);
            }).catch(error => {
                console.log(error);
            })
    }
}

export default mui.withStyles(styles)(Login);
