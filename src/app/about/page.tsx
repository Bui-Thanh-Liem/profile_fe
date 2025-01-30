import ButtonPrimary from "@/components/ButtonPrimary";
import HighlighText from "@/components/HighlighText";
import Image from "next/image";
import mePng from "../../../public/me.png";
import { TbFileCv } from "react-icons/tb";

function AboutPage() {
  return (
    <main className="flex h-screen">
      <div className="m-auto w-[1200px] flex gap-16 justify-between items-center">
        <section className="flex-1 flex flex-col ">
          <h2 className="mb-4 text-lg font-bold text-foreground">Biography</h2>
          <p className="font-medium">
            Hi, I am <HighlighText text="Bui Thanh Liem" />, a website developer
            with 1 year of experience in front-end and back-end development. I
            graduated from Ho Chi Minh City College of Information Technology,
            majoring in Information Technology (Website Development).
          </p>
          <p className="font-medium my-4">
            Over the past year, I have gained practical experience in website
            development, including building responsive web applications, working
            with various frameworks, and managing projects from concept to
            deployment. My key skills include reading and interpreting technical
            documentation, analyzing and designing user-friendly interfaces, and
            handling data processing efficiently.
          </p>
          <p className="font-medium">
            I understand that continuous improvement is essential in this field.
            With my current experience, combined with my dedication,
            perseverance, and eagerness to learn, I am confident in my ability
            to grow and contribute effectively to any development team.
          </p>
          <a href="mailto:buithanhliem5073@gmail.com" className="mt-6 mb-2">
            <HighlighText text="Email: " />
            buithanhliem5073@gmail.com
          </a>
          <a href="tel:+84375255073" className="mb-2">
            <HighlighText text="Phone: " />
            +8437 5255 073
          </a>
          <p className="mb-2">
            <HighlighText text="Place: " />
            Huynh Tan Phat, District 7, Ho Chi Minh City.
          </p>
          <a href="/CV_BuiThanhLiem.pdf" target="_blank" download={true}>
            <ButtonPrimary
              size="large"
              icon={<TbFileCv />}
              className="mt-2"
            >
              Resume
            </ButtonPrimary>
          </a>
        </section>
        <div className="border-2 rounded-tl-[80px] rounded-br-[80px] border-solid border-primary shadow-xl shadow-primary overflow-hidden">
          <Image
            width={340}
            src={mePng}
            alt="LiemDev"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </main>
  );
}

export default AboutPage;
