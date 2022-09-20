import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import productDetails from "./features/product/productDetails";
import thunk from "redux-thunk";
import cartReducer from "./features/cart/cartSlice";

const reducer = {
  productList: productReducer,
  productDetails,
  cart: cartReducer,
};
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];
const preloadedState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
  },
}; // initialState of the redux

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState,
});

export default store;
