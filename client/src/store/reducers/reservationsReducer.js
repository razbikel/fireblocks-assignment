
let initial = {
    reservations: {}
}
const reservationsReducer = (state = initial, action) => {
    switch (action.type){
        case "reservationsUpdate":
            return { ...state, user: action.data };
        default:
            return state;
        }
}

export default reservationsReducer;