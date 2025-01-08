import ButtonPrimary from "@/components/ButtonPrimary";
import HighlighText from "@/components/HighlighText";
import Image from "next/image";
import mePng from "../../../public/me.png";
import { TbFileCv } from "react-icons/tb";

function AboutPage() {
  return (
    <section className="grid grid-cols-12 gap-16">
      <div className="col-span-7 flex flex-col ">
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
          With my current experience, combined with my dedication, perseverance,
          and eagerness to learn, I am confident in my ability to grow and
          contribute effectively to any development team.
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
            iconPosition="end"
            icon={<TbFileCv />}
            className="mt-2"
          >
            Resume
          </ButtonPrimary>
        </a>
      </div>
      <div
        className="relative col-span-3
                          w-[400px] p-6 rounded-tl-[80px] rounded-br-[80px] 
                          border-2 border-solid border-primary 
                          shadow-xl shadow-primary"
      >
        <Image
          src={mePng}
          alt="LiemDev"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </section>
  );
}

export default AboutPage;
