import * as ActionTypes from '../actions/genesActions';

const initialState = {
    loadingGenes: true,
    loadingPlot: false,
    numberOfGenes: '',
    snackOpen: false,
    snackText: 'Empty test',
    suggestions: [
        { label: 'British Indian Ocean Territory' },
        { label: 'Brunei Darussalam' },
    ],
    selectedItem: [],
    inputValue: "",
}

const genesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.FETCH_GENES_REQUEST:
            return {
                ...state,
                loadingGenes: true,
            };
        case ActionTypes.FETCH_GENES_SUCCESS:
            return {
                ...state,
                suggestions: action.genes,
                loadingGenes: false,
                snackOpen: true,
                snackText: "Successfully fetched genes.",
            };
        case ActionTypes.FETCH_GENES_FAILURE:
            return {
                ...state,
                loadingGenes: false,
                snackOpen: true,
                snackText: "Whoops, something went wrong.",
            };
        case ActionTypes.ADD_GENE: 
            let selectedItemsAdd = state.selectedItem.slice();
            if (selectedItemsAdd.indexOf(action.gene) === -1) {
                selectedItemsAdd = [...selectedItemsAdd, action.gene];
            }
            return {
                ...state,
                selectedItem: selectedItemsAdd,
                inputValue: '',
            };
        case ActionTypes.DELETE_GENE:
            let selectedItem = [];
            if (action.last) {
                selectedItem = state.selectedItem.splice(0, action.index);
            } else {
                selectedItem = state.selectedItem.splice(action.index, 1);
            }
            return {
                ...state,
                selectedItem,
            };
        case ActionTypes.CHANGE_INPUT:
            return {
                ...state,
                inputValue: action.value,
            };
        case ActionTypes.SUBMIT_GENES_REQUEST:
            return {
                ...state,
                loadingPlot: true,
            };
        case ActionTypes.SUBMIT_GENES_SUCCESS:
            return {
                ...state,
                numberOfGenes: action.number,
                loadingPlot: false,
                snackOpen: true,
                snackText: "Successfully submitted.",
            };
        case ActionTypes.SUBMIT_GENES_FAILURE:
            return {
                ...state,
                loadingPlot: false,
                snackOpen: true,
                snackText: "Whoops, something went wrong.",
            };
        case ActionTypes.CLOSE_SNACKBAR:
            return {
                ...state,
                snackOpen: false,
            }
        default:
            return state;
    };
};

export default genesReducer;