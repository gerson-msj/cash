import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AxiosResponse } from "axios";
import { call, getContext, put, select, takeLatest } from "redux-saga/effects";
import type { RootState } from ".";
import type { IAuth } from "../domain/auth";
import type { ISagaContext } from "../domain/sagaContext";

const name = 'auth'
const freePaths = ['/login', '/cadastro']

interface state {
    auth?: IAuth
}

const initialState: state = {}

const reducers = {
    incluir: (state: state, action: PayloadAction<IAuth>) => {
        state.auth = action.payload
    },
    remover: (state: state) => {
        if (state.auth)
            state.auth = undefined
    }
}

const authSlice = createSlice({
    name,
    initialState,
    reducers
})

export const authReducer = authSlice.reducer

export const authActions = {
    incluir: authSlice.actions.incluir,
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
        yield put(authActions.incluir(auth))
    } else if (path !== '/') {
        navigate('/')
    }
}

export function* authSaga() {
    yield takeLatest(authActions.verificar.type, verificar)
}


