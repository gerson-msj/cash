import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { apiInjectStore } from "./api";
import { cadastroSaga, cadastroSlice } from "./cadastro";
import { uiStateSlice } from "./uiState";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: combineReducers({
        aviso: uiStateSlice.reducer,
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