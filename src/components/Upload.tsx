import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';


const Upload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [text, setText] = useState<string>('');
    const [summary, setSummary] = useState<string>('');

    const onDrop = (acceptedFiles: File[]) => {
        setFile(acceptedFiles[0]);
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

    const uploadFile = async () => {
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('https://ka4ngtiaeg.execute-api.us-east-2.amazonaws.com/dev/Upload', formData, {
                headers: {
                    'Content-Type': 'multipart/fomr-data',
                },
            });
            setText(response.data.text);
            setSummary(response.data.summary);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <div {...getRootProps()} className="dropzone">
                <input {...getInputProps()} />
                {file ? <p>{file.name}</p> : <p>Drag 'n' drop a PDF file here, or click to select one.</p>}
            </div>
            <button onClick={uploadFile}>Upload</button>
            {text && <pre>{text}</pre>}
            {summary && <p>{summary}</p>}
        </div>
    );
};

export default Upload;