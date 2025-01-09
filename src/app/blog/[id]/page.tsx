import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const metadata = { title: "Blog" };

export default function Page() {
  return (
    <section>
      <div className="py-8 container flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <Link href="/blog" passHref>
            <Button variant="ghost" size="icon">
              <ArrowLeftIcon />
            </Button>
          </Link>

          <h1 className="text-2xl font-bold">Blog Title</h1>
        </div>

        <Image src="/blog/smile.jpg" width={200} height={200} alt="blog" />

        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          molestias aliquam, tempore consequuntur architecto exercitationem. At
          aut perspiciatis, ab eius voluptatibus doloremque. Tenetur molestiae
          aliquid facilis incidunt, expedita corporis. Repellendus, minus! At
          tempora nam autem minima rem quia odit cumque harum quod natus vitae
          officiis minus consequuntur dolores delectus veniam porro totam, sed
          eius? Eveniet, fuga. Quisquam quis odit quae facere asperiores eveniet
          quidem consectetur omnis impedit perspiciatis odio velit similique,
          repellat libero rem tempora error aliquam fuga! Maiores, quisquam
          eveniet sit labore nostrum neque quod inventore incidunt nisi deserunt
          aut adipisci, maxime officia. Alias hic cumque, nisi earum laboriosam
          accusantium ea quam consequuntur cupiditate vero facere voluptas eius
          delectus autem sint ipsam natus ipsa reiciendis dolorum ab aut
          blanditiis tempora sequi numquam. Nulla aliquam, doloremque quia
          itaque sed laboriosam eius numquam earum, error pariatur unde aperiam
          consequuntur veniam, neque ut fugit repellat eos cumque perferendis
          eum qui cum? Natus porro earum quasi culpa aliquid quod? Reprehenderit
          perspiciatis explicabo ullam aperiam harum qui temporibus quam maxime
          quibusdam ad earum nesciunt laborum iste neque laudantium, facere
          aspernatur. Laudantium adipisci provident quas eos fuga? Delectus
          animi, voluptates, explicabo consequatur, vero facere excepturi ex
          maiores accusantium sapiente ab! Repellendus, error expedita. Commodi,
          ex?
        </p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>content</p>
        <p>END</p>
      </div>
    </section>
  );
}
