import { createSlice } from '@reduxjs/toolkit';

export const tokens = createSlice({
    name: 'tokens',
    initialState: {
        contracts: [],
        symbols: [],
        balances: []
    },
    reducers: {
        setContracts: (state, action) => {
            state.contracts = action.payload
        }
    }
})

export const { setContracts } = tokens.actions;

export default tokens.reducer;