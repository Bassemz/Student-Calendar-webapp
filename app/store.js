import { configureStore } from "@reduxjs/toolkit";
import userCoursesReducer from "./slices/userCourses";

export const store = configureStore({
  reducer: {
    userCourses: userCoursesReducer,
  },
});
