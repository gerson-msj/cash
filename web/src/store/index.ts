import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import cadastroSaga from "./cadastro/sagas";
import cadastroSlice from "./cadastro/slice";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
    reducer: combineReducers({
        cadastro: cadastroSlice.reducer
    }),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware)
})

function* rootSaga() {
    yield all([
        cadastroSaga()
    ])
}

sagaMiddleware.run(rootSaga)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch