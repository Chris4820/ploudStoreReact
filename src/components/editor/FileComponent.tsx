import { useState } from "react";
import { FaCss3Alt } from "react-icons/fa";
import { IoLogoHtml5, IoLogoJavascript } from "react-icons/io";




// Ícones para os tipos de arquivos
const FileComponentIcons = {
    html: <IoLogoHtml5 size={16} className="mr-2 text-orange-500" />,
    js: <IoLogoJavascript size={16} className="mr-2 text-yellow-500" />,
    css: <FaCss3Alt size={16} className="mr-2 text-blue-500" />
  };
  
  
  type FileComponentProps = {
      name: string,
      type: 'html' | 'css' | 'js',
      isActive: boolean,
      handleSelectFile: (value: string) => void
  }
  // Componente para representar um arquivo
  export default function FileComponent({ name, type, isActive, handleSelectFile } : FileComponentProps) {

    return (
      <div className={`flex items-center cursor-pointer h-6 ${isActive && 'bg-muted'}`} onClick={() => handleSelectFile(name)}>
        {FileComponentIcons[type]}
        <div>{name}</div>
      </div>
    );
  };