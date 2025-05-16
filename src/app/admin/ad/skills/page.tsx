import { findAll } from "@/apis/skill";
import { ISkill } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { SkillAdminLayout } from "@/layouts/private/ad/skill/Skill";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function SkillPage({ searchParams }: IPropPage<ISkill>) {
  const resSkills = await findAll(handleSetDefaultQueries(searchParams));

  return (
    <SkillAdminLayout
      items={resSkills?.data?.items || []}
      totalItems={resSkills?.data?.totalItems || 0}
    />
  );
}
