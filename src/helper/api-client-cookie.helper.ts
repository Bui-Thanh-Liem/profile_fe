import { TResponse } from "@/interfaces/response.interface";
import useCustomerStore from "@/stores/useCustomerStore";
import useAuthStore from "@/stores/useUserStore";

interface IOptions {
  url: string;
  options: RequestInit;
}

export const callApiClientCookie = async <T>({
  url,
  options,
}: IOptions): Promise<TResponse<T>> => {
  const { logoutUser } = useAuthStore.getState();
  const { logoutCustomer } = useCustomerStore.getState();

  //
  let headers: HeadersInit = {
    ...options.headers,
  };

  // header
  if (!(options.body instanceof FormData)) {
    headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }

  // options
  const dataOptions: RequestInit = {
    ...options,
    headers,
    credentials: "include",
  };

  const response = await fetch(url, dataOptions);
  const result = await response.json();

  if (result.status == 403) {
    logoutUser();
    document.cookie = "token-user=; Max-Age=0; path=/";
    window.location.href = "/auth/login";
  }

  if (result.statusCode == 406) {
    logoutCustomer();
    document.cookie = "customer-user=; Max-Age=0; path=/";
    window.location.href = "/storage";
  }

  return result;
};
