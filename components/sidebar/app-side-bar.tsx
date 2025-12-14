"use client";
import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { TeamSwitcher } from "./team-swicher";
import { NavMain } from "./nav-main";
import { NavProjects } from "./nav-projects";
import { NavUser } from "./nav-user";
import {
  AppWindowMac,
  ArrowRightLeft,
  Building2,
  ChartNoAxesCombined,
  CircleDollarSign,
  Database,
  Settings,
  User,
} from "lucide-react";
// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "SIAD Conselheiro",
      logo: Building2,
      plan: "Empresa",
    },
    {
      name: "SIAD Aimores",
      logo: Building2,
      plan: "Empresa",
    },
    {
      name: "SIAD Mutum",
      logo: Building2,
      plan: "Empresa",
    },
    {
      name: "SIAD Carangola",
      logo: Building2,
      plan: "Empresa",
    },
    {
      name: "SIAD Colatina",
      logo: Building2,
      plan: "Empresa",
    },
    {
      name: "Todas",
      logo: Building2,
      plan: "Empresa",
    },
  ],
  navMain: [
    {
      title: "Clientes",
      url: "#",
      icon: User,
      isActive: false,
      items: [
        {
          title: "Empresas",
          url: "#",
        },
        {
          title: "Parceiros",
          url: "#",
        },
      ],
    },
    {
      title: "Financeiro",
      url: "#",
      icon: CircleDollarSign,
      items: [
        {
          title: "Cobranças",
          url: "#",
        },
        {
          title: "Controle interno",
          url: "#",
        },
        {
          title: "Gateway de pagamento",
          url: "#",
        },
      ],
    },
    {
      title: "Relatórios",
      url: "#",
      icon: ChartNoAxesCombined,
      items: [
        {
          title: "Clientes",
          url: "#",
        },

        {
          title: "Comissões",
          url: "#",
        },
        {
          title: "Controle interno",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Backup",
      url: "#",
      icon: Database,
    },
    {
      name: "Instaladores",
      url: "#",
      icon: AppWindowMac,
    },
    {
      name: "Migradores",
      url: "#",
      icon: ArrowRightLeft,
    },
    {
      name: "Configurações",
      url: "#",
      icon: Settings,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
