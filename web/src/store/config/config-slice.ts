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
    save: createAction(`${name}/save`),

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
        excluir: slice.actions.excluirIntegrante
    },

    categoria: {
        criar: slice.actions.categoriaCriar,
        editar: slice.actions.categoriaEditar,
        alterar: slice.actions.categoriaAlterar,
        confirmar: slice.actions.categoriaConfirmar,
        cancelar: slice.actions.categoriaCancelar,
        excluir: slice.actions.categoriaExcluir
    },

    conta: {
        criar: slice.actions.contaCriar,
        editar: slice.actions.contaEditar,
        alterar: slice.actions.contaAlterar,
        confirmar: slice.actions.contaConfirmar,
        cancelar: slice.actions.contaCancelar,
        excluir: slice.actions.contaExcluir
    },

}

export const extraActions = {
    requestSuccess: createAction<IFamilia>(`${name}/requestSuccess`)
}