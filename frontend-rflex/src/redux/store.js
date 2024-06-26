import { configureStore } from "@reduxjs/toolkit";
import pricesReducer from "./pricesSlice";

const store = configureStore({
    reducer: {
      prices: pricesReducer,
    },
  });
  
  export default store;