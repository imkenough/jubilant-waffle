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
import { ModeToggle } from "@/components/mode-toggle"; // Added import

export default function Page() {
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
        <div className="bg-muted/50 flex h-[calc(100vh-10rem)] w-full flex-col items-center justify-center gap-4 rounded-xl p-4 text-center">
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
      <iframe
        src={selectedFile}
        className="h-[calc(100vh-10rem)] w-full rounded-xl"
      />
    );
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <SidebarProvider>
        <AppSidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={onSelectSubject}
        />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center justify-between px-4">
            <div className="flex items-center gap-2">
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
                        onSelectSubject(null);
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
                        {selectedFile ? (
                          <BreadcrumbLink
                            onClick={() => onSelectFile(null)}
                            className="cursor-pointer"
                          >
                            {selectedSubject.title}
                          </BreadcrumbLink>
                        ) : (
                          <BreadcrumbPage>
                            {selectedSubject.title}
                          </BreadcrumbPage>
                        )}
                      </BreadcrumbItem>
                    </>
                  )}
                  {selectedFile && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {selectedFile.split("/").pop()}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ModeToggle />
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {selectedFile ? (
              renderFilePreview()
            ) : selectedSubject ? (
              <SubjectView
                subject={selectedSubject}
                onSelectFile={onSelectFile}
              />
            ) : (
              <SubjectsView
                subjects={subjects}
                onSelectSubject={onSelectSubject}
              />
            )}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
