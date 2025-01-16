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
  const machineKey = (await cookies()).get(machineIdCookieKey)?.value;

  const { data } = await (await sps())
    .from("messages")
    .select("message")
    .eq("id", machineKey)
    .limit(1)
    .single<{ message: string }>();

  return (
    <section className="flex-1 flex flex-col">
      <div className="container px-6 py-10 max-w-screen-lg space-y-20 flex-1">
        <div className="flex flex-col gap-9 justify-center max-w-xl mx-auto">
          <h1
            className="text-center font-extrabold"
            style={{ fontSize: "clamp(1.8rem, 9vw, 3.2rem)" }}
          >
            <span className="text-primary">Crafting Seamless</span>
            <br />
            <span>Digital Experiences</span>
          </h1>

          <p className="text-center text-sm sm:text-xl">
            From concept to deployment, I craft dynamic web experiences that
            combine aesthetic design, seamless functionality, and the latest in
            web development technology.
          </p>
        </div>

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
