import { createAction, createSlice, type ActionReducerMapBuilder } from "@reduxjs/toolkit"
import { call, takeLatest } from "redux-saga/effects"

const name = 'movimento'

interface IState {
    movimentos: string[]
}

const initialState: IState = {
    movimentos: []
}

const actions = {
    save: createAction(`${name}/save`)
}

const extraActions = {
    saveSuccess: createAction<string[]>(`${name}/saveSuccess`)
}

const reducers = {}

const extraReducers = (builder: ActionReducerMapBuilder<IState>) => {
    builder.addCase(extraActions.saveSuccess, (state, action) => {
        state.movimentos = action.payload
    })
}

const slice = createSlice({
    name, initialState, reducers, extraReducers
})

export const movimentoReducer = slice.reducer

export const movimentoActions = {
    save: actions.save
}

function* save() {
    yield call(alert, 'saved')
}

export function* movimentoSaga() {
    yield takeLatest(actions.save.type, save)
}
