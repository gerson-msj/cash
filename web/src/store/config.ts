import { createAction, createSlice, type ActionReducerMapBuilder, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, getContext, put, takeLatest } from "redux-saga/effects"
import type IFamilia from "../domain/entities/familia"
import { familiaDefault } from "../domain/entities/familia"
import type IIntegrante from "../domain/entities/integrante"
import { integranteDefault } from "../domain/entities/integrante"
import type { ISagaContext } from "../domain/sagaContext"

const name = 'config'

interface IState {
    familia: IFamilia
    familiaEdit?: IFamilia
    integrantes: Record<number, IIntegrante>
    integrante?: IIntegrante,
    integranteAdd?: IIntegrante,
    integranteEdit?: IIntegrante
}

const initialState: IState = {
    familia: familiaDefault,
    integrantes: {}
}

/**
 * Limpa os estados de edição.
 * @param state IState.
 * @param selecionarIntegranteDefault Seleciona o integrante se houver somente um.
 */
const reset = (state: IState, selecionarIntegranteDefault: boolean = false) => {
    state.familiaEdit = undefined
    state.integrante = undefined
    state.integranteAdd = undefined
    state.integranteEdit = undefined

    if (state.familia.integrantes?.length === 1 && selecionarIntegranteDefault) {
        state.integrante = state.familia.integrantes[0]
    }
}

const reducers = {
    selecionarFamilia: (state: IState) => {
        reset(state)
        state.familiaEdit = state.familia
    },
    alterarFamilia: (state: IState, action: PayloadAction<string>) => {
        if (state.familiaEdit) {
            state.familiaEdit.nome = action.payload
        }
    },
    confirmarFamilia: (state: IState) => {
        if (state.familiaEdit) {
            state.familia.nome = state.familiaEdit.nome.trim()
            reset(state, true)
        }
    },
    cancelarFamilia: (state: IState) => {
        reset(state, true)
    },

    selecionarIntegrante: (state: IState, action: PayloadAction<IIntegrante>) => {
        reset(state)
        state.integrante = action.payload
    },
    editarIntegrante: (state: IState) => {
        reset(state)
        state.integranteEdit = state.integrante
    },

    novoIntegrante: (state: IState) => {
        reset(state)
        state.integranteAdd = integranteDefault
    },
    alterarNovoIntegrante: <k extends keyof IIntegrante>(
        state: IState,
        action: PayloadAction<{ name: k, value: IIntegrante[k] }>
    ) => {
        if (state.integranteAdd) {
            state.integranteAdd[action.payload.name] = action.payload.value
        }
    },
    confirmarNovoIntegrante: (state: IState) => {
        if (state.integranteAdd) {
            const novoIntegrante: IIntegrante = {
                ...state.integranteAdd,
                nome: state.integranteAdd.nome.trim(),
                email: state.integranteAdd.email.trim()
            }
            if (!state.familia.integrantes) {
                state.familia.integrantes = []
            }
            state.familia.integrantes.push(novoIntegrante)
            reset(state)
            state.integrante = novoIntegrante
        }
    },
    cancelarNovoIntegrante: (state: IState) => {
        reset(state, true)
    },
}

const extraActions = {
    requestSuccess: createAction<IFamilia>(`${name}/requestSuccess`)
}

const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.requestSuccess, (state, action) => {
        state.familia = action.payload
        reset(state, true)
    })
}

const slice = createSlice({
    name, initialState, reducers, extraReducers
})

export const configReducer = slice.reducer

export const configActions = {
    request: createAction(`${name}/request`),
    selecionarFamilia: slice.actions.selecionarFamilia,
    alterarFamilia: slice.actions.alterarFamilia,
    confirmarFamilia: slice.actions.confirmarFamilia,
    cancelarFamilia: slice.actions.cancelarFamilia,

    selecionarIntegrante: slice.actions.selecionarIntegrante,
    editarIntegrante: slice.actions.editarIntegrante,

    novoIntegrante: slice.actions.novoIntegrante,
    alterarNovoIntegrante: slice.actions.alterarNovoIntegrante,
    confirmarNovoIntegrante: slice.actions.confirmarNovoIntegrante,
    cancelarNovoIntegrante: slice.actions.cancelarNovoIntegrante,

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
