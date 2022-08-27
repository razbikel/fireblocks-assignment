let initial = {
    day: undefined
}
const dayRedcuer = (state = initial, action) => {
    switch (action.type){
        case "dayUpdate":
            return { ...state, day: action.data };
        default:
            return state;
        }
}

export default dayRedcuer;