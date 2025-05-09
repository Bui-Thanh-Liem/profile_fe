import { ContactMe } from "@/layouts/public/ContactMe";
import { ExperienceLayout } from "@/layouts/public/ExperienceLayout";

function ExperiencePage() {
  return (
    <section className="flex h-screen">
      <ExperienceLayout />
      <ContactMe />
    </section>
  );
}

export default ExperiencePage;
