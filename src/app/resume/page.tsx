import { Badge } from "@/components/ui/badge";
import { skillsTech, workExperiences } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Facebook, Github, Mail } from "lucide-react";
import { Anton } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const headingFont = Anton({ weight: "400", subsets: ["latin"] });

export const metadata = { title: "Resume" };

export default async function Page() {
  return (
    <section>
      <div
        className={cn(
          //   "bg-resumeBg bg-no-repeat bg-cover bg-top bg-fixed flex items-center justify-center",
          "relative flex items-center justify-center",
          headingFont.className
        )}
        style={{ height: "clamp(18rem, 35vw, 40rem)" }}
      >
        <Image
          src="/resume/rb_bg.jpg"
          fill
          alt="background"
          className="object-cover"
          priority
          placeholder="blur"
          // tsk
          blurDataURL="/resume/rb_bg.jpg"
          quality={80}
        />

        <h1
          className="text-center text-white dark:text-black drop-shadow-lg"
          style={{ fontSize: "clamp(3.5rem, 10vw, 7rem)" }}
        >
          FULL-STACK
          <br />
          WEB DEVELOPER
        </h1>
      </div>

      <div className="container flex flex-col gap-10 py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[20rem_1fr] place-items-start gap-10">
          {/* RIGHT */}
          <div className="sticky top-14 bg-background border-b lg:border-b-0 w-full flex flex-col gap-8 px-0 py-3 lg:py-6">
            <div className="flex justify-center lg:justify-start gap-6">
              <Link href="mailto:jamescoles0704@gmail.com" target="_blank">
                <Mail className="size-5" />
              </Link>

              <Link href="https://www.facebook.com/astrssk/" target="_blank">
                <Facebook className="size-5" />
              </Link>

              <Link href="https://github.com/asterssk" target="_blank">
                <Github className="size-5" />
              </Link>
            </div>

            <Education className="hidden lg:flex flex-col gap-2 " />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-2">
              <p>I write code for the web.</p>
              <p>I also do mobile app development with flutter.</p>
              <p>Enthusiast.</p>
              <p>Professional.</p>
            </div>

            <Education className="flex lg:hidden flex-col gap-2 " />

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold border-primary self-start border-b-2">
                Career Objective
              </h1>
              <p>
                To contribute to innovative and impactful projects by leveraging
                my full-stack web development expertise in creating
                user-centric, high-performing, and scalable web applications. I
                am eager to learn and grow within a dynamic environment,
                collaborating with cross-functional teams to deliver exceptional
                digital experiences.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold border-primary self-start border-b-2">
                Work Experience
              </h1>

              <div className="flex flex-col gap-6">
                {workExperiences.map((work, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="flex flex-col">
                      <h3 className="flex gap-3 font-semibold">
                        {work.position}
                        <span className="font-normal">{work.company}</span>
                      </h3>

                      <span className="text-muted-foreground text-sm">
                        {work.date_duration}
                      </span>
                    </div>

                    <ul className="list-disc ml-4 md:ml-10">
                      {work.contents.map((content, ii) => (
                        <li key={ii}>{content}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <h1 className="text-2xl font-semibold border-primary self-start border-b-2">
                Skills & Tech
              </h1>

              <div className="flex flex-col gap-6">
                {skillsTech.map((sk, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <h3 className="flex gap-3 font-semibold">{sk.title}</h3>

                    <div className="flex gap-3 flex-wrap">
                      {sk.items.map((item) => {
                        return <Badge key={item}>{item}</Badge>;
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <h1 className="text-2xl font-semibold">Education</h1>

      <div className="flex flex-col gap-2">
        <h2 className="font-semibold text-lg leading-none">
          Bachelor of Science in Computer Science
        </h2>
        <p className="text-sm">
          Eastern Samar State University
          <br />
          Salcedo, Eastern Samar
        </p>
      </div>
    </div>
  );
}
