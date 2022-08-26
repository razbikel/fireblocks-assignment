// import {connect} from 'react-redux';
import * as React from 'react';
import { updateDate } from '../store/actions/dateAction';
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'




const Home = () => {
    const date = useSelector((state) => state.date)
    const dispatch = useDispatch()

    console.log(date)

    return(
        <div>
            home
            <button onClick={() => dispatch({type: "dateUpdate",date:"23-04-25" })}>
                update date
            </button>
            <div>{date.date}</div>
        </div>
    )
}

export default Home;

// export default connect(
//     ({ date }) => ({ date }),
//     { updateDate}
// )(Home)