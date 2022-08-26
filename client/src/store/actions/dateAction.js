
export const updateDate = (date) => {
    return (
        (dispatch) => {
            return(
                dispatch({
                    type: "dateUpdate",
                    date
                })
            );

        }
    )
}