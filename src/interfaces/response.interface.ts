import { Abstract } from "liemdev-profile-lib";

export type TResponse<T> = Abstract.ResponseError & Abstract.ResponseSuccess<T>;
