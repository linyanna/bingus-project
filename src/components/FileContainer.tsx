import React, { ReactNode } from 'react';
import '../styles/styles.css'; 
import { ModeToggle } from "./ui/mode-toggle";

interface FileContainerProps {
    children: ReactNode;
  }
  

  const FileContainer: React.FC<FileContainerProps> = ({ children }) => {
  return (
    <div className="container56">
      {children}
      <div className='mode-toggle'>
        <ModeToggle />
      </div>
    </div>
  );
};

export default FileContainer;
