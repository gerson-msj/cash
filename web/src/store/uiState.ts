import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type IAviso from "../domain/interfaces/IAviso"

const name = 'uiState'

interface state {
    aviso?: IAviso
    espera: boolean
}

const initialState: state = {
    aviso: undefined,
    espera: false
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
    encerrarEspera: slice.actions.encerrarEspera
}
