import * as React from "react";
import { Bot, Settings2, SquareTerminal } from "lucide-react";

import { NavMain } from "@/components/layouts/NavMain";
import { NavUser } from "@/components/layouts/NavUsers";
import { TeamSwitcher } from "@/components/layouts/TeamSwitcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: Bot,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: SquareTerminal,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Settings2,
      plan: "Free",
    },
  ],
};

export function AppSidebar(props: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="font-roboto">
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
