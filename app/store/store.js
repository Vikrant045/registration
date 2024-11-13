// app/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; // import your counter slice reducer

const store = configureStore({
  reducer: {
    counter: counterReducer, // add the counter reducer here
  },
});

export default store;
