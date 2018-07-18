import {createStore,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {reducer} from "./reducers/index.js";

let store=createStore(reducer,applyMiddleware(thunk))
export default store;