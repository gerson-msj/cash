import { takeLatest } from "redux-saga/effects"
import { request } from "./config/config-saga"
import { actions, contexts, slice } from "./config/config-slice"

export const configReducer = slice.reducer

export const configActions = actions

export const configContexts = contexts

export function* configSaga() {
    yield takeLatest(configActions.request.type, request)
}