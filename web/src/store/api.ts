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

const iniciar = () => {
    store?.dispatch(uiStateActions.iniciarEspera())
    store?.dispatch(uiStateActions.ocultarAviso())
}

const finalizar = <T extends {
    message: string,
    response: {
        data: {
            message: string
        }
    }
}>(error?: T) => {
    store?.dispatch(uiStateActions.encerrarEspera())
    if (error) {
        store?.dispatch(uiStateActions.exibirAviso({
            tipo: "ERRO",
            mensagem: error.response?.data?.message ?? error.message ?? error
        }))
    }
}

api.interceptors.request.use(
    config => {
        iniciar()
        return config
    }, error => {
        finalizar(error)
        return Promise.reject(error)
    }
)

api.interceptors.response.use(
    config => {
        finalizar()
        return config
    }, error => {
        finalizar(error)
        return Promise.reject(error)
    }
)

export default api