import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type IAviso from "../domain/aviso"

const name = 'uiState'

interface state {
    aviso?: IAviso
    espera: boolean
    msgBox?: Record<string, boolean>
    buttonConfirmDisabled: Record<string, boolean>
}

const initialState: state = {
    aviso: undefined,
    espera: false,
    msgBox: undefined,
    buttonConfirmDisabled: {}
}

const reducers = {
    exibirAviso: (state: state, action: PayloadAction<IAviso>) => {
        state.aviso = { ...action.payload, origem: action.type }
    },
    ocultarAviso: (state: state) => {
        if (state.aviso)
            state.aviso = undefined
    },
    iniciarEspera: (state: state) => {
        if (!state.espera)
            state.espera = true
    },
    encerrarEspera: (state: state) => {
        if (state.espera)
            state.espera = false
    },
    exibirMsgBox: (state: state, action: PayloadAction<{ componentKey?: string }>) => {
        state.msgBox = { ...state.msgBox, [action.payload.componentKey ?? 'default']: true }
    },
    ocultarMsgBox: (state: state) => {
        state.msgBox = undefined
    },
    buttonConfirmDisabled: (state: state, action: PayloadAction<{ componentKey?: string, disabled: boolean }>) => {
        const { componentKey, disabled } = action.payload
        const key = componentKey ?? 'default'
        // if (!disabled)
        //     delete state.buttonConfirmDisabled[key]
        // else
        state.buttonConfirmDisabled[key] = disabled
    }
}

const slice = createSlice({
    name,
    initialState,
    reducers
})

export const uiStateReducer = slice.reducer

export const uiStateActions = {
    exibirAviso: slice.actions.exibirAviso,
    ocultarAviso: slice.actions.ocultarAviso,
    iniciarEspera: slice.actions.iniciarEspera,
    encerrarEspera: slice.actions.encerrarEspera,
    exibirMsgBox: slice.actions.exibirMsgBox,
    ocultarMsgBox: slice.actions.ocultarMsgBox,
    buttonConfirmDisabled: slice.actions.buttonConfirmDisabled
}
