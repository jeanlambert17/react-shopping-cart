import React from 'react'
import Home from './home'

class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }
    
    componentDidMount = () => {
        fetch('http://localhost:10036/product/list', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    list: data.list
                });
            }).catch(error => {
                console.log(error)
            })
    }

    render() {

        return <Home list={this.state.list}/>
    }
}

export default HomeContainer