import React, { Component } from 'react';
import './App.css';
import 'antd-mobile/dist/antd-mobile.css';
import {Provider} from "react-redux";
import store from "./store/store";
import RootRouter from "./router/router"

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <RootRouter />
        </Provider>
      </div>
    );
  }
}

export default App;
