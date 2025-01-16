import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  CodeIcon,
  Heading1Icon,
  Heading2Icon,
  Heading3Icon,
  ItalicIcon,
  Link2OffIcon,
  LinkIcon,
  ListIcon,
  ListOrderedIcon,
  RedoIcon,
  StrikethroughIcon,
  UnderlineIcon,
  UndoIcon,
} from "lucide-react";
import { useCallback } from "react";

type Props = { editor: Editor | null };

export function EditorMenu({ editor }: Props) {
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) return;

    // empty
    if (!url) {
      return editor?.chain().focus().extendMarkRange("link").unsetLink().run();
    }

    // update link
    try {
      editor
        ?.chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } catch {}
  }, [editor]);

  if (!editor) return null;

  const firstLayer = [
    {
      icon: <Heading1Icon className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2Icon className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3Icon className="size-5" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <div className="font-bold">P</div>,
      onClick: () => editor.chain().focus().setParagraph().run(),
      isActive: editor.isActive("paragraph"),
    },
  ];

  const leftButtons = [
    {
      icon: <BoldIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <UnderlineIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleUnderline().run(),
      isActive: editor.isActive("underline"),
    },
    {
      icon: <ItalicIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
      disabled: !editor.can().chain().focus().toggleItalic().run(),
    },
    {
      icon: <StrikethroughIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
      disabled: !editor.can().chain().focus().toggleStrike().run(),
    },
    {
      icon: <CodeIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleCode().run(),
      isActive: editor.isActive("code"),
      disabled: !editor.can().chain().focus().toggleCode().run(),
    },
    {
      icon: <ListIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: <ListOrderedIcon className="size-5" />,
      onClick: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
      disabled: !editor.can().chain().focus().toggleOrderedList().run(),
    },
    {
      icon: editor.isActive("link") ? (
        <Link2OffIcon className="size-5" />
      ) : (
        <LinkIcon className="size-5" />
      ),
      onClick: editor.isActive("link")
        ? () => editor.chain().focus().unsetLink().run()
        : () => setLink(),
      isActive: editor.isActive("link"),
      disabled: false,
    },
  ];

  const rightButtons = [
    {
      icon: <UndoIcon className="size-5" />,
      onClick: () => editor.chain().focus().undo().run(),
      isActive: editor.isActive("undo"),
      disabled: !editor.can().chain().focus().undo().run(),
    },
    {
      icon: <RedoIcon className="size-5" />,
      onClick: () => editor.chain().focus().redo().run(),
      isActive: editor.isActive("redo"),
      disabled: !editor.can().chain().focus().redo().run(),
    },
  ];

  return (
    <div className="flex flex-col gap-2">
      <div className="flex space-x-2">
        {firstLayer.map(({ icon, onClick, isActive }, index) => {
          return (
            <Button
              key={index}
              size="icon"
              onClick={onClick}
              variant={isActive ? "secondary" : "outline"}
              className={isActive ? "border" : ""}
              type="button"
            >
              {icon}
            </Button>
          );
        })}
      </div>

      <div className="flex justify-between">
        <div className="flex space-x-2">
          {leftButtons.map(({ icon, onClick, isActive, disabled }, index) => {
            return (
              <Button
                key={index}
                size="icon"
                onClick={onClick}
                variant={isActive ? "default" : "outline"}
                disabled={disabled}
                type="button"
              >
                {icon}
              </Button>
            );
          })}
        </div>

        <div className="flex space-x-2">
          {rightButtons.map(({ icon, onClick, isActive, disabled }, index) => {
            return (
              <Button
                key={index}
                size="icon"
                onClick={onClick}
                variant={isActive ? "default" : "outline"}
                disabled={disabled}
                type="button"
              >
                {icon}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
