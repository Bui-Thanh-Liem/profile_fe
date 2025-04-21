import { IPropAuthor } from "@/interfaces/propsComponent.interface";
import { User2 } from "lucide-react";

export const Author = ({ date, user, detail = true }: IPropAuthor) => {
  const toDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat("sv-SE").format(
    new Date(toDate)
  );
  const formattedTime = toDate.toLocaleTimeString("en-GB");

  //
  return (
    <>
      <p>{user?.fullName || <User2 />}</p>
      <p>
        {formattedDate} {detail && formattedTime}
      </p>
    </>
  );
};
