"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Gauge,
  LayoutDashboard,
  Recycle,
  Settings,
  Sparkles,
  Wallet,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/dashboard/credit-score", icon: Gauge, label: "Credit Score" },
  { href: "/dashboard/tax-forecast", icon: Wallet, label: "Tax Forecast" },
  { href: "/dashboard/ripple-effect", icon: Recycle, label: "Ripple Effect" },
  { href: "/dashboard/reports", icon: FileText, label: "Reports" },
];

export function MainNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href}>
            <SidebarMenuButton
              isActive={pathname === item.href}
              tooltip={item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}

export function SettingsNav() {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Link href="#">
                    <SidebarMenuButton tooltip="Settings">
                        <Settings />
                        <span>Settings</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
