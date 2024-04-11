import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import provider from "./reducers/provider";
import tokens from "./reducers/tokens";

export const store = configureStore({
    reducer: {
        provider
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false
    })
})