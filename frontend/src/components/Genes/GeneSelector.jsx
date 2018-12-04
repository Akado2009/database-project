import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import deburr from 'lodash/deburr';
import keycode from 'keycode';
import Downshift from 'downshift';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';

import { submitGenes, changeInput, addGene, deleteGene, fetchGenes } from '../../actions/genesActions';
import { Typography } from '@material-ui/core';

const module = "genes";

const styles = theme => ({
    root: {
        textAlign: 'center',
    },
    circProgress: {
        margin: '0 auto',
    },
    downshift: {
        marginTop: 20,
        marginBottom: 20,
    },
});

const renderSuggestion = ({ suggestion, index, itemProps, highlightedIndex, selectedItem }) => {
    const isHighlighted = highlightedIndex === index;
    const isSelected = (selectedItem || '').indexOf(suggestion.label) > -1;
  
    return (
      <MenuItem
        {...itemProps}
        key={suggestion.label}
        selected={isHighlighted}
        component="div"
        style={{
          fontWeight: isSelected ? 500 : 400,
        }}
      >
        {suggestion.label}
      </MenuItem>
    );
}

renderSuggestion.propTypes = {
    highlightedIndex: PropTypes.number,
    index: PropTypes.number,
    itemProps: PropTypes.object,
    selectedItem: PropTypes.string,
    suggestion: PropTypes.shape({ label: PropTypes.string }).isRequired,
};


const renderInput = (inputProps) => {
    const { InputProps, classes, ref, ...other } = inputProps;
  
    return (
      <TextField
        InputProps={{
          inputRef: ref,
          classes: {
            root: classes.inputRoot,
            input: classes.inputInput,
          },
          ...InputProps,
        }}
        {...other}
      />
    );
}
  
class GeneSelector extends React.Component {
    
    componentWillMount () {
        this.props.fetchGenes();
    };

    submitGenes = (event) => {
        this.props.submitGenes(this.props.selectedItem);
    };

    getSuggestions = (value) => {
        const inputValue = deburr(value.trim()).toLowerCase();
        const inputLength = inputValue.length;
        let count = 0;
      
        return inputLength === 0
          ? []
          : this.props.suggestions.filter(suggestion => {
              const keep =
                count < 5 && suggestion.label.slice(0, inputLength).toLowerCase() === inputValue;
      
              if (keep) {
                count += 1;
              }
      
              return keep;
            });
    }


    handleInputChange = event => {
        this.props.changeInput(event.target.value);
    };

    handleKeyDown = event => {
        const { inputValue, selectedItem } = this.props;
        if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
            this.props.deleteGene(selectedItem.length - 1, true);
        };
    };

    handleDelete = item => () => {
        this.props.deleteGene(this.props.selectedItem.indexOf(item), false);
    };
    
    handleChange = item => {
        this.props.addGene(item);
    }
      
    render() {
        const { classes, inputValue, selectedItem } = this.props;

        return (
            <div className={classes.root}>
                <Typography variant={"h5"}>
                    Select genes
                </Typography> 
                <div className={classes.downshift}>
                {!this.props.loading ?  
                    <Downshift
                            id="downshift-multiple"
                            inputValue={inputValue}
                            onChange={this.handleChange}
                            selectedItem={this.props.selectedItem}
                            className={classes.downshift}
                        >
                            {({
                            getInputProps,
                            getItemProps,
                            isOpen,
                            inputValue: inputValue2,
                            selectedItem: selectedItem2,
                            highlightedIndex,
                            }) => (
                            <div className={classes.container}>
                                {renderInput({
                                fullWidth: true,
                                classes,
                                InputProps: getInputProps({
                                    startAdornment: selectedItem.map(item => (
                                    <Chip
                                        key={item}
                                        tabIndex={-1}
                                        label={item}
                                        className={classes.chip}
                                        onDelete={this.handleDelete(item)}
                                    />
                                    )),
                                    onChange: this.handleInputChange,
                                    onKeyDown: this.handleKeyDown,
                                    placeholder: 'Select Genes',
                                }),
                                label: 'Genes',
                                })}
                                {isOpen ? (
                                <Paper className={classes.paper} square>
                                    {this.getSuggestions(inputValue2).map((suggestion, index) =>
                                    renderSuggestion({
                                        suggestion,
                                        index,
                                        itemProps: getItemProps({ item: suggestion.label }),
                                        highlightedIndex,
                                        selectedItem: selectedItem2,
                                    }),
                                    )}
                                </Paper>
                                ) : null}
                            </div>
                            )}
                        </Downshift>
                    :
                    <div className={classes.circProgress}>
                        <CircularProgress className={classes.progress} color="secondary" />
                    </div>
                }
                </div>
                
                <Button onClick={this.submitGenes} variant={"contained"} color={"secondary"}>
                    Submit
                </Button>
            </div>
        )
    }
}

GeneSelector.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        suggestions: state[module].suggestions,
        inputValue: state[module].inputValue,
        selectedItem: state[module].selectedItem,
        loading: state[module].loadingGenes,
        // loading: state[module].loading,
        // snackOpen: state[module].snackOpen,
        // snackText: state[module].snackText,
    };
};

export default connect(mapStateToProps, { submitGenes, changeInput, addGene, deleteGene, fetchGenes })(withStyles(styles)(GeneSelector));