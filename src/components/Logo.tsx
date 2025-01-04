import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="p-2 bg-foreground text-background rounded-tl-[15px] rounded-br-[15px] text-lg font-bold "
    >
      .LiemDev
    </Link>
  );
};

export default Logo;
