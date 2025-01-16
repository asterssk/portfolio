"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = { value: string; className?: string };

export function HtmlRenderer({ value, className }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    editorProps: { attributes: { class: className ?? "" } },
    content: value, // Set your HTML string here
    editable: false, // Make the content non-editable, if necessary
  });

  return <EditorContent editor={editor} />;
}
