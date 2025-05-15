import Image from "next/image";

export default function LoadingPage() {
  return (
    <div className="h-full flex justify-center items-center">
      <Image src="/loading.gif" alt="developer" width={320} height={320} />
    </div>
  );
}
