"use client";

import { ImageIcon } from "lucide-react";
import Image from "next/image";
import React from "react";
import { useRef } from "react";
import { Button } from "./button";
import { getImageData } from "@/utils/helpers";

type TValue = { preview: string; file: File | null };

type Props = {
  preview?: string | null;
  onChange: (value: TValue | null) => void;
};

export function ImageUploaderField({ preview, onChange }: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  return (
    <div className="aspect-video sm:aspect-8/3 rounded-md overflow-clip relative border">
      {preview ? (
        <React.Fragment key="__image-selector">
          <Image src={preview} fill alt="preview" className="object-cover" />

          <div className="transition-all inset-0 absolute flex items-center justify-center hover:backdrop-blur-xs bg-background/30 opacity-0 hover:opacity-100">
            <Button
              type="button"
              className="rounded-full"
              onClick={() => onChange(null)}
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
          onChange({ preview: displayUrl, file: files.item(0) });
        }}
      />
    </div>
  );
}
