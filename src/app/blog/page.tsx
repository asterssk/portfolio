import { FeatureBlock } from "@/components/feature";
import { Button } from "@/components/ui/button";
import { kBlogTypes } from "@/lib/constants";
import { sps } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { TBlog } from "@/utils/types";
import { ArrowRightIcon, DotIcon, HelpCircleIcon } from "lucide-react";
import Link from "next/link";
import { BlogList, BlogListFallback } from "./_blog-list";
import { Suspense } from "react";

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
  const { filter } = await searchParams;

  const featured = await fetchFeaturedBlog();

  return (
    <section>
      <FeatureBlock image={featured?.image_path}>
        {featured ? (
          <div
            className={cn(
              "bg-background/50 absolute overflow-hidden",
              "left-0 right-0 md:left-auto md:top-0 bottom-0 md:w-1/2"
            )}
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
      </FeatureBlock>

      <div className="container flex flex-col gap-10 py-10 px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_15rem] place-items-start gap-10">
          {/* <BlogListFallback /> */}

          <Suspense fallback={<BlogListFallback />}>
            <BlogList filter={filter ?? "all"} />
          </Suspense>

          {/* FILTERS */}
          <div className="sticky top-14 flex lg:flex-col bg-background border-b lg:border-b-0 gap-4 lg:gap-3 w-full px-4 py-3 lg:py-6 overflow-auto">
            {["all", ...kBlogTypes].map((option) => {
              const isActive = option === filter;

              return (
                <Link
                  key={option}
                  href={{ pathname: "/blog", query: { filter: option } }}
                  replace
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

        {/* <Button className="self-center">Load more</Button> */}
      </div>
    </section>
  );
}
