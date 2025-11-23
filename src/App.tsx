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
import { useViewer } from "@/hooks/use-viewer";
import { ModeToggle } from "@/components/mode-toggle";
import { Routes, Route, Link } from "react-router-dom";

// Import the new view components
import { SubjectsList } from "./components/subjects-list";
import { SubjectMaterials } from "./components/subject-materials";
import { FileViewer } from "./components/file-viewer";

export default function Page() {
  const {
    selectedSubject,
    onSelectSubject,
    subjects,
    selectedFile,
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
                    <BreadcrumbLink asChild>
                      <Link to="/" className="cursor-pointer">
                        Subjects
                      </Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {selectedSubject && (
                    <>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        {selectedFile ? (
                          <BreadcrumbLink asChild>
                            <Link
                              to={`/subject/${encodeURIComponent(
                                selectedSubject.title
                              )}`}
                              className="cursor-pointer"
                            >
                              {selectedSubject.title}
                            </Link>
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
            <Routes>
              <Route path="/" element={<SubjectsList />} />
              <Route
                path="/subject/:subjectTitle"
                element={<SubjectMaterials />}
              />
              <Route
                path="/subject/:subjectTitle/:fileName"
                element={<FileViewer />}
              />
            </Routes>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  );
}
