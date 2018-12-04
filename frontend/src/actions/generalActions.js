export const TOGGLE_MENU = "TOGGLE_MENU";

export const toggleMenu = (state) => {
    return {
        type: TOGGLE_MENU,
        newState: state,
    };
};
