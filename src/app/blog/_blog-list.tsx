import { HtmlRenderer } from "@/components/html-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { sps } from "@/lib/supabase/server";
import { cn } from "@/lib/utils";
import { TBlog } from "@/utils/types";
import { format } from "date-fns";
import { ArrowUpRightIcon, Grid2x2X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = { filter: string };

export async function BlogList({ filter }: Props) {
  const supabase = await sps();
  let blogQry = supabase.from("blog").select().eq("is_published", true);

  if (filter !== "all") blogQry = blogQry.contains("categories", [filter]);

  const { data } = await blogQry
    .order("official_date", { ascending: false })
    .returns<TBlog[]>();

  return (
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
          className={cn(
            "grid sm:grid-cols-[17rem_1fr] md:grid-cols-[20rem_1fr] gap-6"
          )}
        >
          <div className="aspect-video overflow-clip relative w-full rounded-lg">
            <Image
              src={blog.image_path ?? "/placeholder.svg"}
              fill
              alt="blog"
              className="object-cover"
              //   placeholder="blur-sm"
              // tsk
              blurDataURL={"/placeholder.svg"}
              quality={75}
            />
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-1">
              <h1 className="text-xl font-semibold line-clamp-1">
                {blog.title}
              </h1>

              <div className="flex flex-wrap gap-2">
                {blog.categories.map((cat) => (
                  <Badge key={cat} className="capitalize">
                    {cat}
                  </Badge>
                ))}
              </div>
            </div>

            <HtmlRenderer
              value={blog.content}
              className="line-clamp-3 text-sm"
            />

            <div className="flex flex-wrap items-end justify-between mt-auto">
              <h5 className="text-xs text-muted-foreground">
                {format(blog.official_date, "PPP")}
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
  );
}

export function BlogListFallback() {
  return (
    <div className="order-last lg:order-first flex flex-col gap-8 w-full h-full">
      <div className="flex flex-col md:flex-row h-52 gap-4">
        <Skeleton className="hidden md:block w-80 h-full rounded-lg bg-gray-300/50 dark:bg-gray-800/30" />
        <Skeleton className="flex-1 h-full rounded-lg bg-gray-300/50 dark:bg-gray-800/30" />
      </div>

      <div className="flex flex-col md:flex-row h-52 gap-4">
        <Skeleton className="hidden md:block w-80 h-full rounded-lg bg-gray-300/50 dark:bg-gray-800/30" />
        <Skeleton className="flex-1 h-full rounded-lg bg-gray-300/50 dark:bg-gray-800/30" />
      </div>
    </div>
  );
}
