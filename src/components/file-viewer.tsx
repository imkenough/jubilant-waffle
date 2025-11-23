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

    const isPowerPoint =
      file.name.endsWith(".ppt") || file.name.endsWith(".pptx");

    if (isPowerPoint) {
      return (
        <div className="bg-muted/50 flex h-full w-full flex-col items-center justify-center gap-4 rounded-xl p-4 text-center">
          <h3 className="text-xl font-bold">No preview available</h3>
          <p className="text-muted-foreground">
            Previews for PowerPoint files are not available in the local
            development environment. This feature will work correctly when the
            website is deployed to a public server.
          </p>
        </div>
      );
    }

    return (
      <iframe src={file.path} className="h-full w-full rounded-xl" />
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 h-full">
      {renderPreview()}
    </div>
  );
}