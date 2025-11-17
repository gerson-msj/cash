import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type IAviso from "../../domain/interfaces/IAviso"

type AvisoType = {
    [ActionType: string]: IAviso
}

interface AvisoState {
    aviso: AvisoType
}

const initialState: AvisoState = {
    aviso: {}
}

const erroSlice = createSlice({
    name: "Erro",
    initialState,
    reducers: {
        ocultarAviso: (state: AvisoState, action: PayloadAction<string>) => {
            state.aviso = { ...state.aviso, }
        }
    }
})
