import { ValidateErrorEntity } from "rc-field-form/lib/interface";

export function customerMessageErrorAntd<T>(
  err: ValidateErrorEntity,
  fields: (keyof T)[]
): string[] {
  console.log("error validate form antd::", err);
  const errors = err.errorFields;
  return errors?.flatMap((err) => {
    return fields.includes(err.name[0] as keyof T) ? [...err.errors] : [];
  });
}
