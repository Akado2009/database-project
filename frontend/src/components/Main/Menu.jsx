import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Settings from '@material-ui/icons/Settings';
import WatchLater from '@material-ui/icons/WatchLater';
import DoneAll from '@material-ui/icons/DoneAll';

import { toggleMenu } from '../../actions/generalActions';
import { List } from '@material-ui/core';
import { Link } from 'react-router-dom';

const module = "general";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    fullList: {
        width: 250,
    },
    title: {
        color: 'white',
    },
};

const Menu = (props) => {
    const { classes } = props;

    const closeDrawer = (event) => {
        props.toggleMenu(false);
    };

    return (
        <Drawer
            open={props.open}
            onClose={closeDrawer}
            >
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Menu
                    </Typography>
                </Toolbar>
            </AppBar>
            <div className={classes.fullList}>
                <List>
                    <ListItem button component={Link} to="/genes">
                        <ListItemIcon><Settings color={"primary"} /></ListItemIcon>
                        <ListItemText primary={"Genes calculator"} />
                    </ListItem>
                </List>
            </div>
        </Drawer>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state[module].menuOpen,
    };
};

Menu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { toggleMenu })(withStyles(styles)(Menu));