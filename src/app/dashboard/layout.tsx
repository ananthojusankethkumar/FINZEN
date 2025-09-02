import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { MainNav, SettingsNav } from "@/components/finzen/nav";
import { FinzenLogo } from "@/components/finzen/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions";
import { auth } from "@/lib/firebase";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser;

  // This is a server component, but auth state is client-side.
  // A proper implementation would use a client component with useEffect to check auth state,
  // or a server-side session management solution.
  // For this prototype, we'll assume a user is logged in if they hit this page,
  // but a real app needs more robust protection.
  
  // A simple redirect if no user is found on the server (might not work as expected with client-side auth)
  // if (!user) {
  //   redirect('/login');
  // }


  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarContent className="flex flex-col">
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2">
              <FinzenLogo className="size-7 text-primary" />
              <span className="text-lg font-semibold tracking-tight">Finzen</span>
            </Link>
          </SidebarHeader>
          <div className="flex-grow">
            <MainNav />
          </div>
          <SidebarFooter>
            <SettingsNav />
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-16 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Can add breadcrumbs or page title here */}
          </div>
          <Button variant="ghost" size="icon">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://picsum.photos/100" alt="@shadcn" data-ai-hint="person avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action={logout} className="w-full">
                    <button type="submit" className="w-full text-left">Logout</button>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
