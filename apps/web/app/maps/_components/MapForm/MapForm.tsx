'use client';

import { useState } from "react";

export const UploadForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [description, setDescription] = useState("");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;

    setFile(selectedFile);

    if (selectedFile && !fileName) setFileName(selectedFile.name);
  };

  const handleOpenExplorer = () => {
    const input = document.getElementById("fileInput");
    input?.click();
  };

  const handleFileNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", fileName);
    formData.append("description", description);

    const res = await fetch("https://localhost:4001/api/static/upload", {
      method: "POST",
      body: formData,
    });

    const result = await res.json();

    console.log("Uploaded:", result);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="File Name..."
        type="text"
        onChange={handleFileNameChange}
      />
      <textarea
        placeholder="File Description..."
        rows={3}
        onChange={handleDescriptionChange}
      />
      <input id="fileInput" hidden type="file" onChange={handleFileChange} />
      <button type="button" onClick={handleOpenExplorer}>
        Select a File
      </button>
      <button type="submit">Upload</button>
    </form>
  );
};
