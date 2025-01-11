import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kBlogTypes } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowUpRightIcon, DotIcon, HelpCircleIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = { searchParams: Promise<{ filter?: string }> };

export const metadata = { title: "Blog" };

const blogs = [
  { title: "Title", id: "asdas1" },
  { title: "Title", id: "asdas2" },
  { title: "Title", id: "asdas3" },
  { title: "Title", id: "asdas4" },
  { title: "Title", id: "asdas5" },
];

export default async function Page({ searchParams }: Props) {
  const { filter = "all" } = await searchParams;

  return (
    <section>
      {/* FEATURE */}
      <div
        className="overflow-clip relative w-full"
        style={{ height: "clamp(18rem, 35vw, 40rem)" }}
      >
        {/* <div className="z-10 bg-red-500">asd</div> */}
        <Image src="/blog/smile.jpg" fill alt="blog" className="object-cover" />
      </div>

      <div className="container flex flex-col gap-10 py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_15rem] place-items-start gap-10">
          {/* CONTENT */}
          <div className="order-last lg:order-first flex flex-col gap-8">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="grid sm:grid-cols-[17rem_1fr] md:grid-cols-[20rem_1fr] gap-6"
              >
                <div className="aspect-video overflow-clip relative w-full rounded-lg">
                  <Image
                    src="/blog/smile.jpg"
                    fill
                    alt="blog"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between">
                    <h1 className="text-xl font-semibold">{blog.title}</h1>

                    <div className="flex gap-2">
                      <Badge>Badge</Badge>
                      <Badge>Badge</Badge>
                    </div>
                  </div>

                  <p className="line-clamp-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Obcaecati qui numquam quos eveniet odit mollitia perferendis
                    neque, officiis saepe facere hic vel perspiciatis sequi
                    earum officia! Suscipit natus assumenda atque facilis modi
                    odio! Consectetur, nesciunt cupiditate, corrupti doloremque
                    vel maxime sapiente dicta nam cumque labore impedit! Earum
                    eum ratione quas.
                  </p>

                  <div className="flex items-end justify-between mt-auto">
                    <p className="text-xs text-muted-foreground">Date posted</p>

                    <Link href={`/blog/${blog.id}`} passHref>
                      <Button size="fit" variant="transparent">
                        Read post
                        <ArrowUpRightIcon />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* FILTERS */}
          <div className="sticky top-14 flex lg:flex-col bg-background border-b lg:border-b-0 gap-4 lg:gap-3 w-full px-4 py-3 lg:py-6 overflow-auto">
            {["all", ...kBlogTypes].map((option) => {
              const isActive = option === filter;

              return (
                <Link
                  key={option}
                  href={`/blog?filter=${option}`}
                  scroll={false}
                  className={cn(
                    "text-[0.85rem] capitalize flex items-center",
                    isActive ? "text-primary" : ""
                  )}
                >
                  <DotIcon />
                  {option}
                </Link>
              );
            })}

            <Link
              href={`/blog/about`}
              scroll={false}
              className={cn("text-[0.85rem] flex items-center gap-2 px-2")}
            >
              <HelpCircleIcon className="size-3" />
              About this section
            </Link>
          </div>
        </div>

        <Button className="self-center">Load more</Button>
      </div>
    </section>
  );
}
