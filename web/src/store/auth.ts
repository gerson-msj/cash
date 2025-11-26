import { createAction, createSlice, type ActionReducerMapBuilder } from "@reduxjs/toolkit";
import type { IAuth } from "../domain/interfaces/IAuth";

interface state {
    auth?: IAuth
}

const name = 'auth'

const initialState: state = {}

const types = {
    incluir: `${name}/incluir`
}

const actions = {
    incluir: createAction<IAuth>(types.incluir)
}

const reducers = {
    remover: (state: state) => {
        if (state.auth)
            state.auth = undefined
    }
}

const extraReducers = (builder: ActionReducerMapBuilder<state>) => {
    builder.addCase(actions.incluir, (state, action) => {
        state.auth = action.payload
    })
}

const authSlice = createSlice({
    name,
    initialState,
    reducers,
    extraReducers
})

export const authReducer = authSlice.reducer

export const authActions = {
    incluir: actions.incluir,
    remover: authSlice.actions.remover
}
