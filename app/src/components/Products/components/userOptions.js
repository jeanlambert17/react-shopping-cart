import React from 'react'
import * as mui from 'material-ui'
import ModifyModal from '../../../scenes/Profile/components/ModifyModal'

const Options = ({ handleClick, handleOpen}) => (
    <div>
        <mui.Button onClick={handleOpen} color="primary" variant="raised">
            MODIFY PRODUCT
        </mui.Button>
        <mui.Button onClick={handleClick} color="primary" variant="raised">
            DELETE PRODUCT
    </mui.Button>
    </div>
);

// Container
class UserOptions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    handleClick = () => {
        let body = {
            productId: this.props.data.productid,
        }
        fetch('http://localhost:10036/product/delete', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(body),
        }).then(response => response.json())
            .then(data => {
                console.log(data)
                // HANDLE ITEMS
           }).catch(error => {
                console.log(error);
            })
    }
    handleOpen = () => {
        this.setState({
            open: true,
        });
    }
    handleClose = () => {
        this.setState({
            open: false,
        });
    }
    render() {

        return (
            <div>
                <Options handleClick={this.handleClick} handleOpen={this.handleOpen} />
                <ModifyModal open={this.state.open} handleClose={this.handleClose} data={this.props.data} />
            </div>
        );
    }
}

export default UserOptions