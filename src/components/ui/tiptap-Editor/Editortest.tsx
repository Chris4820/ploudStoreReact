import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import FontFamily from '@tiptap/extension-font-family';
import { FaBold, FaItalic, FaUnderline, FaLink, FaImage, FaAlignLeft, FaAlignCenter, FaAlignRight, FaAlignJustify, FaCode} from 'react-icons/fa';
import { FontSize } from './utils/tiptap';
import ImageResize from 'tiptap-extension-resize-image';
import LoadingComponent from '../../../containers/LoadingComponent';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../select';
import { CgFontHeight } from 'react-icons/cg';


interface PageEditorProps {
  content: string;
  onChange: (value: string) => void;
}


const PageEditor = ({ content, onChange } : PageEditorProps) => {

  const fontSizes = ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '48px', '64px'];

  const editor = useEditor({
    extensions: [
      StarterKit,
      ImageResize,
      FontSize, 
      Image.configure({
        inline: true,
        allowBase64: true,
      }),
      Link.configure({
        openOnClick: false,
        linkOnPaste: true,
      }),
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      TextStyle,
      Color,
      FontFamily,
    ],
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    content,
    autofocus: true,
  });

  if (!editor) {
    return <LoadingComponent/>
  }

  const insertImage = () => {
    const url = prompt('Digite a URL da imagem:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const insertLink = () => {
    const url = prompt('Digite a URL do link:');
    const text = prompt('Digite o texto do link:');
    if (url) {
      if (text && editor.view.state.selection.empty) {
        editor.chain().focus().insertContent(text).setLink({ href: url }).run();
      } else {
        editor.chain().focus().setLink({ href: url }).run();
      }
    }
  };

  return (
    <>
        <div className="bg-muted p-2 flex flex-wrap gap-2 border border-b-0 rounded-t-lg">
          <div className='flex gap-1 items-center'>
            <button 
              type='button'
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded ${editor.isActive('bold') ? 'bg-violet-600' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Negrito"
            >
              <FaBold />
            </button>
            <button 
              type='button'
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded ${editor.isActive('italic') ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Itálico"
            >
              <FaItalic />
            </button>
            <button
              type='button' 
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded ${editor.isActive('underline') ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Sublinhado"
            >
              <FaUnderline />
            </button>
          </div>

          <div className='flex gap-1 items-center'>
            <button
            type='button' 
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded ${editor.isActive({ textAlign: 'left' }) ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Alinhar à Esquerda"
            >
              <FaAlignLeft />
            </button>
            <button
            type='button' 
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded ${editor.isActive({ textAlign: 'center' }) ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Centralizar"
            >
              <FaAlignCenter />
            </button>
            <button
            type='button' 
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded ${editor.isActive({ textAlign: 'right' }) ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Alinhar à Direita"
            >
              <FaAlignRight />
            </button>
            <button
            type='button' 
              onClick={() => editor.chain().focus().setTextAlign('justify').run()}
              className={`p-2 rounded ${editor.isActive({ textAlign: 'justify' }) ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Justificar"
            >
              <FaAlignJustify />
            </button>
          </div>

          <div className='flex gap-1 items-center'>

            <Select
              onValueChange={(value) => editor.commands.setFontSize(value)}
              value={editor.getAttributes('textStyle').fontSize || '16px'}>

                <SelectTrigger  className="h-8 w-[120px]">
                  <div className="flex items-center gap-2">
                    <CgFontHeight className="h-4 w-4 opacity-50" />
                      <h1 className="text-muted-foreground">|</h1>
                    <SelectValue/>
                  </div>
                </SelectTrigger>
                <SelectContent>
                {fontSizes.map((size, index) => (
                    <SelectItem key={index} value={size}>{size}</SelectItem>
                ))}
                </SelectContent>
            </Select>
          </div>

          <div className='flex gap-1 items-center'>
            <button
            type='button' 
              onClick={insertLink}
              className={`p-2 rounded ${editor.isActive('link') ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Inserir Link"
            >
              <FaLink />
            </button>
            <button
            type='button' 
              onClick={insertImage}
              className="p-2 rounded bg-transparent hover:bg-violet-600/40"
              title="Inserir Imagem"
            >
              <FaImage />
            </button>
            <button
            type='button' 
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded ${editor.isActive('codeBlock') ? 'bg-violet-600 text-white' : 'bg-transparent'} hover:bg-violet-600/40`}
              title="Bloco de Código"
            >
              <FaCode />
            </button>
          </div>
        </div>

        <div className="max-h-[400px] overflow-y-auto bg-background p-2 border">
            <EditorContent editor={editor} />
          </div>
    </>
  );
};

export default PageEditor;
