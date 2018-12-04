import React  from 'react';
import Header from './Main/Header';
import Menu from './Main/Menu';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import  { Route, Switch } from 'react-router-dom';

import Welcome from './Welcome/Welcome';
import GenesCalculator from './Genes/GenesCalculator';
import NotFound from './Main/404';

const styles = {
    root: {
        width: '90%',
        margin: '0 auto',
        paddingTop: 20,
    }
};

const App = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <Header />
            <Menu />
            <Switch>
                <Route exact path="/" component={Welcome} />
                <Route path="/genes" component={GenesCalculator} />
                <Route component={NotFound} />
            </Switch>
        </div>
    )
};

App.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App)