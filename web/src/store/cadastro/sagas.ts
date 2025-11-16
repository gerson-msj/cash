import { put, takeLatest } from "redux-saga/effects";
import { cadastroActions } from "./actions";

function* request(action: ReturnType<typeof cadastroActions.save>) {
    const result = action.payload
    yield put(cadastroActions.saveSuccess(result))
}

export default function* cadastroSaga() {
    yield takeLatest(cadastroActions.save.type, request);
}