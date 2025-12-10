import { takeLatest } from "redux-saga/effects"
import { request } from "./config/config-saga"
import { actions, slice } from "./config/config-slice"

export const configReducer = slice.reducer

export const configActions = actions

export function* configSaga() {
    yield takeLatest(configActions.request.type, request)
}