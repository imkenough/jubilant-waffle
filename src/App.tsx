import { AppSidebar } from "@/components/app-sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SubjectView } from "@/components/subject-view";
import { SubjectsView } from "@/components/subjects-view";
import { useViewer } from "@/hooks/use-viewer";

export default function Page() {
  const {
    selectedFile,
    selectedSubject,
    onSelectFile,
    onSelectSubject,
    subjects,
  } = useViewer();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={onSelectSubject}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink
                      onClick={() => {
                        onSelectSubject(null)
                      }}
                      className="cursor-pointer"
                    >
                      Subjects
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {selectedSubject && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{selectedSubject.title}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                  {selectedFile && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{selectedFile.split('/').pop()}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {selectedFile ? (
              <iframe
                src={selectedFile}
                className="w-full h-[calc(100vh-10rem)] rounded-xl"
              />
            ) : selectedSubject ? (
              <SubjectView subject={selectedSubject} onSelectFile={onSelectFile} />
            ) : (
              <SubjectsView subjects={subjects} onSelectSubject={onSelectSubject} />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
