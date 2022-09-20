import categoriesReducer from "./reducers/categoriesReducers";
import { createStore, combineReducers } from "redux";

const rootReducer = combineReducers({
   categoriesState: categoriesReducer,
});

const store = createStore(rootReducer);

export default store;
