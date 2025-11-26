import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { apiInjectStore } from "./api";
import { authReducer } from "./auth";
import { cadastroSaga, cadastroSlice } from "./cadastro";
import { uiStateReducer } from "./uiState";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: combineReducers({
        uiState: uiStateReducer,
        auth: authReducer,
        cadastro: cadastroSlice.reducer,
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

apiInjectStore(store)

function* rootSaga() {
    yield all([
        cadastroSaga()
    ])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch