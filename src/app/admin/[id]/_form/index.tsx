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
import { zodResolver } from "@hookform/resolvers/zod";
import { blogBucket, blogTypesExt, kBlogTypes } from "@/lib/constants";
import { blogSchema } from "@/utils/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { CalendarIcon, CheckCircleIcon, Loader2 } from "lucide-react";
import { uuid } from "@/utils/helpers";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { spc } from "@/lib/supabase/client";
import { ImageUploaderField } from "@/components/ui/image-uploader-field";
import { saveBlog } from "../_actions";
import { BlogContentEditor } from "./editor";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type Props = { initialValue?: z.infer<typeof blogSchema> };

export function BlogForm({ initialValue }: Props) {
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialValue ?? {
      title: "",
      is_published: true,
      content: "",
      categories: [],
    },
  });

  const handleUploadImage = async (file?: File) => {
    if (!file) return null;

    const fileName = file.name;
    const fileExt = fileName.slice(fileName.lastIndexOf(".") + 1);
    const path = `${uuid()}.${fileExt}`;

    const { data, error } = await spc()
      .storage.from(blogBucket)
      .upload(path, file);

    if (error) toast.error(error.message);

    if (!data) return null;
    return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${blogBucket}/${data.path}`;
  };

  const handleSubmit = async (values: z.infer<typeof blogSchema>) => {
    let imagePath: string | null = null;

    if (values.image) {
      imagePath = await handleUploadImage(values.image.file);
    }

    const error = await saveBlog(
      { ...values, image_path: imagePath },
      initialValue?.id
    );

    if (error) {
      toast.error(error);
    } else {
      toast.success("Blog successfully saved");
    }
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FormField
          name="image_path"
          control={form.control}
          render={({ field: { value: img, onChange } }) => (
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <ImageUploaderField
                  preview={field.value?.preview ?? img}
                  onChange={(value) => {
                    if (!value) onChange(null);
                    field.onChange(value);
                  }}
                />
              )}
            />
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_11rem] gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="is_published"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value ? "published" : "draft"}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a value" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categories"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Categories"
                      options={kBlogTypes.map((tt) => ({
                        value: tt,
                        label: blogTypesExt[tt].label,
                      }))}
                      defaultValue={field.value}
                      onValueChange={(values) => field.onChange(values)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="official_date"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col self-end">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full h-[2.55rem] text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={
                          field.value ? new Date(field.value) : undefined
                        }
                        onSelect={(date) =>
                          field.onChange(date?.toDateString())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <BlogContentEditor value={field.value} onChange={field.onChange} />
          )}
        />

        <Button
          type="submit"
          className="self-end"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            <CheckCircleIcon />
          )}
          SUBMIT
        </Button>
      </form>
    </Form>
  );
}
