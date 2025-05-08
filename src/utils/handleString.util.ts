export function handleStringCookie(str: string) {
  const arr = str.split(",");
  const access = arr[0]?.trim();
  const refresh = arr[2]?.trim();

  const access_res = access?.split(";")[0]?.split("=");
  const refresh_res = refresh?.split(";")[0]?.split("=");

  return {
    access: access_res,
    refresh: refresh_res,
  };
}
