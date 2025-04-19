import { useState, useEffect } from "react";

export default function useFetch<T>(url: string) {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    const controller = new AbortController(); // Tạo AbortController để hủy fetch

    const fetchData = async () => {
      setLoading(true); // Bắt đầu fetch, đặt loading = true
      setError(null); // Reset error

      try {
        const response = await fetch(url, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        if (error instanceof Error && error.name !== "AbortError") {
          setError(error); // Chỉ lưu lỗi nếu không phải AbortError
        }
      } finally {
        setLoading(false); // Kết thúc fetch, đặt loading = false
      }
    };

    fetchData();

    // Cleanup: Hủy fetch khi component unmount hoặc url thay đổi
    return () => {
      controller.abort();
    };
  }, [url]);

  return { loading, error, data };
}
