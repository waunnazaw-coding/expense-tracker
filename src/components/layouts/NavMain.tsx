import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Link } from "react-router-dom";

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {/* Home */}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Home">
            <SquareTerminal />
            <Link to="/">
              <span>Home</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Home */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Expenses">
                <PieChart />
                <span>ToDo-Tasks</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/todo-new">
                      <span>New Task</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/todo">
                      <span>All Tasks</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Dashboard */}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Dashboard">
            <Bot />
            <Link to="/dashboard">
              <span>Dashboard</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Expenses with collapsible subitems */}
        <Collapsible asChild defaultOpen={false} className="group/collapsible">
          <SidebarMenuItem>
            <CollapsibleTrigger asChild>
              <SidebarMenuButton tooltip="Expenses">
                <PieChart />
                <span>Expenses</span>
                <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/expenses">
                      <span>All Expenses</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
                <SidebarMenuSubItem>
                  <SidebarMenuSubButton asChild>
                    <Link to="/expenses/new">
                      <span>New Expense</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </SidebarMenuItem>
        </Collapsible>

        {/* Profile */}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Profile">
            <Map />
            <Link to="/profile">
              <span>Profile</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>

        {/* Settings */}
        <SidebarMenuItem>
          <SidebarMenuButton tooltip="Settings">
            <Settings2 />
            <Link to="/settings">
              <span>Settings</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
}

// Import icons explicitly here to avoid TS errors
import { Bot, Settings2, SquareTerminal, Map, PieChart } from "lucide-react";
