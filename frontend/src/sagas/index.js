import { take, put, call, fork, select, all, takeEvery } from 'redux-saga/effects';
import * as genesActions from '../actions/genesActions';
import axios from 'axios';

export const submitGenes = function *() {
    while (true) {
        const action = yield take(genesActions.SUBMIT_GENES_REQUEST);
        try {
            const result = yield call(
                submitGenesFlask,
                action.genes,
            );
            if (result.status === 200) {
                yield put({
                    type: genesActions.SUBMIT_GENES_SUCCESS,
                    text: "Successfully submitted.",
                    number: result.number_of_genes,
                });
            }
            else { 
                yield put({
                    type: genesActions.SUBMIT_GENES_FAILURE,
                    error: "Whoops, something is wrong..."
                });
            }
        } catch (err) {
            yield put({
                type: genesActions.SUBMIT_GENES_FAILURE,
                error: "Whoops, something is wrong..."
            });
        }
    }
};

const submitGenesFlask = function* (genes) {
    try {
        let data = {genes};
        const result = yield call(
            axios.post,
            'http://127.0.0.1:5000/submit_genes/',
            data,
            { headers: { "Access-Control-Allow-Origin": "*", }},
        );
        return result.data
    }catch (err) {
        yield put({
            type: genesActions.SUBMIT_GENES_FAILURE,
            error: "Whoops, something is wrong...",
        });
    }
}

export const fetchGenes = function *() {
    while (true) {
        const action = yield take(genesActions.FETCH_GENES_REQUEST);
        try {
            const result = yield call(
                fetchGenesFlask,
            );
            if (result.status === 200) {
                yield put({
                    type: genesActions.FETCH_GENES_SUCCESS,
                    text: "Successfully submitted.",
                    genes: result.genes,
                });
            }
            else { 
                yield put({
                    type: genesActions.FETCH_GENES_FAILURE,
                    error: "Whoops, something is wrong..."
                });
            }
        } catch (err) {
            yield put({
                type: genesActions.SUBMIT_GENES_FAILURE,
                error: "Whoops, something is wrong..."
            });
        }
    }
};

const fetchGenesFlask = function* () {
    try {
        const result = yield call(
            axios.get,
            'http://127.0.0.1:5000/fetch_genes/',
            { headers: { "Access-Control-Allow-Origin": "*", }},
        );
        return result.data
    }catch (err) {
        yield put({
            type: genesActions.SUBMIT_GENES_FAILURE,
            error: "Whoops, something is wrong...",
        });
    }
}
export default function* rootSaga() {
    yield all([
        fork(submitGenes),
        fork(fetchGenes)
    ]);
};