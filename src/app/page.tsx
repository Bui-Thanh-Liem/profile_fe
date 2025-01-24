import ButtonPrimary from "@/components/ButtonPrimary";
import EnterTextAnimated from "@/components/EnterTextAnimated";
import HighlighText from "@/components/HighlighText";
import Image from "next/image";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import meWebp from "../../public/meWebp.webp";

export default function HomePage() {
  console.log("re-render");

  const classesImage =
    "relative col-span-3 w-[400px] h-[400px] p-6 rounded-tl-[80px] rounded-br-[80px] border-2 border-solid border-primary shadow-md shadow-primary";

  return (
    <main className="flex h-screen">
      <div className="m-auto w-[1200px] flex justify-between items-center">
        <section className="flex flex-col gap-6">
          <h1 className="text-5xl font-bold text-foreground">Hi There,</h1>
          <h1 className="text-5xl font-bold text-foreground">
            My name&apos;s <HighlighText text="Bui Thanh Liem" />
          </h1>
          <h1 className="text-2xl font-bold text-foreground">
            I&apos;m a{" "}
            <EnterTextAnimated
              texts={[
                "Software engineer___",
                "Front-end developer___",
                "Back-end developer___",
              ]}
            />
          </h1>

          <Link href="/about">
            <ButtonPrimary size="large" icon={<FaUserGraduate />}>
              About me
            </ButtonPrimary>
          </Link>
        </section>
        <div className={classesImage}>
          <Image src={meWebp} alt="LiemDev" className={classesImage} />
        </div>
      </div>
    </main>
  );
}
