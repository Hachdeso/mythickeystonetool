import { combineReducers } from "@reduxjs/toolkit";
import mythicKeystonesDataReducer from "./mythicKeystonesDataSlice";
import mythicKeystonesDetailsReducer from "./mythicKeystonesDetailsSlice";

export default combineReducers({
    data: mythicKeystonesDataReducer,
    detail: mythicKeystonesDetailsReducer,
});
