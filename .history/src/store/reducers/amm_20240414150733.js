import { createSlice } from '@reduxjs/toolkit';

export const amm = createSlice({
    name: 'amm',
    initialState: {
        contract: null,
        shares: 0,
        swaps: [],
        swaping: {
            isSwaping: false,
            isSuccess: false,
            transactionHash: null
        }
    },
    reducers: {
        setContract: (state, action) => {
            state.contract = action.payload
        },
        sharesLoaded: (state, action) => {
            state.shares = action.payload
          },
          swapRequest: (state, action) => {
            state.swaping.isSwaping = true
            state.swaping.isSuccess = false
            state.swaping.transactionHash = null
          }
    }
})

export const { setContract, sharesLoaded, swapRequest } = amm.actions;

export default amm.reducer;