import { TResponse } from "@/interfaces/response.interface";
import useCustomerStore from "@/stores/useCustomerStore";
import useAuthStore from "@/stores/useUserStore";

interface IOptions {
  url: string;
  options: RequestInit;
}

export const callApiClientBearer = async <T>({
  url,
  options,
}: IOptions): Promise<TResponse<T>> => {
  //
  const { currentUser, logoutUser } = useAuthStore.getState();
  const { currentCustomer, logoutCustomer } = useCustomerStore.getState();

  //
  let headers: HeadersInit = {
    ...options.headers,
    authorization: `Bearer ${currentUser?.token.access_token}`,
    customer: `Bearer ${currentCustomer?.token.access_token}`,
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
    headers,
    ...options,
  };

  const response = await fetch(url, dataOptions);
  const result = await response.json();

  if (response.status == 403) {
    logoutUser();
    window.location.href = "/auth/login";
  }

  if (result.statusCode == 406) {
    logoutCustomer();
    window.location.href = "/storage";
  }

  return result;
};

//  { cache: "force-cache" }, next: { tags: ["products"] }  -> luôn lấy từ cache, nếu revalidateTag mới gọi api
//  { cache: "no-store" }                                   -> không lưu cache
//  { next: { revalidate: 60, tags: ["products"] } }        -> lấy từ cache theo mặc định, nếu revalidateTag mới gọi api
//  revalidateTag("products");                              -> dùng cho api update, create, delete

// XSRF-TOKEN => thường sử dụng khi không sử dụng jwt
// Server gửi cookie - client gửi cookie đính kèm và header XSRF-TOKEN
// Server lấy token từ cookie và header check

// Gửi token sameSite="none", nhưng cors cấu hình an toàn
// Gửi token sameSite="strict" , yêu cầu domain giống nhau

// Gửi token qua header authorization Bearer token
