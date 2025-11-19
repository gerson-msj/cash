import type { Store } from "@reduxjs/toolkit";
import axios from "axios";
import type { RootState } from ".";
import { uiStateActions } from "./uiState";

let store: Store<RootState> | undefined
export const apiInjectStore = (_store: Store<RootState>) => {
    store = _store
}

const api = axios.create({
    baseURL: "/api"
})

api.interceptors.request.use(
    config => {
        // limpar avisos e iniciar espera
        store?.dispatch(uiStateActions.remover())
        return config
    }, error => {
        // remover espera e apresentar aviso de erro
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    config => {
        // remover espera
        return config
    }, error => {
        // remover espera e apresentar aviso de erro
        return Promise.reject(error)
    }
)

export default api