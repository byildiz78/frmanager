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
  X,
  type LucideIcon,
  Phone,
  Wallet,
  MapPin,
  Briefcase,
  Shield,
  Heart,
  Mail,
  Calendar,
  Building,
  Users,
  Brain,
  CheckSquare,
  DollarSign,
  Target,
  Clock,
  Award,
  UserCircle,
  GalleryVerticalEnd,
  AudioWaveform,
  Command,
  ChevronsUpDown,
  Plus,
  Sparkles,
  BadgeCheck,
  CreditCard,
  Bell,
  LogOut,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuGroup, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
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
    icon: UserCircle,
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

interface Tab {
  id: string
  title: string
  content: React.ReactNode
}

export function FranchiseManagerComponent() {
  const isMobile = useIsMobile()
  const [activeTeam, setActiveTeam] = React.useState(data.teams[0])
  const [activeModule, setActiveModule] = React.useState<Module | null>(null)
  const [activeSubpage, setActiveSubpage] = React.useState<string | null>(null)
  const [selectedTab, setSelectedTab] = React.useState<string>("basvurular")
  const [showNewApplicationForm, setShowNewApplicationForm] = React.useState(false)

  const tabs: Tab[] = [
    {
      id: "basvurular",
      title: "Başvurular",
      content: <SampleApplicationList onNewClick={() => setShowNewApplicationForm(true)} />
    },
    {
      id: "yeniBasvuru",
      title: "Yeni Başvuru",
      content: <ApplicationForm />
    }
  ]

  React.useEffect(() => {
    if (showNewApplicationForm) {
      setSelectedTab("yeniBasvuru")
    }
  }, [showNewApplicationForm])

  const handleTabOpen = (module: Module, subpage: string) => {
    const newTab: Tab = {
      id: `${module.name}-${subpage}`,
      title: subpage,
      content: <TabContent title={subpage} />
    }
    // setOpenTabs(prev => [...prev, newTab])
    setActiveModule(module)
    setActiveSubpage(subpage)
  }

  const handleTabClose = (tabId: string) => {
    // setOpenTabs(prev => prev.filter(tab => tab.id !== tabId))
    // if (openTabs.length === 1) {
    //   setActiveModule(null)
    //   setActiveSubpage(null)
    // }
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
            <div className="mb-4 flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <div key={tab.id} className="flex items-center rounded-t-lg bg-white px-4 py-2 shadow-md">
                  <span className="font-medium">{tab.title}</span>
                  {tab.id === selectedTab && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-2 h-5 w-5 rounded-full p-0 hover:bg-gray-200"
                      onClick={() => handleTabClose(tab.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <div className="rounded-lg bg-white p-6 shadow-lg">
              {tabs.find(tab => tab.id === selectedTab)?.content}
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}

function ApplicationForm() {
  return (
    <div className="container mx-auto py-6">
      <div className="grid gap-8">
        {/* Kişisel Bilgiler */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-blue-500">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center">
              <UserCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-blue-700">Kişisel Bilgiler</CardTitle>
              <CardDescription>Başvuru sahibinin temel bilgileri</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid gap-4 mt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="adSoyad">Ad Soyad</Label>
                <Input id="adSoyad" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tcKimlikNo">TC Kimlik No</Label>
                <Input id="tcKimlikNo" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dogumTarihi">Doğum Tarihi</Label>
                <Input id="dogumTarihi" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dogumYeri">Doğum Yeri</Label>
                <Input id="dogumYeri" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="medeniDurum">Medeni Durum</Label>
              <Input id="medeniDurum" />
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-2 gap-8">
          {/* İletişim Bilgileri */}
          <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-green-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-green-700">İletişim Bilgileri</CardTitle>
                <CardDescription>İletişim ve adres bilgileri</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="ikametAdresi">İkamet Adresi</Label>
                <Textarea id="ikametAdresi" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="telefonNo">Telefon No</Label>
                  <Input id="telefonNo" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emailAdresi">E-posta Adresi</Label>
                  <Input id="emailAdresi" type="email" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Mali Bilgiler */}
          <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-purple-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-purple-700">Mali Bilgiler</CardTitle>
                <CardDescription>Finansal durum ve yatırım bilgileri</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="toplamVarlikDegeri">Toplam Varlık Değeri</Label>
                  <Input id="toplamVarlikDegeri" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yatirimButcesi">Yatırım Bütçesi</Label>
                  <Input id="yatirimButcesi" type="number" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="aylikGelir">Aylık Gelir</Label>
                  <Input id="aylikGelir" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yillikGelir">Yıllık Gelir</Label>
                  <Input id="yillikGelir" type="number" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Lokasyon Bilgileri */}
          <Card className="bg-gradient-to-br from-orange-50 to-amber-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-orange-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-orange-700">Lokasyon Bilgileri</CardTitle>
                <CardDescription>Hedef lokasyon ve mekan bilgileri</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hedefSehir">Hedef Şehir</Label>
                  <Input id="hedefSehir" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hedefSemt">Hedef Semt</Label>
                  <Input id="hedefSemt" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="belirlenmisMekanVar" />
                  <Label htmlFor="belirlenmisMekanVar">Belirlenmiş Mekan Var</Label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mekanAlan">Alan (m²)</Label>
                  <Input id="mekanAlan" type="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="kiraBedeli">Kira Bedeli</Label>
                  <Input id="kiraBedeli" type="number" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* İşletme Planı */}
          <Card className="bg-gradient-to-br from-cyan-50 to-sky-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-cyan-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500 flex items-center justify-center">
                <Store className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-cyan-700">İşletme Planı</CardTitle>
                <CardDescription>İşletme ve personel planlaması</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="hedefAcilisTarihi">Hedef Açılış Tarihi</Label>
                <Input id="hedefAcilisTarihi" type="date" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="sahsenCalisma" />
                  <Label htmlFor="sahsenCalisma">İşletmede Şahsen Çalışma</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="planlananPersonelSayisi">Planlanan Personel Sayısı</Label>
                <Input id="planlananPersonelSayisi" type="number" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* Operasyonel Yetkinlikler */}
          <Card className="bg-gradient-to-br from-red-50 to-rose-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-red-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-red-500 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-red-700">Operasyonel Yetkinlikler</CardTitle>
                <CardDescription>Mesleki beceri ve tecrübeler</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 mt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bilgisayarKullanimiSeviye">Bilgisayar Kullanımı</Label>
                  <Input id="bilgisayarKullanimiSeviye" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muhasebeBilgisiSeviye">Muhasebe Bilgisi</Label>
                  <Input id="muhasebeBilgisiSeviye" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="personelYonetimiSeviye">Personel Yönetimi</Label>
                  <Input id="personelYonetimiSeviye" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pazarlamaSatisTecrube">Pazarlama ve Satış</Label>
                  <Input id="pazarlamaSatisTecrube" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kişisel Özellikler */}
          <Card className="bg-gradient-to-br from-teal-50 to-emerald-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-teal-500">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <CardTitle className="text-teal-700">Kişisel Özellikler</CardTitle>
                <CardDescription>Karakter ve yetkinlik özellikleri</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="girisimcilikGecmisi">Girişimcilik Geçmişi</Label>
                <Textarea id="girisimcilikGecmisi" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="riskAlmaEgilimi">Risk Alma Eğilimi</Label>
                  <Input id="riskAlmaEgilimi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="takimCalismasi">Takım Çalışması</Label>
                  <Input id="takimCalismasi" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="stresYonetimi">Stres Yönetimi</Label>
                  <Input id="stresYonetimi" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="iletisimBecerileri">İletişim Becerileri</Label>
                  <Input id="iletisimBecerileri" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Taahhütler */}
        <Card className="bg-gradient-to-br from-indigo-50 to-violet-50 shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-l-indigo-500">
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-indigo-700">Taahhütler</CardTitle>
              <CardDescription>Franchise anlaşması taahhütleri</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4 mt-2">
            <div className="space-y-6">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <Checkbox id="markaSadakati" className="border-2 border-indigo-200" />
                <Label htmlFor="markaSadakati" className="text-indigo-700 font-medium">Marka Sadakati</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <Checkbox id="gizlilikSozlesmesi" className="border-2 border-indigo-200" />
                <Label htmlFor="gizlilikSozlesmesi" className="text-indigo-700 font-medium">Gizlilik Sözleşmesi</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <Checkbox id="rekaberEtmeme" className="border-2 border-indigo-200" />
                <Label htmlFor="rekaberEtmeme" className="text-indigo-700 font-medium">Rekabet Etmeme</Label>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <Checkbox id="egitimKatilimi" className="border-2 border-indigo-200" />
                <Label htmlFor="egitimKatilimi" className="text-indigo-700 font-medium">Eğitim Katılımı</Label>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
                <Checkbox id="standartlaraUyum" className="border-2 border-indigo-200" />
                <Label htmlFor="standartlaraUyum" className="text-indigo-700 font-medium">Standartlara Uyum</Label>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SampleApplicationList({ onNewClick }: { onNewClick: () => void }) {
  const applications = [
    { id: 1, name: "Ahmet Yılmaz", date: "2024-03-15", status: "Beklemede" },
    { id: 2, name: "Ayşe Kaya", date: "2024-03-14", status: "İnceleniyor" },
    { id: 3, name: "Mehmet Demir", date: "2024-03-13", status: "Onaylandı" },
    { id: 4, name: "Fatma Şahin", date: "2024-03-12", status: "Reddedildi" },
    { id: 5, name: "Ali Öztürk", date: "2024-03-11", status: "Beklemede" },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Başvurular</h2>
        <Button onClick={onNewClick}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Başvuru Ekle
        </Button>
      </div>

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
    </div>
  )
}

function TabContent({ title }: { title: string }) {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">{title}</h2>
      {title === "Yeni Başvurular" && <SampleApplicationList onNewClick={() => {}} />}
    </div>
  )
}