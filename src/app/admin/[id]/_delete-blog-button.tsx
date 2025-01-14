"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, TrashIcon } from "lucide-react";
import { useTransition } from "react";
import { deleteBlog } from "./_actions";

type Props = { id?: string };

export function DeleteBlogButton({ id }: Props) {
  const [deleting, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteBlog(id);
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          disabled={deleting}
          size="sm"
          variant="destructive"
          className="rounded-lg"
        >
          {deleting ? <Loader2 className="animate-spin" /> : <TrashIcon />}
          Delete post
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you you want to delete this blog post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            current post.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
