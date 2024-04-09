import { useState } from "react";
import CodeEditor from "../../components/codeEditor";
import EditorNavBarLayout from "../../layouts/dashboard/editorNavBar";
import ExplorerComponent from "../../layouts/ExplorerComponent";

export default function EditorPage() {
    const [currentFile, setCurrentFile] = useState('');
  
    return (
      <>
        <EditorNavBarLayout/>
        <section className="grid grid-cols-1 h-[calc(100vh-70px)] lg:grid-cols-[240px,1fr] 3xl:grid-cols-[270px,1fr] overflow-hidden">
          <div>
            <div className="border-r min-h-screen">
              <ExplorerComponent handleSelectFile={(value) => setCurrentFile(value)} currentFile={currentFile}/>
            </div>
          </div>
            <div className="mt-1">
            <CodeEditor currentPage={currentFile}/>
            </div>
        </section>
      </>
    )
  }
  