import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { kBlogTypes } from "@/lib/constants";
import { sps } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { TBlog } from "@/utils/types";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  DotIcon,
  Grid2x2X,
  HelpCircleIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = { searchParams: Promise<{ filter?: string }> };

export const metadata = { title: "Blog" };

async function fetchFeaturedBlog() {
  const supabase = await sps();
  const { data } = await supabase
    .from("featured_blogs")
    .select("blog(*)")
    .order("created_at", { ascending: false })
    .limit(1)
    .single<{ blog: TBlog }>();
  return data?.blog;
}

export default async function Page({ searchParams }: Props) {
  const supabase = await sps();
  const { filter = "all" } = await searchParams;

  let blogQry = supabase.from("blog").select().eq("is_published", true);

  if (filter !== "all") blogQry = blogQry.contains("categories", [filter]);

  const { data } = await blogQry.returns<TBlog[]>();

  const featured = await fetchFeaturedBlog();

  return (
    <section>
      {/* FEATURE */}
      <div
        className="overflow-clip relative w-full"
        style={{ height: "clamp(18rem, 35vw, 40rem)" }}
      >
        <Image
          src={featured?.image_path ?? "/placeholder.jpg"}
          fill
          alt="featured"
          className="object-cover"
        />

        {featured ? (
          <div
            className={`bg-background/50 absolute overflow-hidden
      left-0 right-0 md:left-auto md:top-0 bottom-0 md:w-1/2`}
          >
            <div className="flex flex-col gap-3 sm:gap-4 md:gap-8 max-w-screen-sm px-4 py-3 md:px-8 md:py-12 md:h-full">
              <h1 className="text-xl md:text-2xl font-semibold leading-none">
                {featured.title.toUpperCase()}
              </h1>

              <div className="flex-grow relative overflow-hidden">
                <p className="text-ellipsis line-clamp-1 md:line-clamp-[12]">
                  {featured.content}
                </p>
              </div>

              <div className="flex flex-wrap justify-between">
                <h5 className="text-sm text-muted-foreground">
                  {new Intl.DateTimeFormat("en-PH", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(featured.created_at))}
                </h5>

                <Link href={`/blog/${featured.id}`} passHref>
                  <Button size="fit" variant="transparent">
                    Read more
                    <ArrowRightIcon />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      <div className="container flex flex-col gap-10 py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_15rem] place-items-start gap-10">
          {/* CONTENT */}
          <div className="order-last lg:order-first flex flex-col gap-8 w-full h-full">
            {!data || data.length < 1 ? (
              <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground py-6">
                <Grid2x2X />
                <span className="text-sm">No blog post at the moment.</span>
              </div>
            ) : null}

            {data?.map((blog) => (
              <div
                key={blog.id}
                className="grid sm:grid-cols-[17rem_1fr] md:grid-cols-[20rem_1fr] gap-6"
              >
                <div className="aspect-video overflow-clip relative w-full rounded-lg">
                  <Image
                    src={blog.image_path ?? "/placeholder.jpg"}
                    fill
                    alt="blog"
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <div className="flex flex-wrap items-start justify-between">
                    <h1 className="text-xl font-semibold">{blog.title}</h1>

                    <div className="flex flex-wrap gap-2">
                      {blog.categories.map((cat) => (
                        <Badge key={cat} className="capitalize">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="line-clamp-3">{blog.content}</p>

                  <div className="flex flex-wrap items-end justify-between mt-auto">
                    <h5 className="text-xs text-muted-foreground">
                      {new Intl.DateTimeFormat("en-PH", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      }).format(new Date(blog.created_at))}
                    </h5>

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
              className={cn(
                "text-[0.85rem] flex items-center gap-2 px-2 text-nowrap"
              )}
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
