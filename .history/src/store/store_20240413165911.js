import { configureStore } from "@reduxjs/toolkit";

import provider from "./reducers/provider";
import tokens from "./reducers/tokens";
import AMM from "./reducers/amm";

export const store = configureStore({
    reducer: {
        provider,
        tokens,
        amm
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false
    })
})