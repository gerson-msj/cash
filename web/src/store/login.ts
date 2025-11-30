import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, getContext, put, select, takeLatest } from "redux-saga/effects"
import type { RootState } from "."
import type { IAuth } from "../domain/auth"
import { LoginDefault, type ILogin } from "../domain/login"
import type { ISagaContext } from "../domain/sagaContext"
import { authActions } from "./auth"

const name = 'login'

interface state {
    login: ILogin
}

const initialState: state = {
    login: LoginDefault
}

const reducers = {
    change: <k extends keyof ILogin>(
        state: state,
        action: PayloadAction<{ name: k, value: ILogin[k] }>
    ) => {
        state.login[action.payload.name] = action.payload.value
    }
}

const slice = createSlice({
    name, initialState, reducers
})

export const loginReducer = slice.reducer

export const loginActions = {
    change: slice.actions.change,
    login: createAction(`${name}/login`),
    logout: createAction(`${name}/logout`)
}

function* login() {
    const { navigate, api }: ISagaContext = yield getContext('ctx')
    try {
        const login: ILogin = yield select((state: RootState) => state.login.login)
        const response: AxiosResponse<IAuth> = yield call(api.post, '/login', login)
        yield put(authActions.incluir(response.data))
        navigate('/')
    } catch (error) {
        console.error(error)
    }
}

function* logout() {
    const { api }: ISagaContext = yield getContext('ctx')
    try {
        yield call(api.delete, '/login')
        yield put(authActions.remover())
    } catch (error) {
        console.error(error)
    }
}

export function* loginSaga() {
    yield takeLatest(loginActions.login.type, login)
    yield takeLatest(loginActions.logout.type, logout)
}
