import { ICustomer, IUser } from "@/interfaces/model.interface";

export type FieldTypeLoginCustomer = {
  fullName_email_phone?: string;
  password?: string;
  remember?: string;
};

export type FieldTypeRegisterCustomer = ICustomer & {
  passwordConfirm?: string;
};

export type FieldTypeOTPCustomer = {
  otp?: string;
};

export type FieldTypeLoginUser = IUser & {
  remember?: boolean;
};

export type FieldTypeForgotPasswordUser = IUser;

export type FieldTypeOtp = {
  otp: string;
};

export type FieldTypeResetPassword = {
  password: string;
  passwordConfirm: string;
};
