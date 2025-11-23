import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { type Subject } from "@/hooks/use-viewer";

export function SubjectView({
  subject,
  onSelectFile,
}: {
  subject: Subject;
  onSelectFile: (file: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4">
      <ItemGroup className="gap-4">
        {subject.files.map((file) => (
          <Item
            key={file.path}
            onClick={() => onSelectFile(file.path)}
            className="cursor-pointer"
            variant="muted"
          >
            <ItemContent>
              <ItemHeader>
                <ItemTitle>{file.name}</ItemTitle>
              </ItemHeader>
              <ItemDescription>
                {/* Here you could add more details about the file if available */}
                {file.path}
              </ItemDescription>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
}
