import { SubjectsView } from "@/components/subjects-view";
import { SubjectView } from "@/components/subject-view";
import { useViewer } from "@/hooks/use-viewer";

export function MainContent() {
  const {
    selectedFile,
    selectedSubject,
    onSelectFile,
    onSelectSubject,
    subjects,
  } = useViewer();

  const renderFilePreview = () => {
    if (!selectedFile) return null;

    const isPowerPoint =
      selectedFile.endsWith(".ppt") || selectedFile.endsWith(".pptx");

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
      <iframe src={selectedFile} className="h-full w-full rounded-xl" />
    );
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      {selectedFile ? (
        renderFilePreview()
      ) : selectedSubject ? (
        <SubjectView subject={selectedSubject} onSelectFile={onSelectFile} />
      ) : (
        <SubjectsView subjects={subjects} onSelectSubject={onSelectSubject} />
      )}
    </div>
  );
}
