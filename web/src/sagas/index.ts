import { all } from "redux-saga/effects";
import cadastroSaga from "./cadastroSaga";

export default function* rootSaga() {
    yield all([
        cadastroSaga()
    ])
}