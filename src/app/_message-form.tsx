"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, SendHorizontalIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { sendMessage } from "./_actions";
import { toast } from "sonner";

type Props = { mymsg?: string };

export function MessageForm({ mymsg }: Props) {
  const form = useForm<{ message: string }>({
    defaultValues: { message: mymsg ?? "" },
  });

  return (
    <Form {...form}>
      <form
        className="flex gap-4 mt-auto container px-6 py-8 max-w-screen-lg"
        onSubmit={form.handleSubmit(async (values) => {
          const error = await sendMessage(values.message);
          if (error) {
            toast.error(error);
          } else {
            toast.success(
              "Thank you for your feedback! I really appreciate it."
            );
          }
        })}
      >
        <FormField
          control={form.control}
          name="message"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem className="flex-1 ">
              <FormLabel>Send me a message</FormLabel>
              <FormControl>
                <Input
                  placeholder="Start typing..."
                  readOnly={Boolean(mymsg)}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="self-end mt-1"
          type="submit"
          disabled={form.formState.isSubmitting || Boolean(mymsg)}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : null}
          Send
          {form.formState.isSubmitting ? null : <SendHorizontalIcon />}
        </Button>
      </form>
    </Form>
  );
}
