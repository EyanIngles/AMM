import { createSlice } from '@reduxjs/toolkit';

export const amm = createSlice({
    name: 'amm',
    initialState: {
        contract: null,
        shares: 0,
        swaps: []
    },
    reducers: {
        setContract: (state, action) => {
            state.contracts = action.payload
        },
        sharesLoaded: (state, action) => {
            state.shares = action.payload
        }
    }
})

export const { setContract } = amm.actions;

export default amm.reducer;