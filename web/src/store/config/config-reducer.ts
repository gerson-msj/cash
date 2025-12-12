import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import type ICategoria from "../../domain/entities/categoria"
import { CategoriaDefault } from "../../domain/entities/categoria"
import type IIntegrante from "../../domain/entities/integrante"
import { integranteDefault } from "../../domain/entities/integrante"
import { configContexts } from "../config"
import { contexts, extraActions, type IState } from "./config-slice"

/**
 * Limpa os estados de edição.
 * @param state IState.
 * @param selecionarIntegranteDefault Seleciona o integrante se houver somente um.
 */
const reset = (state: IState, selecionarIntegranteDefault: boolean = false) => {
    state.familiaEdit = undefined
    state.integrante = undefined

    if (state.familia.integrantes?.length === 1 && selecionarIntegranteDefault) {
        state.integrante = {
            ...state.familia.integrantes[0],
            idx: 0,
            ctx: contexts.Selecionar
        }
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
    selecionar: (state: IState, action: PayloadAction<{ integrante: IIntegrante, idx: number }>) => {
        reset(state)
        state.integrante = {
            ...action.payload.integrante,
            idx: action.payload.idx,
            ctx: contexts.Selecionar
        }
    },
    editar: (state: IState) => {
        if (state.integrante) {
            state.integrante.ctx = contexts.Editar
        }
    },
    novo: (state: IState) => {
        reset(state)
        state.integrante = {
            ...integranteDefault,
            ctx: contexts.Criar
        }
    },
    alterar: <k extends keyof IIntegrante>(
        state: IState,
        action: PayloadAction<{ name: k, value: IIntegrante[k] }>
    ) => {
        if (state.integrante) {
            state.integrante[action.payload.name] = action.payload.value
        }
    },
    confirmar: (state: IState) => {
        if (!state.integrante)
            return;

        if (!state.familia.integrantes) {
            state.familia.integrantes = []
        }

        const integrante: IIntegrante = {
            ...state.integrante,
            nome: state.integrante.nome.trim(),
            email: state.integrante.email.trim()
        }

        if (state.integrante.ctx === contexts.Criar) {
            const idx = state.familia.integrantes.push(integrante)
            state.integrante = {
                ...integrante,
                idx: idx - 1,
                ctx: contexts.Selecionar
            }
        } else if (state.integrante.ctx === contexts.Editar && state.integrante.idx !== undefined) {
            state.familia.integrantes[state.integrante.idx] = integrante
            state.integrante.ctx = contexts.Selecionar
        }
    },
    cancelar: (state: IState) => {
        reset(state, true)
    },
}

const categoria = {
    criar: (state: IState) => {
        state.categoria = {
            ...CategoriaDefault,
            ctx: configContexts.Criar
        }
    },
    alterar: <k extends keyof ICategoria>(
        state: IState,
        action: PayloadAction<{ name: k, value: ICategoria[k] }>
    ) => {
        if (state.categoria) {
            state.categoria[action.payload.name] = action.payload.value
        }
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
    alterarIntegrante: integrante.alterar,
    confirmarIntegrante: integrante.confirmar,
    cancelarIntegrante: integrante.cancelar,

    categoriaCriar: categoria.criar,
    categoriaAlterar: categoria.alterar,

}

export const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.requestSuccess, (state, action) => {
        state.familia = action.payload
        reset(state, true)
    })
}
