import { TResponse } from "@/interfaces/response.interface";
import { notification } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = ({ statusCode, message }: TResponse<any>) => {
  const type = statusCode !== 200 ? "error" : "success";
  notification[type]({
    message: type.toLocaleUpperCase(),
    description: message,
  });
};
