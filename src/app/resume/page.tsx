import { cn } from "@/lib/utils";
import { Facebook, Github, Mail } from "lucide-react";
import { Anton } from "next/font/google";
import Link from "next/link";

const headingFont = Anton({ weight: "400", subsets: ["latin"] });

export const metadata = { title: "Resume" };

export default function Page() {
  return (
    <section>
      <div
        className={cn(
          "w-full bg-primary flex items-center justify-center p-4",
          headingFont.className
        )}
        style={{ height: "clamp(18rem, 35vw, 40rem)" }}
      >
        <h1
          className="text-center"
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
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <p>I write code for the web.</p>
              <p>I also do mobile app development with flutter.</p>
              <p>Enthusiast.</p>
              <p>Professional.</p>
            </div>

            <Education className="flex lg:hidden flex-col gap-2 " />

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Career Objective</h1>
              <p>
                I’m passionate about using technology to create meaningful
                digital experiences. My goal is to build user-friendly solutions
                that solve real problems, working with teams to turn ideas into
                practical, impactful results.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Work Experience</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                molestiae, iste ratione delectus dolor veritatis officiis,
                incidunt nam modi explicabo dolorum numquam. Porro, quae? Illum
                quibusdam nobis perferendis reprehenderit corrupti sed velit
                consectetur laboriosam incidunt! Beatae, explicabo dolorem
                aliquam necessitatibus facilis consequatur nisi incidunt
                doloremque facere tempore. Natus, magni voluptatum!
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-semibold">Tech & Skills</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
                molestiae, iste ratione delectus dolor veritatis officiis,
                incidunt nam modi explicabo dolorum numquam. Porro, quae? Illum
                quibusdam nobis perferendis reprehenderit corrupti sed velit
                consectetur laboriosam incidunt! Beatae, explicabo dolorem
                aliquam necessitatibus facilis consequatur nisi incidunt
                doloremque facere tempore. Natus, magni voluptatum!
              </p>
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
