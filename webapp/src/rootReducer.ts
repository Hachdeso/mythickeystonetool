import { combineReducers } from "@reduxjs/toolkit";
import mythicKeystonesReducer from "./MythicKeystones/mythicKeystonesSlice";

const rootReducer = combineReducers({
    mythicKeystones: mythicKeystonesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
