import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter
} from '@/components/ui/sidebar';
import { Home, LayoutDashboard, Boxes, ShoppingCart, Users, ScanLine, Bell } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

const AppLogo = ({ className }: { className?: string }) => (
    <svg
      className={className}
      viewBox="0 0 167 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.3333 0V44H0V0H12.3333Z" fill="currentColor" />
      <path d="M42.3333 0V44H30V0H42.3333Z" fill="currentColor" />
      <path d="M110.333 0V44H98V0H110.333Z" fill="currentColor" />
      <path d="M140.333 0V44H128V0H140.333Z" fill="currentColor" />
      <path d="M71.2053 28.5L56.5 44H43.5L62.848 23.056L44 0H57.5L71.0413 16.584L85 0H98L78.8947 23.336L98 44H85.5L71.2053 28.5Z" fill="currentColor" />
      <path d="M166.389 44H154.056L145.389 28.856V44H140.389V0H145.389V15.144L154.056 0H166.389L154.556 22L166.389 44Z" fill="currentColor"/>
    </svg>
  );

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full bg-muted/30">
        <Sidebar>
          <SidebarHeader>
            <Link href="/dashboard" className="flex items-center gap-2 p-2">
                <AppLogo className="text-primary h-8 w-auto"/>
                <h2 className="font-headline text-lg font-semibold text-foreground">Local Lane</h2>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Dashboard">
                  <Link href="/dashboard"><LayoutDashboard /><span>Dashboard</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Inventory">
                  <Link href="/inventory"><Boxes /><span>Inventory</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Orders">
                  <Link href="/orders"><ShoppingCart /><span>Orders</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Customers">
                  <Link href="/customers"><Users /><span>Customers</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Checkout">
                  <Link href="/checkout"><ScanLine /><span>Checkout</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="Notifications">
                  <Link href="/notifications"><Bell /><span>Notifications</span></Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild tooltip="Back to Site">
                        <Link href="/"><Home /><span>Back to Site</span></Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="flex-1">
              {/* Breadcrumbs or search can go here */}
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon" className="rounded-full">
                  <Avatar className='h-8 w-8'>
                    <AvatarImage src="https://picsum.photos/seed/admin/100/100" data-ai-hint="person face"/>
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Support</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 p-4 md:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
