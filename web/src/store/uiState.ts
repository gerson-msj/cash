import { createAction, createSlice } from "@reduxjs/toolkit"
import type IAviso from "../domain/interfaces/IAviso"

interface state {
    aviso?: IAviso
    espera: boolean
}

const initialState: state = {
    aviso: undefined,
    espera: false
}

const types = {
    incluir: 'aviso/incluir',
    remover: 'aviso/remover'
}

const actions = {
    incluir: createAction<IAviso>(types.incluir)
}

export const uiStateSlice = createSlice({
    name: "UIState",
    initialState,
    reducers: {
        removerAviso: (state: state) => {
            if (state.aviso)
                state.aviso = undefined
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(actions.incluir, (state, action) => {
                state.aviso = action.payload
            })
    }
})

export const uiStateActions = {
    remover: uiStateSlice.actions.removerAviso,
    incluir: actions.incluir
}
