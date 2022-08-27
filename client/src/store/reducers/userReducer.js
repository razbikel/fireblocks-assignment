
let initial = {
    user: {"name":"person-1","reservations":[],"id":1}
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