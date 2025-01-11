import { AppHeader } from "@/components/app-header";
import {
  CodeXmlIcon,
  GithubIcon,
  HammerIcon,
  PaintbrushIcon,
  ServerIcon,
  ShieldIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "About Blog" };

export default function Page() {
  return (
    <div className={`container max-w-3xl px-6 py-10 flex flex-col gap-10`}>
      <AppHeader title="About the blog section" backButton="/blog"></AppHeader>

      <section>
        <p className="leading-7 text-gray-700">
          The blog feature supports seamless content management with full{" "}
          <strong>CRUD operations</strong>—create, read, update, and delete.
          Built using modern web technologies, it ensures a dynamic and
          efficient way to handle posts and organize content effectively.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-bold">Key Features</h2>
        <ul className="space-y-4 mt-4">
          <li className="flex items-center gap-3">
            <ServerIcon className="size-4" />
            <span className="text-sm">Backend Integration</span>
          </li>
          <li className="flex items-center gap-3">
            <CodeXmlIcon className="size-4" />
            <span className="text-sm">API Integration</span>
          </li>
          <li className="flex items-center gap-3">
            <ShieldIcon className="size-4" />
            <span className="text-sm">Authentication</span>
          </li>
          <li className="flex items-center gap-3">
            <PaintbrushIcon className="size-4" />
            <span className="text-sm">Modern Web Design</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Tech Stack</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <li className="flex items-center gap-2">
            <HammerIcon className="size-4" />
            <span className="text-sm">NextJS</span>
          </li>
          <li className="flex items-center gap-2">
            <HammerIcon className="size-4" />
            <span className="text-sm">Supabase</span>
          </li>
          <li className="flex items-center gap-2">
            <HammerIcon className="size-4" />
            <span className="text-sm">ShadCN</span>
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-bold">Admin Page Preview</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          <li className="aspect-video relative w-full rounded-lg overflow-clip">
            <Image
              src="/placeholder.jpg"
              fill
              className="object-cover"
              alt="__placeholder"
            />
          </li>
          <li className="aspect-video relative w-full rounded-lg overflow-clip">
            <Image
              src="/placeholder.jpg"
              fill
              className="object-cover"
              alt="__placeholder"
            />
          </li>
          <li className="aspect-video relative w-full rounded-lg overflow-clip">
            <Image
              src="/placeholder.jpg"
              fill
              className="object-cover"
              alt="__placeholder"
            />
          </li>
        </ul>
      </section>

      <section className="self-end">
        <Link
          href="https://github.com/asterssk/portfolio"
          target="_blank"
          className="flex items-center gap-2"
        >
          <span className="text-xs">Check out this project on GitHub</span>
          <div className="bg-gray-700 rounded-full p-1">
            <GithubIcon className="text-white size-3" />
          </div>
        </Link>
      </section>
    </div>
  );
}
