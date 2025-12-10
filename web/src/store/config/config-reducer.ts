import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import type IIntegrante from "../../domain/entities/integrante"
import { integranteDefault } from "../../domain/entities/integrante"
import { extraActions, type IState } from "./config-slice"

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

const familia = {
    selecionar: (state: IState) => {
        reset(state)
        state.familiaEdit = state.familia
    },
    alterar: (state: IState, action: PayloadAction<string>) => {
        if (state.familiaEdit) {
            state.familiaEdit.nome = action.payload
        }
    },
    confirmar: (state: IState) => {
        if (state.familiaEdit) {
            state.familia.nome = state.familiaEdit.nome.trim()
            reset(state, true)
        }
    },
    cancelar: (state: IState) => {
        reset(state, true)
    }
}

const integrante = {
    selecionar: (state: IState, action: PayloadAction<IIntegrante>) => {
        reset(state)
        state.integrante = action.payload
    },
    editar: (state: IState) => {
        reset(state)
        state.integranteEdit = state.integrante
    },

    novo: (state: IState) => {
        reset(state)
        state.integranteAdd = integranteDefault
    },
    alterarNovo: <k extends keyof IIntegrante>(
        state: IState,
        action: PayloadAction<{ name: k, value: IIntegrante[k] }>
    ) => {
        if (state.integranteAdd) {
            state.integranteAdd[action.payload.name] = action.payload.value
        }
    },
    confirmarNovo: (state: IState) => {
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
    cancelarNovo: (state: IState) => {
        reset(state, true)
    },
}

export const reducers = {
    selecionarFamilia: familia.selecionar,
    alterarFamilia: familia.alterar,
    confirmarFamilia: familia.confirmar,
    cancelarFamilia: familia.cancelar,

    selecionarIntegrante: integrante.selecionar,
    editarIntegrante: integrante.editar,
    novoIntegrante: integrante.novo,
    alterarNovoIntegrante: integrante.alterarNovo,
    confirmarNovoIntegrante: integrante.confirmarNovo,
    cancelarNovoIntegrante: integrante.cancelarNovo
}

export const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.requestSuccess, (state, action) => {
        state.familia = action.payload
        reset(state, true)
    })
}
