import { type LucideIcon } from "lucide-react";
import { BookOpen } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { type Subject } from "@/hooks/use-viewer";

export function NavMain({
  subjects,
  selectedSubject,
  onSelectSubject,
}: {
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSelectSubject: (subject: Subject) => void;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Subjects</SidebarGroupLabel>
      <SidebarMenu>
        {subjects.map((subject) => (
          <SidebarMenuItem key={subject.title}>
            <SidebarMenuButton
              onClick={() => onSelectSubject(subject)}
              tooltip={subject.title}
              data-selected={selectedSubject?.title === subject.title}
              className="data-[selected=true]:bg-accent"
            >
              <BookOpen />
              <span>{subject.title}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
