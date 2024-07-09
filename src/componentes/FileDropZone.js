import React, { useCallback, useState } from 'react';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';

const FileDropzone = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    // Handle dropped files
    setSelectedFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div {...getRootProps()} style={{ marginBottom: '1rem' }}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here...</p>
        ) : (
          <p>Drag and drop files here, or click to select files</p>
        )}
      </div>
      {selectedFiles.length > 0 && (
        <div>
          <h4>Selected Files:</h4>
          {selectedFiles.map((file) => (
            <div key={file.name}>
              <p>{file.name}</p>
              <img src={URL.createObjectURL(file)} alt={file.name} style={{ maxWidth: '200px' }} />
            </div>
          ))}
        </div>
      )}
      <Button variant="contained" color="primary" disabled={selectedFiles.length === 0}>
        Upload
      </Button>
    </>
  );
};

export default FileDropzone;