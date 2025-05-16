import { find } from "@/apis/about.api";
import { AboutAdminLayout } from "@/layouts/private/ad/about/About";

export default async function AboutPage() {
  const resAbout = await find();
  return <AboutAdminLayout item={resAbout?.data || []} />;
}
