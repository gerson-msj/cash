import { createAction, createSlice } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, getContext, put, takeLatest } from "redux-saga/effects"
import type IFamilia from "../domain/familia"
import { familiaDefault } from "../domain/familia"
import type { ISagaContext } from "../domain/sagaContext"
import { authActions } from "./auth"
import { uiStateActions } from "./uiState"

const name = 'config'

interface IState {
    familia: IFamilia
}

const initialState: IState = {
    familia: familiaDefault
}

const reducers = {}

const actions

// const extraReducers = (builder: ActionReducerMapBuilder) => {

// }

const slice = createSlice({
    name, initialState, reducers, extraReducers(builder) {
        builder.addCase(createAction(`${name}/requestSuccess`), (sta))
    },
})

export const configReducer = slice.reducer

export const configActions = {
    request: createAction(`${name}/request`)
}

function* request() {
    const { api }: ISagaContext = yield getContext('ctx')
    try {
        const response: AxiosResponse<IFamilia> = yield call(api.get, '/config')
        yield put(authActions.incluir(response.data))
        yield put(uiStateActions.exibirMsgBox({}))
    } catch (error) {
        console.error(error)
    }
}

export function* configSaga() {
    yield takeLatest(configActions.request.type, request)
}