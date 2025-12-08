import { createAction, createSlice, type ActionReducerMapBuilder, type PayloadAction } from "@reduxjs/toolkit"
import type { AxiosResponse } from "axios"
import { call, getContext, put, takeLatest } from "redux-saga/effects"
import type IFamilia from "../domain/entities/familia"
import { familiaDefault } from "../domain/entities/familia"
import type IIntegrante from "../domain/entities/integrante"
import type { ISagaContext } from "../domain/sagaContext"

const name = 'config'

interface IState {
    familia: IFamilia
    familiaEdit?: IFamilia
    integrantes: Record<number, IIntegrante>
    integrante?: IIntegrante,
    integranteEdit?: IIntegrante,
    integranteAdd?: IIntegrante,
    idxIntegrante?: number
}

const initialState: IState = {
    familia: familiaDefault,
    integrantes: {}
}

const reducers = {
    selecionarFamilia: (state: IState) => {
        state.familiaEdit = state.familia
    },
    alterarFamilia: (state: IState, action: PayloadAction<string>) => {
        if (state.familiaEdit)
            state.familiaEdit.nome = action.payload
    },
    confirmarFamilia: (state: IState) => {
        if (state.familiaEdit) {
            state.familia.nome = state.familiaEdit.nome
            state.familiaEdit = undefined
        }
    },
    cancelarFamilia: (state: IState) => {
        state.familiaEdit = undefined
    },

    selecionarIntegrante: (state: IState, action: PayloadAction<IIntegrante>) => {
        state.integrante = action.payload
    },
    editarIntegrante: (state: IState) => {
        state.integranteEdit = state.integrante
    },
    alterarNomeIntegrante: (state: IState, action: PayloadAction<string>) => {
        if (state.idxIntegrante !== undefined && state.familia.integrantes)
            state.familia.integrantes[state.idxIntegrante].nome = action.payload
    }
}

const extraActions = {
    requestSuccess: createAction<IFamilia>(`${name}/requestSuccess`)
}

const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.requestSuccess, (state, action) => {
        state.familia = action.payload
        if (state.familia.integrantes?.length === 1)
            state.integrante = state.familia.integrantes[0]
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

    alterarNomeIntegrante: slice.actions.alterarNomeIntegrante,
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