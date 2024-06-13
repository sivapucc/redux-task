import { configureStore } from "@reduxjs/toolkit";
import countReducer from "./reducers/reducer";

const store = configureStore({
  reducer: { countReducer },
  devTools: true,
});

export default store;
