import { createSlice } from '@reduxjs/toolkit';

export const AMM = createSlice({
    name: 'AMM',
    initialState: {
        contract: null,
        shares: 0,
        swaps: []
    },
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload
        },
        sharesLoaded: (state, action) => {
            state.shares = action.payload
          }
    }
})

export const { setContract, sharesLoaded } = AMM.actions;

export default AMM.reducer;