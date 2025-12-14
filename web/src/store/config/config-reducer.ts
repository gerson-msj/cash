import type { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit"
import type ICategoria from "../../domain/entities/categoria"
import { CategoriaDefault } from "../../domain/entities/categoria"
import type IConta from "../../domain/entities/conta"
import { contaDefault } from "../../domain/entities/conta"
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
        // state.integrante = {
        //     ...state.familia.integrantes[0],
        //     idx: 0,
        //     ctx: contexts.Selecionar
        // }
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
        if (state.integrante)
            state.integrante.ctx = configContexts.Selecionar
    },
    excluir: (state: IState) => {
        if (!state.integrante) return
        if (!state.familia.integrantes) return

        const idx = state.integrante.idx!
        if (state.integrante.id !== undefined) {
            state.familia.integrantes[idx].remove = true
        } else {
            state.familia.integrantes.splice(idx, 1)
        }
        state.integrante = undefined
    }
}

const categoria = {
    criar: (state: IState) => {
        state.categoria = {
            ...CategoriaDefault,
            ctx: configContexts.Criar
        }
    },
    editar: (state: IState, action: PayloadAction<{ categoria: ICategoria, idx: number }>) => {
        state.categoria = {
            ...action.payload.categoria,
            idx: action.payload.idx,
            ctx: configContexts.Editar
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
    confirmar: (state: IState) => {
        if (!state.categoria) return
        if (!state.integrante) return
        if (!state.familia.integrantes) return

        if (!state.integrante.categorias) {
            state.integrante.categorias = []
        }

        const integranteIdx = state.integrante.idx!

        if (!state.familia.integrantes[integranteIdx].categorias) {
            state.familia.integrantes[integranteIdx].categorias = []
        }

        const categoria: ICategoria = {
            ...state.categoria,
            nome: state.categoria.nome.trim()
        }
        if (state.categoria.ctx === configContexts.Criar) {
            state.familia.integrantes[integranteIdx].categorias.push(categoria)
            state.integrante.categorias.push(categoria)
        } else if (state.categoria.ctx === configContexts.Editar) {
            const categoriaIdx = state.categoria.idx!
            state.familia.integrantes[integranteIdx].categorias[categoriaIdx] = categoria
            state.integrante.categorias[categoriaIdx] = categoria
        }

        state.categoria = undefined
    },
    cancelar: (state: IState) => {
        state.categoria = undefined
    },
    excluir: (state: IState) => {
        if (!state.categoria) return
        if (!state.integrante) return
        if (!state.integrante.categorias) return
        if (!state.familia.integrantes) return

        const integranteIdx = state.integrante.idx!
        const categoriaIdx = state.categoria.idx!

        if (!state.familia.integrantes[integranteIdx].categorias) return
        if (!state.integrante.categorias[categoriaIdx]) return

        if (state.integrante.id !== undefined) {
            state.familia.integrantes[integranteIdx].categorias[categoriaIdx].remove = true
            state.integrante.categorias[categoriaIdx].remove = true
        } else {
            state.familia.integrantes[integranteIdx].categorias.splice(categoriaIdx, 1)
            state.integrante.categorias.splice(categoriaIdx, 1)
        }

        state.categoria = undefined
    }
}

const conta = {
    criar: (state: IState) => {
        state.conta = {
            ...contaDefault,
            ctx: configContexts.Criar
        }
    },
    editar: (state: IState, action: PayloadAction<{ conta: IConta, idx: number }>) => {
        state.conta = {
            ...action.payload.conta,
            idx: action.payload.idx,
            ctx: configContexts.Editar
        }
    },
    alterar: <k extends keyof IConta>(
        state: IState,
        action: PayloadAction<{ name: k, value: IConta[k] }>
    ) => {
        if (state.conta) {
            state.conta[action.payload.name] = action.payload.value
        }
    },
    confirmar: (state: IState) => {
        if (!state.conta) return
        if (!state.integrante) return
        if (!state.familia.integrantes) return

        if (!state.integrante.contas) {
            state.integrante.contas = []
        }

        const integranteIdx = state.integrante.idx!

        if (!state.familia.integrantes[integranteIdx].contas) {
            state.familia.integrantes[integranteIdx].contas = []
        }

        const conta: IConta = {
            ...state.conta,
            nome: state.conta.nome.trim()
        }
        if (state.conta.ctx === configContexts.Criar) {
            state.familia.integrantes[integranteIdx].contas.push(conta)
            state.integrante.contas.push(conta)
        } else if (state.conta.ctx === configContexts.Editar) {
            const contaIdx = state.conta.idx!
            state.familia.integrantes[integranteIdx].contas[contaIdx] = conta
            state.integrante.contas[contaIdx] = conta
        }

        state.conta = undefined
    },
    cancelar: (state: IState) => {
        state.conta = undefined
    },
    excluir: (state: IState) => {
        if (!state.conta) return
        if (!state.integrante) return
        if (!state.familia.integrantes) return

        const integranteIdx = state.integrante.idx!
        const contaIdx = state.conta.idx!

        if (!state.familia.integrantes[integranteIdx].contas) return
        if (!state.integrante.contas) return

        if (state.conta.id !== undefined) {
            state.familia.integrantes[integranteIdx].contas[contaIdx].remove = true
            state.integrante.contas[contaIdx].remove = true
        } else {
            state.familia.integrantes[integranteIdx].contas.splice(contaIdx, 1)
            state.integrante.contas.splice(contaIdx, 1)
        }
        state.conta = undefined
    }
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
    excluirIntegrante: integrante.excluir,

    categoriaCriar: categoria.criar,
    categoriaEditar: categoria.editar,
    categoriaAlterar: categoria.alterar,
    categoriaConfirmar: categoria.confirmar,
    categoriaCancelar: categoria.cancelar,
    categoriaExcluir: categoria.excluir,

    contaCriar: conta.criar,
    contaEditar: conta.editar,
    contaAlterar: conta.alterar,
    contaConfirmar: conta.confirmar,
    contaCancelar: conta.cancelar,
    contaExcluir: conta.excluir,

}

export const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.requestSuccess, (state, action) => {
        state.familia = action.payload
        reset(state, true)
    })
}
