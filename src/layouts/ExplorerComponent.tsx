import { useEffect } from "react";
import FileComponent from "../components/editor/FileComponent";
import FolderComponent from "../components/editor/FoldersComponent";


type ExplorerComponentsProps = {
    handleSelectFile: (value: string) => void
    currentFile: string,
}

export default function ExplorerComponent({handleSelectFile, currentFile} : ExplorerComponentsProps) {
    useEffect(() => {
        console.log("A LAYOUTSLIDEMENU CARREGOU");
      }, []);
    return(
        <>
        <FolderComponent name="components">
            <FileComponent isActive={currentFile === "header.html"} name="header.html" type="html" handleSelectFile={(value) => handleSelectFile(value)}/>
            <FileComponent isActive={currentFile === "footer.html"} name="footer.html" type="html" handleSelectFile={(value) => handleSelectFile(value)}/>
        </FolderComponent>
        <FolderComponent name="pages">
            <FileComponent isActive={currentFile === "index.html"} name="index.html" type="html" handleSelectFile={(value) => handleSelectFile(value)}/>
            <FileComponent isActive={currentFile === "store.html"} name="store.html" type="html" handleSelectFile={(value) => handleSelectFile(value)}/>
        </FolderComponent>
        <FolderComponent name="styles">
            <FileComponent isActive={currentFile === "global.css"} name="global.css" type="css" handleSelectFile={(value) => handleSelectFile(value)}/>
        </FolderComponent>
        <FolderComponent name="assets">
            <FileComponent isActive={currentFile === "script.js"} name="script.js" type="js" handleSelectFile={(value) => handleSelectFile(value)}/>
        </FolderComponent>
        </>
    )
}