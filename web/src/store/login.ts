import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { type NavigateFunction } from "react-router"
import { call, put, select, takeLatest } from "redux-saga/effects"
import type { RootState } from "."
import type { IAuth } from "../domain/auth"
import { LoginDefault, type ILogin } from "../domain/login"
import api from "./api"
import { authActions } from "./auth"

const name = 'login'

interface state {
    login: ILogin,
    loginOk: boolean
}

const initialState: state = {
    login: LoginDefault,
    loginOk: false
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
    login: createAction<{ navigate: NavigateFunction }>(`${name}/login`)
}

function* login(action: ReturnType<typeof loginActions.login>) {
    try {
        const login: ILogin = yield select((state: RootState) => state.login.login)
        const response: AxiosResponse<IAuth> = yield call(api.post, '/login', login)
        yield put(authActions.incluir(response.data))
        action.payload.navigate('/')
    } catch (error) {
        console.error(error)
    }
}

export function* loginSaga() {
    yield takeLatest(loginActions.login.type, login)
}
