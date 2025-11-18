import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { put, takeLatest } from "redux-saga/effects"
import { CadastroDefault, type ICadastro } from "../types"
import { uiStateActions } from "./uiState"

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

const privateActions = {
    saveSuccess: createAction<ICadastro>(cadastroTypes.success)
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
            .addCase(privateActions.saveSuccess, (state, action) => {
                state.cadastrado = action.payload != null
            })
    }
})

export const cadastroActions = {
    change: cadastroSlice.actions.changeCadastro,
    save: createAction<ICadastro>(cadastroTypes.request)
}

function* request(action: ReturnType<typeof cadastroActions.save>) {
    yield put(uiStateActions.incluir({ tipo: "ERRO", mensagem: "Teste de mensagem de erro" }))
    const result = action.payload
    yield put(privateActions.saveSuccess(result))
}

export function* cadastroSaga() {
    yield takeLatest(cadastroActions.save.type, request);
}