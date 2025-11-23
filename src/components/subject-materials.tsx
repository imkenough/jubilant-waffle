import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { useViewer } from "@/hooks/use-viewer";
import { useParams, Link } from "react-router-dom";

export function SubjectMaterials() {
  const { subjects } = useViewer();
  const { subjectTitle } = useParams<{ subjectTitle: string }>();

  const decodedSubjectTitle = subjectTitle ? decodeURIComponent(subjectTitle) : '';
  const subject = subjects.find((s) => s.title === decodedSubjectTitle);

  if (!subject) {
    return <div className="p-4">Subject not found.</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <ItemGroup className="gap-4">
        {subject.files.map((file) => (
          <Link
            key={file.path}
            to={`/subject/${encodeURIComponent(subject.title)}/${encodeURIComponent(file.name)}`}
          >
            <Item className="cursor-pointer" variant="muted">
              <ItemContent>
                <ItemHeader>
                  <ItemTitle>{file.name}</ItemTitle>
                </ItemHeader>
                <ItemDescription>
                  {file.path}
                </ItemDescription>
              </ItemContent>
            </Item>
          </Link>
        ))}
      </ItemGroup>
    </div>
  );
}