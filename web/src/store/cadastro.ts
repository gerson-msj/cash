import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, put, takeLatest } from "redux-saga/effects"
import type { IAuth } from "../domain/auth"
import { CadastroDefault, type ICadastro } from "../domain/cadastro"
import api from "./api"
import { authActions } from "./auth"
import { uiStateActions } from "./uiState"

const name = 'cadastro'

interface CadastroState {
    cadastro: ICadastro
}

const initialState: CadastroState = {
    cadastro: CadastroDefault
}

const reducers = {
    change: <k extends keyof ICadastro>(
        state: CadastroState,
        action: PayloadAction<{
            name: k
            value: ICadastro[k]
        }>) => {
        const { name, value } = action.payload
        state.cadastro[name] = value
    }
}

const slice = createSlice({
    name, initialState, reducers
})

export const cadastroReducer = slice.reducer

export const cadastroActions = {
    change: slice.actions.change,
    save: createAction<ICadastro>(`${name}/save`)
}

function* request(action: ReturnType<typeof cadastroActions.save>) {
    try {
        const response: AxiosResponse<IAuth> = yield call(api.post, '/cadastro', action.payload)
        yield put(authActions.incluir(response.data))
        yield put(uiStateActions.exibirMsgBox({}))
    } catch (error) {
        console.error(error)
    }
}

export function* cadastroSaga() {
    yield takeLatest(cadastroActions.save.type, request);
}
