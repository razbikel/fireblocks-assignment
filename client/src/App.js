import './App.css';
import BasicDatePicker from './components/DatePicker'
// import {createStore} from 'redux';
import { legacy_createStore as createStore} from 'redux'
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/index'
import Home from './components/Home'



const store = createStore(rootReducer);

function App() {
  return (
    <Provider store = {store}>
      <div className="App">
        <BasicDatePicker />
        <Home />
      </div>
    </Provider>
  );
}

export default App;


