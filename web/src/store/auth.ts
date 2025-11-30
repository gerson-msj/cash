import { createAction, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { getContext, select, takeLatest } from "redux-saga/effects";
import type { RootState } from ".";
import type { IAuth } from "../domain/auth";
import type { ISagaContext } from "../domain/sagaContext";
import { freePaths } from "../routes/AppRoutes";

const name = 'auth'

interface state {
    auth?: IAuth
}

const initialState: state = {}

const reducers = {
    incluir: (state: state, action: PayloadAction<IAuth>) => {
        state.auth = action.payload
    },
    remover: (state: state) => {
        if (state.auth)
            state.auth = undefined
    }
}

const authSlice = createSlice({
    name,
    initialState,
    reducers
})

export const authReducer = authSlice.reducer

export const authActions = {
    incluir: authSlice.actions.incluir,
    remover: authSlice.actions.remover,
    verificar: createAction<string>(`${name}/verificar`)
}

function* verificar(action: ReturnType<typeof authActions.verificar>) {



    const pathname = action.payload

    const auth: IAuth | undefined = yield select((state: RootState) => state.auth.auth)

    if (freePaths.includes(pathname) || auth) return

    const { navigate, api }: ISagaContext = yield getContext('ctx')

    navigate('/')
    /**
     * Obter auth da api
     *  Se houver, armazenar na store auth
     *  Se não houver e não for path '/', retornar para '/'.
     */

}

export function* authSaga() {
    yield takeLatest(authActions.verificar.type, verificar)
}


