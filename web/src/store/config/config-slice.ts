import { createAction, createSlice } from "@reduxjs/toolkit"
import type ICategoria from "../../domain/entities/categoria"
import type IConta from "../../domain/entities/conta"
import type IFamilia from "../../domain/entities/familia"
import { familiaDefault } from "../../domain/entities/familia"
import type IIntegrante from "../../domain/entities/integrante"
import { extraReducers, reducers } from "./config-reducer"

export const name = 'config'

export const contexts = {
    Selecionar: 'SELECIONAR',
    Criar: 'CRIAR',
    Editar: 'EDITAR'
} as const

type context = (typeof contexts)[keyof typeof contexts];

type stateContext = {
    idx?: number
    ctx?: context
}

export interface IState {
    familia: IFamilia
    familiaEdit?: IFamilia
    integrantes: Record<number, IIntegrante>
    integrante?: IIntegrante & stateContext,
    conta?: IConta & stateContext
    categoria?: ICategoria & stateContext
}

export const initialState: IState = {
    familia: familiaDefault,
    integrantes: {}
}

export const slice = createSlice({
    name, initialState, reducers, extraReducers
})

export const actions = {
    request: createAction(`${name}/request`),

    familia: {
        selecionar: slice.actions.selecionarFamilia,
        alterar: slice.actions.alterarFamilia,
        confirmar: slice.actions.confirmarFamilia,
        cancelar: slice.actions.cancelarFamilia,
    },

    integrante: {
        selecionar: slice.actions.selecionarIntegrante,
        editar: slice.actions.editarIntegrante,
        novo: slice.actions.novoIntegrante,
        alterar: slice.actions.alterarIntegrante,
        confirmar: slice.actions.confirmarIntegrante,
        cancelar: slice.actions.cancelarIntegrante,
    },

    categoria: {
        criar: slice.actions.categoriaCriar,
        alterar: slice.actions.categoriaAlterar,

    },

}

export const extraActions = {
    requestSuccess: createAction<IFamilia>(`${name}/requestSuccess`)
}