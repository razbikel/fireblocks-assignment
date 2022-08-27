
let initial = {
    user: {}
}
const userReducer = (state = initial, action) => {
    switch (action.type){
        case "userUpdate":
            return { ...state, user: action.data };
        default:
            return state;
        }
}

export default userReducer;