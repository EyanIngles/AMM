import { createSlice } from '@reduxjs/toolkit';

export const amm = createSlice({
    name: 'amm',
    initialState: {
        contracts: null,
        shares: 0,
        swaps: []
    },
    reducers: {
        setContracts: (state, action) => {
            state.contracts = action.payload
        },
    }
})

export const { setContracts } = amm.actions;

export default amm.reducer;