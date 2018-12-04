import * as ActionTypes from '../actions/generalActions';

const initialState = {
    menuOpen: false,
}

const generalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.TOGGLE_MENU:
            return {
                ...state,
                menuOpen: action.newState,
            };
        default:
            return state;
    };
};

export default generalReducer;