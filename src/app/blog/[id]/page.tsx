import { AppHeader } from "@/components/app-header";
import { Badge } from "@/components/ui/badge";
import { sps } from "@/lib/supabase/server";
import { TBlog } from "@/utils/types";
import Image from "next/image";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  let title = "-";

  const supabase = await sps();
  const { data } = await supabase
    .from("blog")
    .select("title")
    .eq("id", id)
    .limit(1)
    .single();

  if (data) title = data.title;

  return { title: title };
}

export default async function Page({ params }: Props) {
  const supabase = await sps();
  const { id } = await params;

  const { data } = await supabase
    .from("blog")
    .select()
    .eq("id", id)
    .limit(1)
    .single<TBlog>();

  if (!data) notFound();

  return (
    <section>
      <div
        className="overflow-clip relative w-full"
        style={{ height: "clamp(18rem, 30vw, 35rem)" }}
      >
        <Image
          src={data.image_path ?? "/placeholder.jpg"}
          fill
          alt={data.title}
          priority
          placeholder="blur"
          // tsk
          blurDataURL={"/placeholder.jpg"}
          quality={80}
          className="object-cover"
        />
      </div>

      <div
        className={`container max-w-4xl px-6 py-10
    flex flex-col gap-6
    `}
      >
        <AppHeader backButton title={data.title}>
          <span className="text-sm">
            {new Intl.DateTimeFormat("en-PH", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date(data.created_at))}
          </span>
        </AppHeader>

        <div className="flex flex-wrap gap-2">
          {data.categories.map((cat) => (
            <Badge key={cat} className="capitalize">
              {cat}
            </Badge>
          ))}
        </div>

        <p>{data.content}</p>
      </div>
    </section>
  );
}
