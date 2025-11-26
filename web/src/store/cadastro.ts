import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects"
import type { IAuth } from "../domain/interfaces/IAuth"
import { CadastroDefault, type ICadastro } from "../types"
import api from "./api"
import { authActions } from "./auth"

interface CadastroState {
    cadastro: ICadastro,
    cadastrado: boolean
}

const initialState: CadastroState = {
    cadastro: CadastroDefault,
    cadastrado: false
}

const cadastroTypes = {
    request: 'cadastro/request',
    success: 'cadastro/success',
    error: 'cadastro/error'
}

const actions = {
    saveSuccess: createAction(cadastroTypes.success)
}

export const cadastroSlice = createSlice({
    name: "cadastro",
    initialState,
    reducers: {
        changeCadastro: <k extends keyof ICadastro>(
            state: CadastroState,
            action: PayloadAction<{
                name: k
                value: ICadastro[k]
            }>) => {
            const { name, value } = action.payload
            state.cadastro[name] = value
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(actions.saveSuccess, (state) => {
                state.cadastrado = true
            })
    }
})

export const cadastroActions = {
    change: cadastroSlice.actions.changeCadastro,
    save: createAction<ICadastro>(cadastroTypes.request)
}

function* request(action: ReturnType<typeof cadastroActions.save>) {
    try {
        const response: AxiosResponse<IAuth> = yield call(api.post, '/cadastro', action.payload)
        yield put(authActions.incluir(response.data))
        yield put(actions.saveSuccess())
    } catch (error) {
        console.error(error)
    }
}

export function* cadastroSaga() {
    yield takeLatest(cadastroActions.save.type, request);
}