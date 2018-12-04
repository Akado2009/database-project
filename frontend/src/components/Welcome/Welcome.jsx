import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
        width: '90%',
        margin: '0 auto',
        paddingTop: 20,
        textAlign: 'left',
    },
    paper: {
        marginTop: 150,
        margin: '0 auto',
        padding: 50,
        width: '50%',
    },
    title: {
        fontWeight: 'bold',
        marginBottom: 50,
    },
});

const Welcome = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={4}>
                <Typography variant={"h2"} className={classes.title} color={"primary"}>
                    Welcome
                </Typography>
                <Typography variant={"h5"} color={"secondary"}>
                    This is a test website created by Grigory Ryabykh. Feel free to paste picture/everything here. I suggest to put a quick tour/guide about this website.
                </Typography>
            </Paper>
        </div>
    )
};

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome)