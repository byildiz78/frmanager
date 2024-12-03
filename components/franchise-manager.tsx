"use client"

import * as React from "react"
import {
  ChevronRight,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  Loader2,
  Menu,
  PackageOpen,
  Percent,
  ScrollText,
  Settings,
  ShieldCheck,
  Store,
  User,
  X,
  type LucideIcon,
} from "lucide-react"
import { GalleryVerticalEnd, AudioWaveform, Command, ChevronsUpDown, Plus, Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Add useIsMobile hook
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768) // Adjust the breakpoint as needed
    }

    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)

    return () => {
      window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  return isMobile
}

type Module = {
  name: string
  icon: LucideIcon
  subpages: string[]
  isActive?: boolean
  title?: string
}

const modules: Module[] = [
  {
    name: "Başvuru Yönetimi",
    icon: ClipboardList,
    subpages: ["Yeni Başvurular", "Değerlendirme", "Arşiv"],
    isActive: true,
    title: "Başvuru Yönetimi"
  },
  {
    name: "Sözleşme Yönetimi",
    icon: ScrollText,
    subpages: ["Aktif Sözleşmeler", "Yenileme", "Fesih İşlemleri"],
    isActive: false,
    title: "Sözleşme Yönetimi"
  },
  {
    name: "Franchise On Boarding",
    icon: User,
    subpages: ["Oryantasyon", "Eğitim Programı", "Doküman Yönetimi"],
    isActive: false,
    title: "Franchise On Boarding"
  },
  {
    name: "Açılış Yönetimi",
    icon: Store,
    subpages: ["Lokasyon Seçimi", "İnşaat Süreci", "Açılış Hazırlıkları"],
    isActive: false,
    title: "Açılış Yönetimi"
  },
  {
    name: "Kurum içi Eğitim",
    icon: GraduationCap,
    subpages: ["Eğitim Takvimi", "Online Kurslar", "Sertifikasyon"],
    isActive: false,
    title: "Kurum içi Eğitim"
  },
  {
    name: "Şube Denetim",
    icon: ShieldCheck,
    subpages: ["Denetim Planı", "Raporlar", "Düzeltici Faaliyetler"],
    isActive: false,
    title: "Şube Denetim"
  },
  {
    name: "Royalty Yönetim",
    icon: Percent,
    subpages: ["Ödeme Takibi", "Raporlama", "Fatura İşlemleri"],
    isActive: false,
    title: "Royalty Yönetim"
  },
  {
    name: "Tedarik Yönetim",
    icon: PackageOpen,
    subpages: ["Tedarikçiler", "Sipariş Yönetimi", "Stok Takibi"],
    isActive: false,
    title: "Tedarik Yönetim"
  },
]

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
}

type Tab = {
  id: string
  title: string
  content: React.ReactNode
}

export function FranchiseManagerComponent() {
  const isMobile = useIsMobile()
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])
  const [activeModule, setActiveModule] = React.useState<Module | null>(null)
  const [activeSubpage, setActiveSubpage] = React.useState<string | null>(null)
  const [openTabs, setOpenTabs] = React.useState<Tab[]>([])

  const handleTabOpen = (module: Module, subpage: string) => {
    const newTab: Tab = {
      id: `${module.name}-${subpage}`,
      title: subpage,
      content: <TabContent title={subpage} />
    }
    setOpenTabs(prev => [...prev, newTab])
    setActiveModule(module)
    setActiveSubpage(subpage)
  }

  const handleTabClose = (tabId: string) => {
    setOpenTabs(prev => prev.filter(tab => tab.id !== tabId))
    if (openTabs.length === 1) {
      setActiveModule(null)
      setActiveSubpage(null)
    }
  }

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" className="bg-gray-900">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="w-full justify-start gap-2 px-4 py-2 text-white hover:bg-gray-800"
                  >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-blue-500 text-white">
                      <activeTeam.logo className="size-4" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{activeTeam.name}</p>
                      <p className="text-xs text-gray-400">{activeTeam.plan}</p>
                    </div>
                    <ChevronsUpDown className="size-4 opacity-50" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="start"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={8}
                >
                  <DropdownMenuLabel>Teams</DropdownMenuLabel>
                  {data.teams.map((team, index) => (
                    <DropdownMenuItem key={team.name} onClick={() => setActiveTeam(team)}>
                      <div className="flex items-center gap-2">
                        <div className="flex size-6 items-center justify-center rounded-md border bg-gray-100">
                          <team.logo className="size-4" />
                        </div>
                        <span>{team.name}</span>
                      </div>
                      <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  ))}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Plus className="mr-2 size-4" />
                    Add team
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-4 py-2 text-xs font-semibold uppercase text-gray-400">
              Platform
            </SidebarGroupLabel>
            <SidebarMenu>
              {modules.map((item) => (
                <Collapsible key={item.title} defaultOpen={item.isActive}>
                  <SidebarMenuItem className="flex-col items-start px-2">
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton
                        className="w-full justify-between px-2 py-2 text-gray-300 hover:bg-gray-800 hover:text-white"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon && <item.icon className="size-5" />}
                          <span>{item.name}</span>
                        </div>
                        <ChevronRight className="size-4 opacity-50" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full">
                      <SidebarMenuSub>
                        {item.subpages?.map((subItem) => (
                          <SidebarMenuSubItem key={subItem}>
                            <SidebarMenuSubButton
                              asChild
                              className="pl-10 text-sm text-gray-400 hover:bg-gray-800 hover:text-white"
                            >
                              <a href="#" onClick={() => handleTabOpen(item, subItem)}>
                                {subItem}
                              </a>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="w-full justify-start gap-2 px-4 py-2 text-white hover:bg-gray-800"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage src={data.user.avatar} alt={data.user.name} />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="font-medium">{data.user.name}</p>
                      <p className="text-xs text-gray-400">{data.user.email}</p>
                    </div>
                    <ChevronsUpDown className="size-4 opacity-50" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  side={isMobile ? "bottom" : "right"}
                  sideOffset={8}
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarImage src={data.user.avatar} alt={data.user.name} />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{data.user.name}</p>
                        <p className="text-xs text-gray-500">{data.user.email}</p>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Sparkles className="mr-2 size-4 text-yellow-500" />
                    Upgrade to Pro
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <BadgeCheck className="mr-2 size-4 text-green-500" />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard className="mr-2 size-4 text-purple-500" />
                    Billing
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Bell className="mr-2 size-4 text-red-500" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 size-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
      <SidebarInset className="bg-gray-100">
        <main className="flex-1 overflow-y-auto">
          <header className="flex h-16 items-center justify-between bg-white px-6 shadow-md">
            <h1 className="text-2xl font-bold text-gray-800">Franchise Manager</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Menüyü Aç</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 p-0">
                <SheetHeader className="border-b p-4">
                  <SheetTitle>Franchise Manager</SheetTitle>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </header>

          <div className="p-6">
            {openTabs.length > 0 ? (
              <div>
                <div className="mb-4 flex space-x-2 overflow-x-auto">
                  {openTabs.map((tab) => (
                    <div key={tab.id} className="flex items-center rounded-t-lg bg-white px-4 py-2 shadow-md">
                      <span className="font-medium">{tab.title}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2 h-5 w-5 rounded-full p-0 hover:bg-gray-200"
                        onClick={() => handleTabClose(tab.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  {openTabs[openTabs.length - 1].content}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg bg-white p-6 shadow-lg">
                  <h2 className="mb-4 text-2xl font-semibold text-gray-800">Hoş Geldiniz</h2>
                  <p className="text-gray-600">
                    Franchise yönetim sisteminize hoş geldiniz. Başlamak için soldaki menüden bir modül seçin veya aşağıdaki genel bakış kartlarını inceleyin.
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {modules.map((module) => {
                    const counts = {
                      "Başvuru Yönetimi": 26,
                      "Sözleşme Yönetimi": 97,
                      "Franchise On Boarding": 15,
                      "Açılış Yönetimi": 8,
                      "Kurum içi Eğitim": 41,
                      "Şube Denetim": 88,
                      "Royalty Yönetim": 54,
                      "Tedarik Yönetim": 33
                    };
                    return (
                    <Card key={module.name} className="hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          {module.name}
                        </CardTitle>
                        <module.icon className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{counts[module.name as keyof typeof counts]}</div>
                        <p className="text-xs text-muted-foreground">
                          {module.subpages[0]}
                        </p>
                      </CardContent>
                    </Card>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function TabContent({ title }: { title: string }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">{title}</h2>
      {title === "Yeni Başvurular" && <SampleApplicationList />}
    </div>
  )
}

function SampleApplicationList() {
  const applications = [
    { id: 1, name: "Ahmet Yılmaz", date: "2024-03-15", status: "Beklemede" },
    { id: 2, name: "Ayşe Kaya", date: "2024-03-14", status: "İnceleniyor" },
    { id: 3, name: "Mehmet Demir", date: "2024-03-13", status: "Onaylandı" },
    { id: 4, name: "Fatma Şahin", date: "2024-03-12", status: "Reddedildi" },
    { id: 5, name: "Ali Öztürk", date: "2024-03-11", status: "Beklemede" },
  ]

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İsim</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tarih</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.date}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                  ${app.status === 'Onaylandı' ? 'bg-green-100 text-green-800' : 
                    app.status === 'Reddedildi' ? 'bg-red-100 text-red-800' : 
                    'bg-yellow-100 text-yellow-800'}`}>
                  {app.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}