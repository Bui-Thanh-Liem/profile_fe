import { findAll } from "@/apis/skill";
import { SkillAdminLayout } from "@/layouts/private/ad/skill/Skill";

export default async function SkillPage() {
  const resSkill = await findAll({ page: "1", limit: "1e9" });

  return (
    <SkillAdminLayout
      items={resSkill?.data?.items || []}
      totalItems={resSkill?.data?.totalItems || 0}
    />
  );
}
