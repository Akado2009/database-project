import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import GeneSelector from './GeneSelector';
import GenePlot from './GenePlot';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';

import { closeSnack } from '../../actions/genesActions';

const module = "genes";

const styles = theme => ({
    root: {
        width: '90%',
        margin: '0 auto',
        paddingTop: 20,
        textAlign: 'left',
    },
    paper: {
        marginTop: 70,
        margin: '0 auto',
        padding: 50,
        width: '90%',
    },
    close: {
        padding: theme.spacing.unit / 2,
    },
});

const GenesCalculator = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Grid container spacing={24}>
                <Grid item sm={4} xs={4}>
                    <Paper className={classes.paper} elevation={4}>
                        <GeneSelector />
                    </Paper>
                </Grid>
                <Grid item sm={8} xs={8}>
                    <Paper className={classes.paper} elevation={4}>
                        <GenePlot />
                    </Paper>
                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                open={props.snackOpen}
                autoHideDuration={6000}
                onClose={props.closeSnack}
                message={<span id="message-id">{props.snackText}</span>}
                action={[
                    <IconButton
                        key="close"
                        aria-label="Close"
                        color="inherit"
                        className={classes.close}
                        onClick={props.closeSnack}
                    >
                        <CloseIcon />
                    </IconButton>,
                ]}
            />
        </div>
    )
};

GenesCalculator.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        number: state[module].numberOfGenes,
        loading: state[module].loading,
        snackOpen: state[module].snackOpen,
        snackText: state[module].snackText,
    };
};

export default connect(mapStateToProps, { closeSnack })(withStyles(styles)(GenesCalculator));
