import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects"
import type { IAuth } from "../domain/interfaces/IAuth"
import api from "./api"
import { authActions } from "./auth"

export interface ILogin {
    email: string
    senha: string
}

const loginDefault: ILogin = {
    email: '',
    senha: ''
}

interface state {
    login: ILogin
}

const initialState: state = {
    login: loginDefault
}

const name = 'login'

const reducers = {
    change: <k extends keyof ILogin>(state: state, action: PayloadAction<{
        name: k
        value: ILogin[k]
    }>) => {
        const { name, value } = action.payload
        state.login[name] = value
    }
}

const slice = createSlice({
    name,
    initialState,
    reducers
})

export const loginReducer = slice.reducer

export const loginActions = {
    change: slice.actions.change,
    save: createAction<ILogin>(`${name}/login`)
}

function* login(action: ReturnType<typeof loginActions.save>) {
    try {
        const response: AxiosResponse<IAuth> = yield call(api.post, '/login', action.payload)
        yield put(authActions.incluir(response.data))
    } catch (error) {
        console.log(error)
    }
}

export function* loginSaga() {
    yield takeLatest(loginActions.save.type, login);
}
