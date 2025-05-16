import { Enums } from "liemdev-profile-lib";

export const generatorColor: Record<string, string> = {
  [Enums.EActions.VIEW]: "green",
  [Enums.EActions.CREATE]: "blue",
  [Enums.EActions.UPDATE]: "orange",
  [Enums.EActions.DELETE]: "red",
  [Enums.EActions.MANAGE]: "red",
};
