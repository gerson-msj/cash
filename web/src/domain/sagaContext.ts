import type { AxiosInstance } from "axios";
import type { NavigateFunction } from "react-router";

export interface ISagaContext {
    navigate: NavigateFunction
    api: AxiosInstance
}