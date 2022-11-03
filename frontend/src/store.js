import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import productDetails from "./features/product/productDetails";
import thunk from "redux-thunk";

const reducer = {
  productList: productReducer,
  productDetails,
};
const preloadedState = {}; // initialState of the redux

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState,
});

export default store;
