import * as React from "react";
import manifest from "@/material-manifest.json";

export type Subject = (typeof manifest)[0];

export function useViewer() {
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<string | null>(null);

  const onSelectSubject = (subject: Subject | null) => {
    setSelectedSubject(subject);
    setSelectedFile(null);
  };

  const onSelectFile = (file: string | null) => {
    setSelectedFile(file);
  };

  return {
    selectedSubject,
    selectedFile,
    onSelectSubject,
    onSelectFile,
    subjects: manifest,
  };
}
