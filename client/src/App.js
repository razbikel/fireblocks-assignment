import './App.css';
// import {createStore} from 'redux';
import { legacy_createStore as createStore} from 'redux'
import {Provider} from 'react-redux';
import rootReducer from './store/reducers/index'
import Home from './components/Home'
import { ThemeProvider } from '@mui/material/styles';
import {theme} from './style/theme';



const store = createStore(rootReducer);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store = {store}>
        <div className="App">
          <Home />
        </div>
    </Provider>
    </ThemeProvider>

  );
}

export default App;


