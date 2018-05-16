import React from 'react'
import { Link } from 'react-router-dom'
import * as mui from 'material-ui'

const styles = theme => ({
    logButton: {
        color:'white',
    },
})

const CommonBar = (props) => {
    const { classes } = props;

    return (
        <Link to="/login" className={props.noLinkStyle}>
            <mui.Button className={classes.logButton}>LOGIN</mui.Button>
        </Link>
    )
}

export default mui.withStyles(styles)(CommonBar)
