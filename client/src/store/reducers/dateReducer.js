let initial = {
    date: undefined
}
const dateReducer = (state = initial, action) => {
    switch (action.type){
        case "dateUpdate":
            return { ...state, date: action.date };
        default:
            return state;
        }
}

export default dateReducer;