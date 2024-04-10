import { createSlice } from '@reduxjs/toolkit';

export const provider = createSlice({
    name: 'provider',
    initialState: {
        connection: null,
        chainId: null,
        account: null
    },
    reducers: {
        setAccount: (state, action) => {
            state.account = accountpayload
        }
    }
})

export const { setAccount } = provider.actions;

export default provider.reducer;