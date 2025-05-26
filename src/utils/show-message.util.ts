import { ErrorValidateFromServer } from "@/interfaces/common.interface";
import { TResponse } from "@/interfaces/response.interface";
import { message as messageANTD } from "antd";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const showMessage = ({ statusCode, message }: TResponse<any>) => {
  const type =
    statusCode !== 200 ? (statusCode === 422 ? "warning" : "error") : "success";
  const title = statusCode === 403 ? "forbidden" : type;

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

  messageANTD[type](`${mess} (${title})`);
};

export const showMessageByString = (
  str: string,
  status: "error" | "success" | "info"
) => {
  messageANTD[status](str);
};
