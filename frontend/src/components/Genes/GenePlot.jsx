import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Plot from 'react-plotly.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';


const module = "genes"

const styles = theme => ({
    root: {
        textAlign: 'center',
    },
    progress: {
        margin: theme.spacing.unit * 2,
    },
    circProgress: {
        margin: '0 auto',
    },
});

const GenePlot = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
        {(props.loading || props.number === '') ? 
            <div className={classes.circProgress}>
                <CircularProgress className={classes.progress} color="secondary" />
            </div>
            :
            <div>
                <Typography variant={"h5"}>
                    Your random number is {props.number}.
                </Typography>
                <Plot
                    data={[
                    {
                        x: [1, 2, 3],
                        y: [2, 6, 3],
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: {color: 'red'},
                    },
                    {type: 'scatter', x: [1, 2, 3], y: [2, 5, 3]},
                    ]}
                    layout={ {width: '100%', height: '100%', title: 'A Fancy Plot'} }
                />
            </div>
        }
        </div>
    )
};

GenePlot.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        number: state[module].numberOfGenes,
        loading: state[module].loadingPlot,
    };
};

export default connect(mapStateToProps, null)(withStyles(styles)(GenePlot));
