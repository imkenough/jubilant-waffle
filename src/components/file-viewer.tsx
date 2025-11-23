import { useViewer } from "@/hooks/use-viewer";
import { useParams } from "react-router-dom";

export function FileViewer() {
  const { subjects } = useViewer();
  const { subjectTitle, fileName } = useParams<{
    subjectTitle: string;
    fileName: string;
  }>();

  const decodedSubjectTitle = subjectTitle ? decodeURIComponent(subjectTitle) : '';
  const decodedFileName = fileName ? decodeURIComponent(fileName) : '';

  const subject = subjects.find((s) => s.title === decodedSubjectTitle);
  const file = subject?.files.find((f) => f.name === decodedFileName);

  const renderPreview = () => {
    if (!file) {
      return <div className="p-4">File not found.</div>;
    }

    const isOfficeDoc =
      file.name.endsWith(".ppt") ||
      file.name.endsWith(".pptx") ||
      file.name.endsWith(".doc") ||
      file.name.endsWith(".docx") ||
      file.name.endsWith(".pdf");

    if (isOfficeDoc) {
      const viewerUrl = `https://docs.google.com/gview?url=${window.location.origin}${file.path}&embedded=true`;
      return <iframe src={viewerUrl} className="h-full w-full rounded-xl" />;
    }

    return <iframe src={file.path} className="h-full w-full rounded-xl" />;
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
      {renderPreview()}
    </div>
  );
}