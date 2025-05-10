import useMediaQuery from "./useMediaQuery";

export function useBreakpoints() {
  // Mobile nhỏ (< 576px)
  const isMobileSmall = useMediaQuery("(max-width: 575.98px)");

  // Mobile lớn (576px - 767px)
  const isMobileLarge = useMediaQuery(
    "(min-width: 576px) and (max-width: 767.98px)"
  );

  // Tablet (768px - 991px)
  const isTablet = useMediaQuery(
    "(min-width: 768px) and (max-width: 991.98px)"
  );

  // Desktop nhỏ (992px - 1199px)
  const isDesktopSmall = useMediaQuery(
    "(min-width: 992px) and (max-width: 1199.98px)"
  );

  // Desktop tiêu chuẩn (1200px - 1439px)
  const isDesktop = useMediaQuery(
    "(min-width: 1200px) and (max-width: 1439.98px)"
  );

  // Desktop lớn (≥ 1440px)
  const isDesktopLarge = useMediaQuery("(min-width: 1440px)");

  // Trả về object để dễ sử dụng
  return {
    isMobileSmall,
    isMobileLarge,
    isTablet,
    isDesktopSmall,
    isDesktop,
    isDesktopLarge,
  };
}
