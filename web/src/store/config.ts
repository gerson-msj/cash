import { createAction, createSlice, type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, getContext, put, takeLatest } from "redux-saga/effects"
import type IFamilia from "../domain/familia"
import { familiaDefault } from "../domain/familia"
import type { ISagaContext } from "../domain/sagaContext"

const name = 'config'

interface IState {
    familia: IFamilia
}

const initialState: IState = {
    familia: familiaDefault
}

const reducers = {}

const extraActions = {
    requestSuccess: createAction<IFamilia>(`${name}/requestSuccess`)
}

const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.requestSuccess, (state, action) => {
        state.familia = action.payload
    })
}

const slice = createSlice({
    name, initialState, reducers, extraReducers
})

export const configReducer = slice.reducer

export const configActions = {
    request: createAction(`${name}/request`)
}

function* request() {
    const { api }: ISagaContext = yield getContext('ctx')
    try {

        /* -- Exemplo yield all
        const effects = [
            call(api.get, '/config'),
            select((state: RootState) => state.auth.auth),
        ]
        // Tuplas tipadas [a, b]: [tipoA, tipoB]
        const [response, auth]: [AxiosResponse<IFamilia>, IAuth | undefined] = yield all(effects)
        */

        const response: AxiosResponse<IFamilia> = yield call(api.get, '/config')
        yield put(extraActions.requestSuccess(response.data))
    } catch (error) {
        console.error(error)
    }
}

export function* configSaga() {
    yield takeLatest(configActions.request.type, request)
}