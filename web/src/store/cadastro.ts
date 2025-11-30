import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, getContext, put, select, takeLatest } from "redux-saga/effects"
import type { RootState } from "."
import type { IAuth } from "../domain/auth"
import { CadastroDefault, type ICadastro } from "../domain/cadastro"
import type { ISagaContext } from "../domain/sagaContext"
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
    //save: createAction<ICadastro>(`${name}/save`)
    save: createAction(`${name}/save`)
}

// action: ReturnType<typeof cadastroActions.save>
function* request() {
    const { api }: ISagaContext = yield getContext('ctx')
    try {
        const cadastro: ICadastro = yield select((state: RootState) => state.cadastro.cadastro)
        const response: AxiosResponse<IAuth> = yield call(api.post, '/cadastro', cadastro)
        yield put(authActions.incluir(response.data))
        yield put(uiStateActions.exibirMsgBox({}))
    } catch (error) {
        console.error(error)
    }
}

export function* cadastroSaga() {
    yield takeLatest(cadastroActions.save.type, request);
}
