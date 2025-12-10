import { createAction, createSlice } from "@reduxjs/toolkit"
import type IFamilia from "../../domain/entities/familia"
import { familiaDefault } from "../../domain/entities/familia"
import type IIntegrante from "../../domain/entities/integrante"
import { extraReducers, reducers } from "./config-reducer"

export const name = 'config'

export interface IState {
    familia: IFamilia
    familiaEdit?: IFamilia
    integrantes: Record<number, IIntegrante>
    integrante?: IIntegrante,
    integranteAdd?: IIntegrante,
    integranteEdit?: IIntegrante
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

export const extraActions = {
    requestSuccess: createAction<IFamilia>(`${name}/requestSuccess`)
}