import { Input } from "@/components/ui/input";
import Form from "next/form";
import { login } from "./actions";
import { LoginForm } from "./_login-form";

export const metadata = { title: "Admin" };

export default async function Page() {
  return (
    <section className="flex-1 flex items-center max-w-sm mx-auto w-full">
      <LoginForm />
    </section>
  );
}
