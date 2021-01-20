import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CharacterData {
    id: number;
    name: string;
    class: string;
    keystones: Keystone[];
    chessOne: number;
    chessTwo: number;
    chessThree: number;
}

export interface Keystone {
    level: number;
    timed: boolean;
}

interface InitialState {
    hasFetch: boolean;
    charactersData: CharacterData[];
}

let initialState: InitialState = {
    hasFetch: false,
    charactersData: [],
};
const mythicKeystonesSlice = createSlice({
    name: "mythicKeystones",
    initialState,
    reducers: {
        addAll(state, action: PayloadAction<CharacterData[]>) {
            state.charactersData = action.payload;
        },
        setHasFetch(state, action: PayloadAction<boolean>) {
            state.hasFetch = action.payload;
        },
    },
});

export const { addAll, setHasFetch } = mythicKeystonesSlice.actions;

export default mythicKeystonesSlice.reducer;
