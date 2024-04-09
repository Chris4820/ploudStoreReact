import { useState } from "react";
import { FcFolder } from "react-icons/fc";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";




type FolderComponentProps = {
    name: string,
    children: React.ReactNode
}
// Componente para representar uma pasta
export default function FolderComponent ({ name, children } : FolderComponentProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex items-center cursor-pointer h-6" onClick={toggleFolder}>
        {isOpen ? (
            <IoIosArrowDown size={16} className='mr-2'/>
        ) : (
            <IoIosArrowForward size={16} className='mr-2'/>
        )}
        <FcFolder className="mr-2 text-gray-500" />
        <div>{name}</div>
      </div>
      {isOpen && 
        <div className="ml-5">
          {children}
        </div>}
    </div>
  );
};
