"use client";

import * as React from "react";
import {
  AudioWaveform,
  Command,
  GalleryVerticalEnd,
  Github,
  Globe,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { type Subject } from "@/hooks/use-viewer";
import { Button } from "./ui/button";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
};

export function AppSidebar({
  subjects,
  selectedSubject,
  onSelectSubject,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  subjects: Subject[];
  selectedSubject: Subject | null;
  onSelectSubject: (subject: Subject) => void;
}) {
  return (
    <Sidebar collapsible="icon" {...props}>
      {/* <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader> */}
      <SidebarContent>
        <NavMain
          subjects={subjects}
          selectedSubject={selectedSubject}
          onSelectSubject={onSelectSubject}
        />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/imkenough/jubilant-waffle"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" className="w-full justify-start">
              <Github />
              GitHub
            </Button>
          </a>
          <a
            href="https://drive.google.com/drive/u/2/folders/1Lt_K-qOXrnSn3dyhjV1CpN8gRrYR8ooe"
            target="_blank"
            rel="noreferrer"
          >
            <Button variant="outline" className="w-full justify-start">
              <Globe />
              Drive
            </Button>
          </a>
        </div>
        {/* <NavUser user={data.user} /> */}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
