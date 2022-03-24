import React, { useRef, useState, useCallback } from 'react';
import logo from './logo.svg';
import './App.css';
import ImageBox from './components/imageBox';
import { useDropzone } from 'react-dropzone';

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [imagaList, setImageList] = useState<string[]>([]);
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length) {
      for (const file of acceptedFiles) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = (event) => {
          setImageList((prev) => [...prev, event.target?.result as string]);
        };
      }
    }
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="container">
      <div className={'initial-box ' + (imagaList.length > 0 && 'row')}>
        {imagaList.length === 0 && (
          <div className="text-center">
            이미지가 없습니다.
            <br />
            이미지를 추가해주세요.
          </div>
        )}
        {imagaList.map((el, idx) => (
          <ImageBox key={el + idx} src={el} />
        ))}
        <div className="plus-box" {...getRootProps()}>
          <input type="file" ref={inputRef} {...getInputProps()} />+
        </div>
      </div>
    </div>
  );
}

export default App;
