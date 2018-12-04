import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { toggleMenu } from '../../actions/generalActions';

const module = "general";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
        color: 'white',
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
        color: 'white',
    },
};

const Header = (props) => {
    const { classes } = props;

    const toggleMenu = (event) => {
        props.toggleMenu(!props.open);
    };

    return (
        <div className={classes.root}>
            <AppBar position={"static"} color={"primary"}>
                <Toolbar>
                <IconButton className={classes.menuButton} aria-label="Menu" onClick={toggleMenu}>
                    <MenuIcon />
                </IconButton>
                    <Typography variant={"display1"} className={classes.grow}>
                        <strong>Grisha Service</strong>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        open: state[module].menuOpen,
    };
};

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { toggleMenu })(withStyles(styles)(Header));