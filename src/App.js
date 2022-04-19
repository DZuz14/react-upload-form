import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleDragDrop = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleFiles = (fileList) => {
    setFiles((prevFiles) => [...prevFiles, ...Array.from(fileList)]);
  };

  const removeFile = (name) => {
    const newFiles = files.filter((file) => file.name !== name);
    setFiles(newFiles);
  };

  return (
    <div className="App">
      <div className="inner">
        <div className="list">
          <h5>Your files:</h5>

          <ul>
            {files.map((file, i) => (
              <li key={file.name}>
                {i + 1}. {file.name}
                <span onClick={() => removeFile(file.name)}>
                  <i className="fa fa-times" />
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="form"
          onDragEnter={handleDragDrop}
          onDragOver={handleDragDrop}
          onDrop={(e) => {
            handleDragDrop(e);
            handleFiles(e.dataTransfer.files);
          }}
        >
          <i className="fa fa-cloud-upload fa-4x"></i>
          <p>Drag and drop files or select files below.</p>

          <input
            ref={inputRef}
            type="file"
            multiple
            style={{ display: 'none' }}
            onChange={(e) => {
              e.preventDefault();
              handleFiles(e.target.files);
            }}
          />

          <br />

          <button onClick={handleClick}>Choose Files</button>
        </div>
      </div>
    </div>
  );
}

export default App;
