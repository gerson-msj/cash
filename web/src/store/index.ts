import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { apiInjectStore } from "./api";
import { authReducer, authSaga } from "./auth";
import { cadastroReducer, cadastroSaga } from "./cadastro";
import { configReducer, configSaga } from "./config";
import { loginReducer, loginSaga } from "./login";
import { movimentoReducer, movimentoSaga } from "./movimento";
import { uiStateReducer } from "./uiState";

export const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: combineReducers({
        uiState: uiStateReducer,
        auth: authReducer,
        cadastro: cadastroReducer,
        login: loginReducer,
        config: configReducer,
        movimento: movimentoReducer,

    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

apiInjectStore(store)

function* rootSaga() {
    yield all([
        cadastroSaga(),
        loginSaga(),
        authSaga(),
        configSaga(),
        movimentoSaga(),

    ])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
