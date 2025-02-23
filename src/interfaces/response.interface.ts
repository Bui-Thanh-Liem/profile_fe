import { Abstract, InterfaceCommon } from "liemdev-profile-lib";

export type TResponse<T> = Abstract.ResponseError &
  Abstract.ResponseSuccess<InterfaceCommon.IResponseLogin<T>>;
