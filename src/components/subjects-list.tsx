import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { useViewer } from "@/hooks/use-viewer";
import { Link } from "react-router-dom";

export function SubjectsList() {
  const { subjects } = useViewer();

  return (
    <div className="flex flex-col gap-4">
      <ItemGroup className="gap-4">
        {subjects.map((subject) => (
          <Link
            key={subject.title}
            to={`/subject/${encodeURIComponent(subject.title)}`}
          >
            <Item className="cursor-pointer" variant="muted">
              <ItemContent>
                <ItemHeader>
                  <ItemTitle>{subject.title}</ItemTitle>
                </ItemHeader>
                <ItemDescription>
                  {subject.files.length} documents
                </ItemDescription>
              </ItemContent>
            </Item>
          </Link>
        ))}
      </ItemGroup>
    </div>
  );
}