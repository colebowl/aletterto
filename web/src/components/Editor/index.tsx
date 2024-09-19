import "./styles.scss";

import { FC, useEffect, useState } from "react";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, EditorEvents, useEditor } from "@tiptap/react";

const extensions = [
  Placeholder.configure({
    placeholder: "Write something …",
  }),
  Document,
  Paragraph.configure({
    HTMLAttributes: {
      class: "leading-5 text-lg line-heigh",
    },
  }),
  Text,
];

type Props = {
  initialContent: string;
  onUpdate?: (event: EditorEvents["update"]) => void;
};

export const Editor: FC<Props> = (props) => {
  const { initialContent, onUpdate } = props;
  const [initialized, setInitialized] = useState<boolean>(false);

  const editor = useEditor({
    autofocus: true,
    content: initialContent || undefined,
    extensions,
    onUpdate: onUpdate,
    editorProps: {
      attributes: {
        class: "min-h-screen",
      },
      transformPastedText(text) {
        return text.replace(/\xA0/g, " ");
      },
      transformPastedHTML(html) {
        return html.replace(/\xA0/g, " ");
      },
    },
  });

  useEffect(() => {
    if (editor && !initialized) {
      editor.commands.setContent(initialContent);
      setInitialized(true);
    }
  }, [initialized, editor, initialContent]);

  return <EditorContent editor={editor} />;
};
