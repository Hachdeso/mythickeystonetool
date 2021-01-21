import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    idToDisplay: number;
}

let initialState: InitialState = {
    idToDisplay: 0,
};
const mythicKeystonesDetailsSlice = createSlice({
    name: "mythicKeystones",
    initialState,
    reducers: {
        setIdToDisplay(state, action: PayloadAction<number>) {
            state.idToDisplay = action.payload;
        },
    },
});

export const { setIdToDisplay } = mythicKeystonesDetailsSlice.actions;

export default mythicKeystonesDetailsSlice.reducer;
