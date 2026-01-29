import { combineReducers, configureStore, type Reducer } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './features/baseApi'
import type { AuthState } from './features/auth/authApi'
import authReducer from './features/auth/authApi'
import type { TravelPlanState } from './features/travelPlan/travelPlanApi'
import travelPlanReducer from './features/travelPlan/travelPlanApi'

const rootReducer = combineReducers({
    auth: authReducer as Reducer<AuthState>,
    travelPlan: travelPlanReducer as Reducer<TravelPlanState>,
    [api.reducerPath]: api.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    // Ignore these action types
                    'persist/PERSIST',
                    'persist/REHYDRATE',
                    'persist/REGISTER',
                    'persist/FLUSH',
                    'persist/PAUSE',
                    'persist/PURGE',
                ],
                ignoredPaths: [api.reducerPath],
            },
        })
            .concat(api.middleware),
    devTools: false, // Temporarily disabled to fix "Invariant: Missing ActionQueueContext" error
})

// Enable refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch
