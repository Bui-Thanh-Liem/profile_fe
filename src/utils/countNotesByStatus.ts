import { INote } from "@/interfaces/model.interface";
import { Enums } from "liemdev-profile-lib";

type NoteStatusCount = {
  errCount: number;
  processingCount: number;
  warningCount: number;
  successCount: number;
};

export function countNotesByStatus(notes: INote[]): NoteStatusCount {
  return notes.reduce<NoteStatusCount>(
    (acc, note) => {
      switch (note.status) {
        case Enums.EStatus.ERROR:
          acc.errCount += 1;
          break;
        case Enums.EStatus.PROCESSING:
          acc.processingCount += 1;
          break;
        case Enums.EStatus.WARNING:
          acc.warningCount += 1;
          break;
        case Enums.EStatus.SUCCESS:
          acc.successCount += 1;
          break;
        default:
          break;
      }
      return acc;
    },
    { errCount: 0, processingCount: 0, warningCount: 0, successCount: 0 }
  );
}
