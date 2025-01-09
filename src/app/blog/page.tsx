import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Blog" };

const blogs = [
  { title: "Title", id: "asdas1" },
  { title: "Title", id: "asdas2" },
  { title: "Title", id: "asdas3" },
  { title: "Title", id: "asdas4" },
  { title: "Title", id: "asdas5" },
];

const blogFilters = ["All events", "Life", "Career", "Achievements"];

export default async function Page() {
  return (
    <section>
      <div className="container flex flex-col gap-10 py-8 px-6">
        <div className="aspect-[10/3] overflow-clip relative w-full rounded-lg">
          <Image
            src="/blog/smile.jpg"
            fill
            alt="blog"
            className="object-cover"
          />
        </div>

        <div className="flex items-start gap-10">
          <div className="flex flex-col gap-8 flex-1">
            {blogs.map((blog) => (
              <div key={blog.id} className="flex gap-6">
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

          <div className="sticky top-20 w-52 flex flex-col gap-3">
            {blogFilters.map((filter) => (
              <Link key={filter} href={`/blog?filter=${filter}`} scroll={false}>
                {filter}
              </Link>
            ))}
          </div>
        </div>

        <Button className="self-center">Load more</Button>
      </div>
    </section>
  );
}
