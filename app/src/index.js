import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { isLogged } from './contexts/isLogged'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducers from './reducers'
import Main from './main'

let store = createStore(reducers);

class App extends Component {
    constructor() {
        super();     
        this.state = {
            authType: 'invited',
            changeAuth: this.handleAuth,
        }
    }
    // TODO: fix login validation
    handleAuth = (auth) => {
        this.setState(state => ({
            authType: 
                state.authType === 'invited'
                ? 'logged'
                : 'invited',
        }))
    }
    componentDidMount = () => {
        fetch('http://localhost:10036/user/auth', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    authType: data.auth,
                });
            }).catch(error => {
                this.setState({
                    authType: 'invited',
                });
                console.log(error)
            })
    }
    render() {
        return (         
            <div>
                <Provider store={store}>
                    <isLogged.Provider value={this.state}>                    
                        <Main /> 
                    </isLogged.Provider>
                </Provider>
            </div>              
        );
    }
}

ReactDOM.render((
    <BrowserRouter>
        <App />
    </BrowserRouter>
), document.getElementById('root'));