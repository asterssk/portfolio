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
import { Textarea } from "@/components/ui/textarea";
import { blogTypesExt, kBlogTypes } from "@/lib/constants";
import { blogSchema } from "@/utils/schema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "@/components/ui/multi-select";
import { useRef } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { getImageData } from "@/utils/helpers";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = { initialValue?: z.infer<typeof blogSchema> };

export function BlogForm({ initialValue }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: initialValue ?? { is_published: true },
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit((values) => {
          console.log("VALUES", values);
        })}
      >
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <div className="aspect-video sm:aspect-[8/3] rounded-md overflow-clip relative border">
              {field.value?.preview ? (
                <React.Fragment key="__image-selector">
                  <Image
                    src={field.value.preview}
                    fill
                    alt="preview"
                    className="object-cover"
                  />

                  <div className="transition-all inset-0 absolute flex items-center justify-center hover:backdrop-blur-sm bg-background/30 opacity-0 hover:opacity-100">
                    <Button
                      type="button"
                      className="rounded-full"
                      onClick={() => field.onChange(null)}
                    >
                      Clear
                    </Button>
                  </div>
                </React.Fragment>
              ) : (
                <div
                  key="__image-select-prompt"
                  onClick={() => fileRef.current?.click()}
                  className="transition-colors bg-slate-200 hover:bg-slate-200/70 dark:hover:bg-slate-900/90 dark:bg-slate-900 inset-0 absolute flex flex-col gap-3 items-center justify-center cursor-pointer"
                >
                  <ImageIcon className="size-10 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click here to select a file
                  </span>
                </div>
              )}

              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                placeholder="Select an image"
                className="sr-only"
                onChange={(event) => {
                  const { files, displayUrl } = getImageData(event);
                  field.onChange({ preview: displayUrl, file: files.item(0) });
                }}
              />
            </div>
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
        </div>

        <FormField
          control={form.control}
          name="categories"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categories</FormLabel>
              <FormControl>
                <MultiSelect
                  placeholder="Categories"
                  options={kBlogTypes.map((tt) => ({
                    value: tt,
                    label: blogTypesExt[tt].label,
                  }))}
                  value={field.value}
                  onValueChange={(values) => field.onChange(values)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter content" rows={5} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="self-end">
          SUBMIT
        </Button>
      </form>
    </Form>
  );
}
