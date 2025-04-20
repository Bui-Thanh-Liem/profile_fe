import { findAll } from "@/apis/skill";
import { ContactMe } from "@/layouts/public/ContactMe";
import { SkillLayout } from "@/layouts/public/Skill";

export default async function SkillPage() {
  const resSkill = await findAll({ page: "1", limit: "1e9" });
  return (
    <>
      <SkillLayout
        items={resSkill?.data?.items || []}
        totalItems={resSkill?.data?.totalItems || 0}
      />
      <ContactMe />
    </>
  );
}
