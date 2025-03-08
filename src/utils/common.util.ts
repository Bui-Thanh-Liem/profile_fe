import { Enums } from "liemdev-profile-lib";

export const generatorColor: Record<string, string> = {
  [Enums.ERoleActions.VIEW]: "green",
  [Enums.ERoleActions.CREATE]: "blue",
  [Enums.ERoleActions.UPDATE]: "orange",
  [Enums.ERoleActions.DELETE]: "red",
};
