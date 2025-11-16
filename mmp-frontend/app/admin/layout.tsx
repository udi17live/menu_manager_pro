import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { MetaContextProvider } from "@/providers/MetaContextProvider";
import { Separator } from "@radix-ui/react-separator";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function AdminLayout({
  children,
  breadcrumb,
}: Readonly<{
  children: React.ReactNode;
  breadcrumb: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <MetaContextProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                {breadcrumb}
              </div>
            </header>
            <main className="flex flex-1 flex-col gap-4 p-4 pt-0">
              {children}
            </main>
            <Toaster position="top-center" richColors />
          </SidebarInset>
        </SidebarProvider>
      </MetaContextProvider>
    </SessionProvider>
  );
}
