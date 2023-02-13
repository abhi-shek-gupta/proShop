import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/product/productSlice";
import productDetails from "./features/product/productDetails";
import thunk from "redux-thunk";
import cartReducer from "./features/cart/cartSlice";
import userLoginReducer from "./features/user/userSlice";
import userRegisterReducer from "./features/user/userRegisterSlice";
import useDetailsReducer from "./features/user/userDetailsSlice";
import updateUserProfileReducer from "./features/user/userProfileUpdateSlice";
import orderCreateReducer from "./features/order/orderCreateSlice";

const reducer = {
  productList: productReducer,
  productDetails,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: useDetailsReducer,
  userUpdateProfile: updateUserProfileReducer,
  orderCreate: orderCreateReducer,
};
const cartItemsFromLocalStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromLocalStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const preloadedState = {
  cart: {
    cartItems: cartItemsFromLocalStorage,
    shippingAddress: shippingAddressFromLocalStorage,
  },
  userLogin: { userInfo: userInfoFromLocalStorage },
}; // initialState of the redux

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
  preloadedState,
});

export default store;
