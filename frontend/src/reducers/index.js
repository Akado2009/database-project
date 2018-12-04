import { combineReducers } from 'redux'
import generalReducer from './general';
import genesReducer from './genes';

const rootReducer = combineReducers({
    ["general"]: generalReducer,
    ["genes"]: genesReducer,
})

export default rootReducer;