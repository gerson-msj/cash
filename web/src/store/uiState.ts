import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type IAviso from "../domain/interfaces/IAviso"

const name = 'uiState'

type MsgBoxType = {
    [msgBoxKey: string]: boolean
}

interface state {
    aviso?: IAviso
    espera: boolean
    msgBox?: MsgBoxType
}

const initialState: state = {
    aviso: undefined,
    espera: false,
    msgBox: undefined
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
    exibirMsgBox: (state: state, action: PayloadAction<{ msgBoxKey: string }>) => {
        state.msgBox = { ...state.msgBox, [action.payload.msgBoxKey]: true }
    },
    ocultarMsgBox: (state: state) => {
        state.msgBox = undefined
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
}
