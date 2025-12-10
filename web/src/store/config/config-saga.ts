import type { AxiosResponse } from "axios"
import { call, getContext, put } from "redux-saga/effects"
import type IFamilia from "../../domain/entities/familia"
import type { ISagaContext } from "../../domain/sagaContext"
import { extraActions } from "./config-slice"

export function* request() {
    const { api }: ISagaContext = yield getContext('ctx')
    try {

        /* -- Exemplo yield all
        const effects = [
            call(api.get, '/config'),
            select((state: RootState) => state.auth.auth),
        ]
        // Tuplas tipadas [a, b]: [tipoA, tipoB]
        const [response, auth]: [AxiosResponse<IFamilia>, IAuth | undefined] = yield all(effects)
        */

        const response: AxiosResponse<IFamilia> = yield call(api.get, '/config')
        yield put(extraActions.requestSuccess(response.data))
    } catch (error) {
        console.error(error)
    }
}

