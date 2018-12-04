export const ADD_GENE = "ADD_GENE";

export const addGene = (gene) => {
    return {
        type: ADD_GENE,
        gene,
    };
};

export const DELETE_GENE = "DELETE_GENE";

export const deleteGene = (index, last) => {
    return {
        type: DELETE_GENE,
        index,
        last
    };
};

export const CHANGE_INPUT = "CHANGE_INPUT";

export const changeInput = (value) => {
    return {
        type: CHANGE_INPUT,
        value,
    };
};

export const SUBMIT_GENES_REQUEST = "SUBMIT_GENES_REQUEST";
export const SUBMIT_GENES_SUCCESS = "SUBMIT_GENES_SUCCEES";
export const SUBMIT_GENES_FAILURE = "SUBMIT_GENES_FAILURE";

export const submitGenes = (genes) => {
    return {
        type: SUBMIT_GENES_REQUEST,
        genes,
    };
};


export const CLOSE_SNACKBAR = "CLOSE_SNACKBAR";

export const closeSnack = () => {
    return {
        type: CLOSE_SNACKBAR,
    };
};

export const FETCH_GENES_REQUEST = "FETCH_GENES_REQUEST";
export const FETCH_GENES_SUCCESS = "FETCH_GENES_SUCCESS";
export const FETCH_GENES_FAILURE = "FETCH_GENES_FAILURE";

export const fetchGenes = () => {
    return {
        type: FETCH_GENES_REQUEST,
    };
};