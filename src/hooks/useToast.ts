import { TResponse } from "@/interfaces/response.interface";
import { notification } from "antd";

export const useToast = () => {
  const [api, contextHolder] = notification.useNotification();

  // const type = {
  //   success: "success",
  //   info: "info",
  //   warning: "warning",
  //   error: "error",
  // };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const showToast = ({ statusCode, message }: TResponse<any>) => {
    const type = statusCode !== 200 ? "error" : "success";
    api[type]({
      message: type.toLocaleUpperCase(),
      description: message,
    });
  };
  return { showToast, contextHolder };
};
