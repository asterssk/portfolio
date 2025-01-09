import { cn } from "@/lib/utils";
import { Facebook, Github, Mail } from "lucide-react";
import { Anton } from "next/font/google";
import Link from "next/link";

const headingFont = Anton({ weight: "400" });

export const metadata = { title: "Resume" };

export default function Page() {
  return (
    <section>
      <div
        className={cn("w-full bg-primary px-10 py-48", headingFont.className)}
      >
        <h1 className="text-9xl text-center">
          FULL-STACK
          <br />
          WEB DEVELOPER
        </h1>
      </div>

      <div className="container py-10 flex flex-col gap-10 px-6">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <p>I write code for the web.</p>
            <p>I also do mobile app development with flutter.</p>
            <p>Enthusiast.</p>
            <p>Professional.</p>
          </div>

          <div className="flex gap-6">
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
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Career Objective</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            molestiae, iste ratione delectus dolor veritatis officiis, incidunt
            nam modi explicabo dolorum numquam. Porro, quae? Illum quibusdam
            nobis perferendis reprehenderit corrupti sed velit consectetur
            laboriosam incidunt! Beatae, explicabo dolorem aliquam
            necessitatibus facilis consequatur nisi incidunt doloremque facere
            tempore. Natus, magni voluptatum!
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Work Experience</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            molestiae, iste ratione delectus dolor veritatis officiis, incidunt
            nam modi explicabo dolorum numquam. Porro, quae? Illum quibusdam
            nobis perferendis reprehenderit corrupti sed velit consectetur
            laboriosam incidunt! Beatae, explicabo dolorem aliquam
            necessitatibus facilis consequatur nisi incidunt doloremque facere
            tempore. Natus, magni voluptatum!
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Education</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            molestiae, iste ratione delectus dolor veritatis officiis, incidunt
            nam modi explicabo dolorum numquam. Porro, quae? Illum quibusdam
            nobis perferendis reprehenderit corrupti sed velit consectetur
            laboriosam incidunt! Beatae, explicabo dolorem aliquam
            necessitatibus facilis consequatur nisi incidunt doloremque facere
            tempore. Natus, magni voluptatum!
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold">Skills</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            molestiae, iste ratione delectus dolor veritatis officiis, incidunt
            nam modi explicabo dolorum numquam. Porro, quae? Illum quibusdam
            nobis perferendis reprehenderit corrupti sed velit consectetur
            laboriosam incidunt! Beatae, explicabo dolorem aliquam
            necessitatibus facilis consequatur nisi incidunt doloremque facere
            tempore. Natus, magni voluptatum!
          </p>
        </div>
      </div>
    </section>
  );
}
