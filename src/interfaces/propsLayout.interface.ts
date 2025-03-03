/* eslint-disable @typescript-eslint/no-empty-object-type */
import { InterfaceCommon } from "liemdev-profile-lib";

export type IPropBaseLayout<T> = InterfaceCommon.IGetMulti<T>;

export interface IPropUserLayout<T> extends IPropBaseLayout<T> {}
