import Editor from '@monaco-editor/react';


type CodeEditorProps = {
  currentPage: string,
}

export default function CodeEditor({ currentPage } : CodeEditorProps) {
  function getTypeFile() {
    const type = currentPage.split('.')[1];
    if(type === 'js') {
      return "javascript";
    }
    return type;
  }
  return (
    <>
      <Editor
        height="80vh"
        theme="vs-dark"
        path={currentPage}
        defaultLanguage={getTypeFile()}
        defaultValue={'<h1>Olaa'}
      />
    </>
  );
}