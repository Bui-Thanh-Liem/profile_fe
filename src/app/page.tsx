import ButtonPrimary from "@/components/ButtonPrimary";
import HighlighText from "@/components/HighlighText";
import meWebp from "../../public/meWebp.webp";
import Image from "next/image";
import Link from "next/link";
import { FaUserGraduate } from "react-icons/fa";
import EnterTextAnimated from "@/components/EnterTextAnimated";

export default function HomePage() {
  console.log("re-render");

  const classesImage =
    "relative col-span-3 w-[400px] p-6 rounded-tl-[80px] rounded-br-[80px] border-2 border-solid border-primary shadow-md shadow-primary";

  return (
    <section className="grid grid-cols-12 gap-16">
      <div className="col-span-7 flex flex-col gap-6">
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
      </div>
      <div className={classesImage}>
        <Image src={meWebp} alt="LiemDev" className={classesImage} />
      </div>
    </section>
  );
}
