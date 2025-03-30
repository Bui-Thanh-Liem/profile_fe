import { findAll } from "@/apis/skill";
import { ISkill } from "@/interfaces/model.interface";
import { IPropPage } from "@/interfaces/propsPage.interface";
import { SkillAdminLayout } from "@/layouts/private/skill/Skill";
import { handleSetDefaultQueries } from "@/utils/handleSetDefaultQueries";

export default async function SkillPage({ searchParams }: IPropPage<ISkill>) {
  const { limit, page } = handleSetDefaultQueries(searchParams);
  const resSkills = await findAll({ limit, page });

  return (
    <SkillAdminLayout
      items={resSkills?.data?.items || []}
      totalItems={resSkills?.data?.totalItems || 0}
    />
  );
}
