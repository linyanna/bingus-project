import React, { ReactNode } from 'react';
import '../styles/styles.css'; 

interface FileContainerProps {
    children: ReactNode;
  }

  const FileContainer: React.FC<FileContainerProps> = ({ children }) => {
  return (
    <div className="container56">
      {children}
    </div>
  );
};

export default FileContainer;
