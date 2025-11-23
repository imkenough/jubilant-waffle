import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { type Subject } from "@/hooks/use-viewer";

export function SubjectsView({
  subjects,
  onSelectSubject,
}: {
  subjects: Subject[];
  onSelectSubject: (subject: Subject) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ItemGroup className="gap-4">
        {subjects.map((subject) => (
          <Item
            key={subject.title}
            onClick={() => onSelectSubject(subject)}
            className="cursor-pointer"
            variant="muted"
          >
            <ItemContent>
              <ItemHeader>
                <ItemTitle>{subject.title}</ItemTitle>
              </ItemHeader>
              <ItemDescription>
                {subject.files.length} documents
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
