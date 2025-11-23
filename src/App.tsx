import React from "react";
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
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { SubjectsList } from "./components/subjects-list";
import { SubjectMaterials } from "./components/subject-materials";
import { FileViewer } from "./components/file-viewer";

const breadcrumbNameMap: { [key: string]: string } = {
  "subject": "Subject",
};

export default function Page() {
  const {
    selectedSubject,
    onSelectSubject,
    subjects,
    selectedFile,
  } = useViewer();

  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

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
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link to="/">Subjects</Link>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  {(() => {
                    const filteredPathnames = pathnames.filter(
                      (name) => name !== "subject"
                    );
                    return filteredPathnames.map((value, index) => {
                      const last = index === filteredPathnames.length - 1;
                      const to = `/subject/${filteredPathnames
                        .slice(0, index + 1)
                        .join("/")}`;
                      const name = decodeURIComponent(
                        breadcrumbNameMap[value] || value
                      );

                      return (
                        <React.Fragment key={to}>
                          <BreadcrumbItem>
                            {last ? (
                              <BreadcrumbPage>{name}</BreadcrumbPage>
                            ) : (
                              <BreadcrumbLink asChild>
                                <Link to={to}>{name}</Link>
                              </BreadcrumbLink>
                            )}
                          </BreadcrumbItem>
                          {!last && <BreadcrumbSeparator />}
                        </React.Fragment>
                      );
                    });
                  })()}
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
