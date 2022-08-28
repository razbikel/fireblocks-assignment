
let initial = {
    showError: false
}
const reservationErrorReducer = (state = initial, action) => {
    switch (action.type){
        case "reservationErrorUpdate":
            return { ...state, showError: action.data };
        default:
            return state;
        }
}

export default reservationErrorReducer;