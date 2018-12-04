import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
    root: {
        width: '90%',
        margin: '0 auto',
        paddingTop: 20,
        textAlign: 'center',
    },
    paper: {
        marginTop: 70,
        margin: '0 auto',
        padding: 50,
        width: '50%',
    },
    avatar: {
        margin: 10,
        width: 200,
        height: 200,
        display: 'flex',
    },
    title: {
        fontWeight: 'bold',
    },
    help: {
        fontWeight: 'bold',
        color: 'grey',
    },
    typography: {
        marginBottom: 20,
    },
    link: {
        textDecoration: 'none',
    },
});

const NotFound = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Paper className={classes.paper} elevation={4}>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={6}>
                        <Avatar className={classes.avatar}>
                            <Typography variant={"h2"}>404</Typography>
                        </Avatar>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography variant={"h3"} className={classnames(classes.title, classes.typography)} color={"primary"}>
                            Ooops!
                        </Typography>
                        <Typography variant={"h6"} className={classnames(classes.help, classes.typography)}>
                            The link you followed appears to be outdated or does not even exist.
                        </Typography>
                        <Link to="/" 
                            className={classes.link}>
                            <Button
                            variant={"contained"}
                            color={"primary"}>
                                Go to Home
                            </Button>
                        </Link>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
};

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound)