import * as React from "react";
import manifest from "@/material-manifest.json";
import { useParams, useNavigate } from "react-router-dom";

export type Subject = (typeof manifest)[0];

export function useViewer() {
  const { subjectTitle, fileName } = useParams<{
    subjectTitle: string;
    fileName: string;
  }>();
  const navigate = useNavigate();

  const decodedSubjectTitle = subjectTitle ? decodeURIComponent(subjectTitle) : '';
  const decodedFileName = fileName ? decodeURIComponent(fileName) : '';

  const selectedSubject = React.useMemo(() => {
    return manifest.find((s) => s.title === decodedSubjectTitle) || null;
  }, [decodedSubjectTitle]);

  const selectedFile = React.useMemo(() => {
    if (selectedSubject && decodedFileName) {
      const file = selectedSubject.files.find((f) => f.name === decodedFileName);
      return file ? file.path : null;
    }
    return null;
  }, [selectedSubject, decodedFileName]);

  const onSelectSubject = React.useCallback(
    (subject: Subject | null) => {
      if (subject) {
        navigate(`/subject/${encodeURIComponent(subject.title)}`);
      } else {
        navigate("/");
      }
    },
    [navigate]
  );

  const onSelectFile = React.useCallback(
    (file: string | null) => {
      if (file && selectedSubject) {
        const fileObj = selectedSubject.files.find(f => f.path === file);
        if (fileObj) {
            navigate(
              `/subject/${encodeURIComponent(
                selectedSubject.title
              )}/${encodeURIComponent(fileObj.name)}`
            );
        }
      } else if (selectedSubject) {
          navigate(`/subject/${encodeURIComponent(selectedSubject.title)}`);
      } else {
          navigate("/"); // Fallback to home if no subject is selected
      }
    },
    [navigate, selectedSubject]
  );

  return {
    selectedSubject,
    selectedFile,
    onSelectSubject,
    onSelectFile,
    subjects: manifest, // Directly expose manifest
  };
}
