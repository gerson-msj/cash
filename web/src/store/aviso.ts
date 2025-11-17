import { createAction, createSlice } from "@reduxjs/toolkit"
import type IAviso from "../domain/interfaces/IAviso"

interface AvisoState {
    aviso?: IAviso
}

const initialState: AvisoState = {
    aviso: undefined
}

const avisoTypes = {
    incluir: 'aviso/incluir',
    remover: 'aviso/remover'
}

const actions = {
    incluir: createAction<IAviso>(avisoTypes.incluir)
}

export const avisoSlice = createSlice({
    name: "Aviso",
    initialState,
    reducers: {
        removerAviso: (state: AvisoState) => {
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

export const avisoActions = {
    remover: avisoSlice.actions.removerAviso,
    incluir: actions.incluir
}
