import { IPropPage } from "@/interfaces/propPage.interface";

export default function ({ params }: IPropPage) {
  const slug = params?.slug;
  console.log("slug::: ", slug);

  return <main>Profile customer</main>;
}
