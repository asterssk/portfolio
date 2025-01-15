import {
  ChevronsLeftRightEllipsisIcon,
  ListTodoIcon,
  PaletteIcon,
  TabletSmartphoneIcon,
} from "lucide-react";
import { cookies } from "next/headers";
import { MessageForm } from "./_message-form";
import { machineIdCookieKey } from "@/lib/constants";
import { sps } from "@/lib/supabase/server";

const works = [
  {
    icon: ChevronsLeftRightEllipsisIcon,
    title: "Web Development",
    description:
      "Crafting user-friendly and responsive websites with a focus on functionality, performance, and modern design. Proficient in building scalable web applications using frameworks like Next.js, ensuring seamless user experiences.",
  },
  {
    icon: PaletteIcon,
    title: "Digital Design",
    description:
      "Creating visually compelling designs that communicate ideas effectively. Specializing in branding, illustrations, and digital assets, with a keen eye for detail and a focus on delivering impactful visuals.",
  },
  {
    icon: TabletSmartphoneIcon,
    title: "Mobile App Development",
    description:
      "Designing and developing intuitive mobile applications that prioritize usability and performance. Skilled in creating scalable, cross-platform apps with modern features to deliver exceptional user experiences.",
  },
  {
    icon: ListTodoIcon,
    title: "Project Management",
    description:
      "Driving projects from concept to completion with effective planning, organization, and communication. Focused on delivering results by aligning teams, managing resources, and ensuring timely execution to achieve project goals.",
  },
];

export default async function Page() {
  const supabase = await sps();
  const cookieStore = await cookies();
  const machineKey = cookieStore.get(machineIdCookieKey)?.value;

  const { data } = await supabase
    .from("messages")
    .select("message")
    .eq("id", machineKey)
    .limit(1)
    .single<{ message: string }>();

  return (
    <section className="flex-1 flex flex-col">
      <div className="container px-6 py-10 max-w-screen-lg space-y-12 flex-1">
        <p className="text-center max-w-screen-md mx-auto">
          I&apos;m a developer with a passion for building user-friendly web and
          mobile apps. I specialize in Next.js, project management, and graphic
          design. I enjoy creating beautiful and functional products that make a
          difference.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {works.map((work, index) => (
            <div key={index} className="flex flex-col items-start gap-2">
              <div className="flex flex-col gap-2">
                {<work.icon className="size-5" />}{" "}
                <span className="border-b-primary border-b-2">
                  {work.title}
                </span>
              </div>

              <p className="text-sm text-muted-foreground">
                {work.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <MessageForm mymsg={data?.message} />
    </section>
  );
}
