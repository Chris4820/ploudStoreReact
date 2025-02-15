import { useRef, useCallback, forwardRef } from "react";
import ReactQuill, { type ReactQuillProps } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./editor.css"

interface EditorComponentProps extends ReactQuillProps {
  value?: string;
  onEditorChange?: (content: string) => void;
}

const EditorComponent = forwardRef<ReactQuill, EditorComponentProps>(({ value, onEditorChange, ...rest }, ref) => {
  const quillRef = useRef<ReactQuill | null>(null);

  const insertImage = useCallback(() => {
    const url = prompt("Enter the image URL");
    if (url && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();

      if (range) {
        // Adiciona a imagem na posição da seleção ou no final do editor
        editor.insertEmbed(range.index, "image", url);
        editor.setSelection(range.index + 1, 0); // Move a seleção após a imagem
      } else {
        // Se não houver seleção, insere a imagem no final
        editor.insertEmbed(editor.getLength(), "image", url);
      }
    }
  }, []);

  const insertLink = useCallback(() => {
    const url = prompt("Enter the URL");
    if (url && quillRef.current) {
      const editor = quillRef.current.getEditor();
      const range = editor.getSelection();
      if (range) {
        // Adiciona o link na posição da seleção ou no final do editor
        editor.formatText(range.index, range.length, "link", url);
        editor.setSelection(range.index + 1, 0); // Move a seleção após o link
      } else {
        // Se não houver seleção, insere o link no final
        editor.formatText(editor.getLength(), 0, "link", url);
      }
    }
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ header: '1' }, { header: '2' }],
        ['bold', 'italic', 'underline', 'blockquote'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link', 'image'],
      ],
      handlers: {
        image: insertImage,
        link: insertLink,
      },
    },
  };

  return (
    <ReactQuill
      ref={(instance) => {
        quillRef.current = instance;
        if (typeof ref === "function") {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      }}
      value={value}
      onChange={onEditorChange}
      modules={modules}
      formats={[
        "header",
        "bold",
        'blockquote',
        "italic",
        "underline",
        "list",
        "bullet",
        "link",
        "image"
      ]}
      {...rest}
    />
  );
});

EditorComponent.displayName = 'EditorComponent';

export default EditorComponent;
