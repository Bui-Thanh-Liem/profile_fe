import { CONSTANT_ROUTE } from "@/constants";
import { callApiServerCookie } from "@/helper/api-server-cookie.helper";
import { ISendMail } from "@/interfaces/model.interface";

export async function sendMailAdmin(
  payload: Pick<ISendMail, "subject" | "source" | "type">
) {
  const response = await callApiServerCookie<ISendMail>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.MAIL.ROOT}/${CONSTANT_ROUTE.MAIL.SEND_ADMIN}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}

export async function sendMailUser(payload: Partial<ISendMail>) {
  const response = await callApiServerCookie<ISendMail>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.MAIL.ROOT}/${CONSTANT_ROUTE.MAIL.SEND_USER}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}

export async function sendMailCustomer(payload: Partial<ISendMail>) {
  const response = await callApiServerCookie<ISendMail>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.MAIL.ROOT}/${CONSTANT_ROUTE.MAIL.SEND_CUSTOMER}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}

export async function sendMailBulk(payload: Partial<ISendMail>) {
  const response = await callApiServerCookie<ISendMail>({
    url: `${CONSTANT_ROUTE.V1_DOMAIN_DEV}/${CONSTANT_ROUTE.MAIL.ROOT}/${CONSTANT_ROUTE.MAIL.SEND_BULK}`,
    options: {
      method: "POST",
      body: JSON.stringify(payload),
    },
  });
  return response;
}
