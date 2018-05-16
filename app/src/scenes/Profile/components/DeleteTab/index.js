import React from 'react'
import DeleteTab from './deleteTab'

class DeleteTabContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    render() {
        const {list} = this.state;
    
        return (
            <DeleteTab list={list}/>
        );
    }

    componentDidMount = () => {
        fetch('http://localhost:10036/product/userProducts', {
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
}

export default DeleteTabContainer