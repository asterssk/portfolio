import { LoginForm, LogoutForm } from "./_login-form";
import { AppHeader } from "@/components/app-header";
import { Button } from "@/components/ui/button";
import { BlogTable } from "./_table";
import { sps } from "@/lib/supabase/server";

export const metadata = { title: "Admin" };

export default async function Page() {
  const supabase = await sps();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="flex-1 flex items-center max-w-sm mx-auto w-full">
        <LoginForm />
      </div>
    );
  }

  return (
    <div className={`container px-6 py-10 flex flex-col gap-8`}>
      <AppHeader title="WELCOME Master!">
        <LogoutForm />
      </AppHeader>

      <BlogTable
        data={[
          {
            id: "sadas",
            title: "Title",
            content:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic totam nemo debitis amet cupiditate aliquid alias aperiam modi quibusdam, iusto a, recusandae repellat, magni officia necessitatibus. Velit eveniet asperiores quo vitae molestiae doloribus voluptatibus tempora tenetur? Officia, nihil, inventore consectetur culpa at necessitatibus tenetur molestias repellat impedit optio nemo nostrum vitae placeat, cumque itaque? Eum.",
            created_at: new Date().toDateString(),
            type: "life",
          },
        ]}
      />
    </div>
  );
}
