import { createAction, createSlice, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { call, getContext, put, select, takeLatest } from "redux-saga/effects";
import type { RootState } from ".";
import type { IAuth } from "../domain/auth";
import type { ISagaContext } from "../domain/sagaContext";

const name = 'auth'
const freePaths = ['/login', '/cadastro']

interface state {
    auth?: IAuth,
    principal?: boolean
}

const initialState: state = {}

const reducers = {
    remover: (state: state) => {
        if (state.auth)
            state.auth = undefined

        state.principal = undefined
    }
}

const extraActions = {
    incluir: createAction<IAuth>(`${name}/incluir`)
}

const extraReducers = (builder: ActionReducerMapBuilder<state>) => {
    builder.addCase(extraActions.incluir, (state, action) => {
        state.auth = action.payload
        state.principal = action.payload.principal
    })
}

const authSlice = createSlice({
    name, initialState, reducers, extraReducers
})

export const authReducer = authSlice.reducer

export const authActions = {
    remover: authSlice.actions.remover,
    verificar: createAction<string>(`${name}/verificar`)
}

function* verificar(action: ReturnType<typeof authActions.verificar>) {

    const path = action.payload
    if (freePaths.includes(path)) return

    let auth: IAuth | undefined = yield select((state: RootState) => state.auth.auth)
    if (auth) return

    const { navigate, api }: ISagaContext = yield getContext('ctx')
    const response: AxiosResponse<IAuth | undefined> = yield call(api.get, '/auth')
    auth = response.data
    if (auth) {
        yield put(extraActions.incluir(auth))
    } else if (path !== '/') {
        navigate('/')
    }
}

export function* authSaga() {
    yield takeLatest(authActions.verificar.type, verificar)
}
