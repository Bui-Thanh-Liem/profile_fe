import { ErrorValidateFromServer } from "@/interfaces/common.interface";
import { TResponse } from "@/interfaces/response.interface";
import { notification } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showToast = ({ statusCode, message }: TResponse<any>) => {
  const type =
    statusCode !== 200 ? (statusCode === 422 ? "warning" : "error") : "success";

  let mess = "";
  if (typeof message !== "string") {
    const errors = message as ErrorValidateFromServer[];
    for (const err of errors) {
      if (mess) break;
      console.log("error.error", err.error);
      mess = `"${err.field}" ${Object.entries(err.error)[0][1]}`; // lấy lỗi đầu tiên thôi
    }
  } else {
    mess = message;
  }

  notification[type]({
    message: type.toLocaleUpperCase(),
    description: mess,
  });
};

export const showToastByString = (str: string, status: "error" | "success") => {
  notification[status]({
    message: status.toLocaleUpperCase(),
    description: str,
  });
};
