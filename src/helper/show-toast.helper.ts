import { TResponse } from "@/interfaces/response.interface";
import { notification } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = ({ statusCode, message }: TResponse<any>) => {
  const type =
    statusCode !== 200 ? (statusCode === 422 ? "warning" : "error") : "success";

  //
  notification[type]({
    message: type.toLocaleUpperCase(),
    description: message,
  });
};

export const showToastByString = (str: string, status: "error" | "success") => {
  notification[status]({
    message: status.toLocaleUpperCase(),
    description: str,
  });
};
