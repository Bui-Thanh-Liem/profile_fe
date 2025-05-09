import { ContactMe } from "@/layouts/public/ContactMe";
import { EducationLayout } from "@/layouts/public/EducationLayout";

export default function EducationPage() {
  return (
    <section className="flex h-screen">
      <EducationLayout />
      <ContactMe />
    </section>
  );
}
