import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Menu from './components/Menu';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';


/* REDUX STORE */
import { Provider } from 'react-redux';
import { store } from './store';
//Redux-persist
import { persistor } from './store';
import { PersistGate } from 'redux-persist/integration/react';


class App extends Component {
  render() {
    console.log(store);
    return (
      <PersistGate loading={null} persistor={persistor}>
        <Provider store={store}>
          <BrowserRouter>
            <div>
              <Menu/>
            </div>
          </BrowserRouter>
        </Provider>
      </PersistGate>
    );
  }
}
export default App;
