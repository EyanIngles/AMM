import { createSlice } from '@reduxjs/toolkit';

export const amm = createSlice({
    name: 'amm',
    initialState: {
        contract: null,
        shares: 0,
        swaps: [],
        swapping: {
            isSwapping: false,
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
            state.swapping.isSwapping = true
            state.swapping.isSuccess = false
            state.swapping.transactionHash = null
          }
    }
})

export const { setContract, sharesLoaded, swapRequest } = amm.actions;

export default amm.reducer;