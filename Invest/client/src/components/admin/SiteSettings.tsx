import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Settings,
  Save,
  CircleSlash,
  Laptop,
  Smartphone,
  Globe,
  Palette,
  FileImage,
  Languages,
  Award,
  MessageSquare,
  Mail,
  CreditCard,
  ShieldCheck,
  LockKeyholeIcon,
  Database,
  RefreshCw,
  Trash,
  FileUp,
  HelpCircle,
  Info,
  DollarSign,
  Percent,
  MailCheck,
  Users,
  Clock,
  CloudUpload
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Пример данных настроек сайта
const siteSettingsData = {
  general: {
    siteName: "Financial Fortress",
    siteDescription: "Платформа для инвестиций и управления финансами",
    siteEmail: "info@financialfortress.com",
    supportEmail: "support@financialfortress.com",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    metaKeywords: "инвестиции, финансы, доходность, депозиты, капитал",
    phoneNumber: "+7 (800) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 123",
    socialLinks: {
      facebook: "https://facebook.com/financialfortress",
      twitter: "https://twitter.com/financialfortress",
      instagram: "https://instagram.com/financialfortress",
      telegram: "https://t.me/financialfortress"
    },
    copyrightText: "© 2025 Financial Fortress. Все права защищены."
  },
  appearance: {
    theme: "light",
    primaryColor: "#4f46e5",
    secondaryColor: "#10b981",
    fontFamily: "Inter",
    enableDarkMode: true,
    customCss: "",
    homePageLayout: "modern",
    borderRadius: "medium", // small, medium, large
    animations: true,
    displayLanguageSwitcher: true,
    displayCurrencySwitcher: true
  },
  localization: {
    defaultLanguage: "ru",
    availableLanguages: [
      { code: "ru", name: "Русский" },
      { code: "en", name: "English" },
      { code: "es", name: "Español" }
    ],
    defaultCurrency: "USD",
    availableCurrencies: [
      { code: "USD", name: "US Dollar", symbol: "$" },
      { code: "EUR", name: "Euro", symbol: "€" },
      { code: "RUB", name: "Russian Ruble", symbol: "₽" }
    ],
    dateFormat: "DD.MM.YYYY",
    timeFormat: "24h",
    timezone: "Europe/Moscow"
  },
  features: {
    referralProgram: {
      enabled: true,
      commissionRate: 5, // percent
      minimumWithdrawal: 10,
      multiLevelEnabled: false
    },
    depositOptions: {
      minAmount: 100,
      maxAmount: 100000,
      methods: [
        { id: "bank_card", name: "Bank Card", enabled: true, fee: 1.5 },
        { id: "bank_transfer", name: "Bank Transfer", enabled: true, fee: 0 },
        { id: "crypto", name: "Cryptocurrency", enabled: true, fee: 0.5 },
        { id: "electronic_wallet", name: "Electronic Wallet", enabled: true, fee: 2 }
      ]
    },
    withdrawOptions: {
      minAmount: 10,
      maxAmount: 25000,
      processingTime: "1-3 business days",
      methods: [
        { id: "bank_card", name: "Bank Card", enabled: true, fee: 1.0 },
        { id: "bank_transfer", name: "Bank Transfer", enabled: true, fee: 0 },
        { id: "crypto", name: "Cryptocurrency", enabled: true, fee: 0.5 }
      ]
    },
    investmentPlans: {
      enabled: true,
      displayOnHomepage: true,
      showCalculator: true
    }
  },
  security: {
    twoFactorAuth: {
      enabled: true,
      required: false,
      methods: ["email", "app"]
    },
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true
    },
    sessionTimeout: 60, // minutes
    loginAttempts: 5,
    recaptcha: {
      enabled: true,
      siteKey: "6LexampleL3x4mpl3",
      secretKey: "6LexampleL3x4mpl3s3cr3t"
    }
  },
  notifications: {
    adminNotifications: {
      newUser: true,
      newDeposit: true,
      withdrawalRequest: true,
      contactForm: true
    },
    userNotifications: {
      depositApproved: true,
      withdrawalStatus: true,
      accountLogin: true,
      promotions: true,
      newsletter: true
    },
    emailSettings: {
      provider: "smtp",
      fromName: "Financial Fortress",
      fromEmail: "noreply@financialfortress.com",
      smtpHost: "smtp.example.com",
      smtpPort: 587,
      smtpSecure: true,
      smtpUsername: "smtp_user",
      smtpPassword: "********"
    },
    emailTemplates: [
      { id: "welcome", name: "Welcome Email", subject: "Welcome to Financial Fortress" },
      { id: "password_reset", name: "Password Reset", subject: "Reset Your Password" },
      { id: "deposit_approved", name: "Deposit Approved", subject: "Your Deposit Has Been Approved" },
      { id: "withdrawal_approved", name: "Withdrawal Approved", subject: "Your Withdrawal Has Been Approved" }
    ]
  },
  integrations: {
    analytics: {
      googleAnalytics: {
        enabled: true,
        trackingId: "UA-12345678-9"
      },
      yandexMetrika: {
        enabled: true,
        trackingId: "12345678"
      }
    },
    payments: {
      stripe: {
        enabled: true,
        publishableKey: "pk_test_example",
        secretKey: "sk_test_******"
      },
      paypal: {
        enabled: false,
        clientId: "",
        clientSecret: ""
      }
    },
    socialLogin: {
      google: {
        enabled: true,
        clientId: "google_client_id",
        clientSecret: "********"
      },
      facebook: {
        enabled: false,
        appId: "",
        appSecret: ""
      }
    }
  },
  maintenance: {
    maintenanceMode: false,
    maintenanceMessage: "Сайт находится на техническом обслуживании. Пожалуйста, вернитесь позже.",
    allowAdminAccess: true,
    scheduledMaintenance: null,
    backupSettings: {
      automaticBackups: true,
      backupFrequency: "daily", // daily, weekly, monthly
      backupRetention: 7, // days to keep backups
      includeDatabase: true,
      includeFiles: true
    },
    errorLogging: true,
    performanceMonitoring: true
  }
};

// Основной компонент настроек сайта
export default function SiteSettings() {
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState(siteSettingsData);
  const [savingSettings, setSavingSettings] = useState(false);
  const [backupInProgress, setBackupInProgress] = useState(false);
  const [pendingChanges, setPendingChanges] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  
  // Обработка изменений в настройках
  const handleSettingChange = (section: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [key]: value
      }
    }));
    setPendingChanges(true);
  };
  
  // Обработка вложенных изменений в настройках
  const handleNestedSettingChange = (section: string, parentKey: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [parentKey]: {
          ...prev[section as keyof typeof prev][parentKey as keyof typeof prev[keyof typeof prev]],
          [key]: value
        }
      }
    }));
    setPendingChanges(true);
  };
  
  // Обработка изменений в массивах
  const handleArraySettingChange = (section: string, parentKey: string, index: number, key: string, value: any) => {
    const newArray = [
      ...settings[section as keyof typeof settings][parentKey as keyof typeof settings[keyof typeof settings]] as any[]
    ];
    newArray[index] = {
      ...newArray[index],
      [key]: value
    };
    
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [parentKey]: newArray
      }
    }));
    setPendingChanges(true);
  };
  
  // Сохранение настроек
  const handleSaveSettings = () => {
    setSavingSettings(true);
    
    // Здесь был бы API-запрос на сохранение настроек
    setTimeout(() => {
      setSavingSettings(false);
      setPendingChanges(false);
      
      toast({
        title: "Настройки сохранены",
        description: "Изменения успешно применены."
      });
    }, 1500);
  };
  
  // Сброс настроек
  const handleResetSettings = () => {
    setSettings(siteSettingsData);
    setPendingChanges(false);
    setResetConfirmOpen(false);
    
    toast({
      title: "Настройки сброшены",
      description: "Все настройки сброшены до значений по умолчанию.",
    });
  };
  
  // Создание резервной копии
  const handleCreateBackup = () => {
    setBackupInProgress(true);
    
    // Здесь был бы API-запрос на создание резервной копии
    setTimeout(() => {
      setBackupInProgress(false);
      
      toast({
        title: "Резервная копия создана",
        description: "Резервная копия успешно создана и сохранена.",
      });
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">Настройки сайта</h2>
          <p className="text-muted-foreground">
            Управление параметрами и настройками платформы
          </p>
        </div>
        <div className="flex gap-2">
          <AlertDialog open={resetConfirmOpen} onOpenChange={setResetConfirmOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <CircleSlash className="h-4 w-4 mr-2" />
                Сбросить
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                <AlertDialogDescription>
                  Это действие сбросит все настройки до значений по умолчанию. Это действие невозможно отменить.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleResetSettings}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  Сбросить настройки
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          
          <Button
            disabled={!pendingChanges || savingSettings}
            onClick={handleSaveSettings}
          >
            {savingSettings ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Сохранение...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Сохранить изменения
              </>
            )}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="space-y-4" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-7 lg:w-full h-auto">
          <TabsTrigger value="general" className="flex flex-col py-2 h-auto">
            <Globe className="h-4 w-4 mb-1" />
            <span className="text-xs">Общие</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex flex-col py-2 h-auto">
            <Palette className="h-4 w-4 mb-1" />
            <span className="text-xs">Внешний вид</span>
          </TabsTrigger>
          <TabsTrigger value="localization" className="flex flex-col py-2 h-auto">
            <Languages className="h-4 w-4 mb-1" />
            <span className="text-xs">Локализация</span>
          </TabsTrigger>
          <TabsTrigger value="features" className="flex flex-col py-2 h-auto">
            <Award className="h-4 w-4 mb-1" />
            <span className="text-xs">Функции</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex flex-col py-2 h-auto">
            <ShieldCheck className="h-4 w-4 mb-1" />
            <span className="text-xs">Безопасность</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex flex-col py-2 h-auto">
            <MessageSquare className="h-4 w-4 mb-1" />
            <span className="text-xs">Уведомления</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex flex-col py-2 h-auto">
            <Settings className="h-4 w-4 mb-1" />
            <span className="text-xs">Обслуживание</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Общие настройки */}
        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Основная информация</CardTitle>
              <CardDescription>
                Общие сведения о сайте и контактные данные
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="siteName">Название сайта</Label>
                  <Input 
                    id="siteName" 
                    value={settings.general.siteName}
                    onChange={(e) => handleSettingChange('general', 'siteName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="siteEmail">Email сайта</Label>
                  <Input 
                    id="siteEmail" 
                    type="email"
                    value={settings.general.siteEmail}
                    onChange={(e) => handleSettingChange('general', 'siteEmail', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">Описание сайта</Label>
                <Textarea 
                  id="siteDescription" 
                  value={settings.general.siteDescription}
                  onChange={(e) => handleSettingChange('general', 'siteDescription', e.target.value)}
                  className="min-h-20"
                />
                <p className="text-xs text-muted-foreground">
                  Краткое описание, которое будет использоваться в мета-тегах.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Email поддержки</Label>
                  <Input 
                    id="supportEmail" 
                    type="email"
                    value={settings.general.supportEmail}
                    onChange={(e) => handleSettingChange('general', 'supportEmail', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Телефон</Label>
                  <Input 
                    id="phoneNumber" 
                    value={settings.general.phoneNumber}
                    onChange={(e) => handleSettingChange('general', 'phoneNumber', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="address">Адрес</Label>
                <Input 
                  id="address" 
                  value={settings.general.address}
                  onChange={(e) => handleSettingChange('general', 'address', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="metaKeywords">Мета-теги ключевых слов</Label>
                <Textarea 
                  id="metaKeywords" 
                  value={settings.general.metaKeywords}
                  onChange={(e) => handleSettingChange('general', 'metaKeywords', e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Ключевые слова, разделенные запятыми, для SEO.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="copyrightText">Текст копирайта</Label>
                <Input 
                  id="copyrightText" 
                  value={settings.general.copyrightText}
                  onChange={(e) => handleSettingChange('general', 'copyrightText', e.target.value)}
                />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Логотип и фавикон</CardTitle>
              <CardDescription>
                Загрузка и управление изображениями сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Логотип сайта</Label>
                  <div className="border rounded-md p-4 text-center">
                    <div className="w-full h-32 flex items-center justify-center mb-4 bg-muted/30 rounded-md">
                      {settings.general.logo ? (
                        <img 
                          src={settings.general.logo} 
                          alt="Логотип" 
                          className="max-h-28 max-w-full object-contain" 
                        />
                      ) : (
                        <FileImage className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Рекомендуемый размер: 300x100 пикселей
                      </p>
                      <Button variant="outline" size="sm">
                        <FileUp className="h-4 w-4 mr-2" />
                        Выбрать файл
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Фавикон</Label>
                  <div className="border rounded-md p-4 text-center">
                    <div className="w-full h-32 flex items-center justify-center mb-4 bg-muted/30 rounded-md">
                      {settings.general.favicon ? (
                        <img 
                          src={settings.general.favicon} 
                          alt="Фавикон" 
                          className="h-16 w-16 object-contain" 
                        />
                      ) : (
                        <FileImage className="h-12 w-12 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-sm text-muted-foreground">
                        Рекомендуемый формат: .ico, 32x32 пикселя
                      </p>
                      <Button variant="outline" size="sm">
                        <FileUp className="h-4 w-4 mr-2" />
                        Выбрать файл
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Социальные сети</CardTitle>
              <CardDescription>
                Ссылки на профили в социальных сетях
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    value={settings.general.socialLinks.facebook}
                    onChange={(e) => handleNestedSettingChange('general', 'socialLinks', 'facebook', e.target.value)}
                    placeholder="https://facebook.com/yourpage"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter</Label>
                  <Input 
                    id="twitter" 
                    value={settings.general.socialLinks.twitter}
                    onChange={(e) => handleNestedSettingChange('general', 'socialLinks', 'twitter', e.target.value)}
                    placeholder="https://twitter.com/yourhandle"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    value={settings.general.socialLinks.instagram}
                    onChange={(e) => handleNestedSettingChange('general', 'socialLinks', 'instagram', e.target.value)}
                    placeholder="https://instagram.com/yourprofile"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input 
                    id="telegram" 
                    value={settings.general.socialLinks.telegram}
                    onChange={(e) => handleNestedSettingChange('general', 'socialLinks', 'telegram', e.target.value)}
                    placeholder="https://t.me/yourchannel"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки внешнего вида */}
        <TabsContent value="appearance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Тема и цвета</CardTitle>
              <CardDescription>
                Настройки внешнего вида и темы сайта
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Тема по умолчанию</Label>
                  <Select
                    value={settings.appearance.theme}
                    onValueChange={(value) => handleSettingChange('appearance', 'theme', value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Выберите тему" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Светлая</SelectItem>
                      <SelectItem value="dark">Темная</SelectItem>
                      <SelectItem value="system">Системная</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fontFamily">Шрифт</Label>
                  <Select
                    value={settings.appearance.fontFamily}
                    onValueChange={(value) => handleSettingChange('appearance', 'fontFamily', value)}
                  >
                    <SelectTrigger id="fontFamily">
                      <SelectValue placeholder="Выберите шрифт" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inter">Inter</SelectItem>
                      <SelectItem value="Roboto">Roboto</SelectItem>
                      <SelectItem value="Poppins">Poppins</SelectItem>
                      <SelectItem value="Open Sans">Open Sans</SelectItem>
                      <SelectItem value="Montserrat">Montserrat</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primaryColor">Основной цвет</Label>
                  <div className="flex gap-2">
                    <div 
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: settings.appearance.primaryColor }}
                    />
                    <Input 
                      id="primaryColor" 
                      value={settings.appearance.primaryColor}
                      onChange={(e) => handleSettingChange('appearance', 'primaryColor', e.target.value)}
                      placeholder="#4f46e5"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="secondaryColor">Вторичный цвет</Label>
                  <div className="flex gap-2">
                    <div 
                      className="h-10 w-10 rounded-md border"
                      style={{ backgroundColor: settings.appearance.secondaryColor }}
                    />
                    <Input 
                      id="secondaryColor" 
                      value={settings.appearance.secondaryColor}
                      onChange={(e) => handleSettingChange('appearance', 'secondaryColor', e.target.value)}
                      placeholder="#10b981"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="borderRadius">Скругление углов</Label>
                  <Select
                    value={settings.appearance.borderRadius}
                    onValueChange={(value) => handleSettingChange('appearance', 'borderRadius', value)}
                  >
                    <SelectTrigger id="borderRadius">
                      <SelectValue placeholder="Выберите размер скругления" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Маленький</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="large">Большой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="homePageLayout">Макет главной страницы</Label>
                  <Select
                    value={settings.appearance.homePageLayout}
                    onValueChange={(value) => handleSettingChange('appearance', 'homePageLayout', value)}
                  >
                    <SelectTrigger id="homePageLayout">
                      <SelectValue placeholder="Выберите макет" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modern">Современный</SelectItem>
                      <SelectItem value="classic">Классический</SelectItem>
                      <SelectItem value="minimal">Минималистичный</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="enableDarkMode" className="cursor-pointer">
                    Включить переключатель темной темы
                  </Label>
                  <Switch
                    id="enableDarkMode"
                    checked={settings.appearance.enableDarkMode}
                    onCheckedChange={(checked) => handleSettingChange('appearance', 'enableDarkMode', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Позволить пользователям переключаться между светлой и темной темой
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="animations" className="cursor-pointer">
                    Анимации интерфейса
                  </Label>
                  <Switch
                    id="animations"
                    checked={settings.appearance.animations}
                    onCheckedChange={(checked) => handleSettingChange('appearance', 'animations', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Включить анимации при взаимодействии с элементами интерфейса
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="customCss">Пользовательский CSS</Label>
                <Textarea 
                  id="customCss" 
                  value={settings.appearance.customCss}
                  onChange={(e) => handleSettingChange('appearance', 'customCss', e.target.value)}
                  className="font-mono text-sm"
                  placeholder=".custom-class { color: red; }"
                />
                <p className="text-xs text-muted-foreground">
                  Дополнительные CSS-правила для настройки внешнего вида сайта
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Элементы интерфейса</CardTitle>
              <CardDescription>
                Настройки отображения элементов пользовательского интерфейса
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="displayLanguageSwitcher" className="cursor-pointer">
                    Переключатель языков
                  </Label>
                  <Switch
                    id="displayLanguageSwitcher"
                    checked={settings.appearance.displayLanguageSwitcher}
                    onCheckedChange={(checked) => handleSettingChange('appearance', 'displayLanguageSwitcher', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Отображать переключатель языков в шапке сайта
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="displayCurrencySwitcher" className="cursor-pointer">
                    Переключатель валют
                  </Label>
                  <Switch
                    id="displayCurrencySwitcher"
                    checked={settings.appearance.displayCurrencySwitcher}
                    onCheckedChange={(checked) => handleSettingChange('appearance', 'displayCurrencySwitcher', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Отображать переключатель валют в шапке сайта
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/20">
                <h4 className="text-sm font-medium mb-2">Предпросмотр темы</h4>
                <div className={`p-4 rounded-md ${
                  settings.appearance.theme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-white text-black'
                }`}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div 
                        className="h-8 w-8 rounded-md"
                        style={{ backgroundColor: settings.appearance.primaryColor }}
                      ></div>
                      <span className="font-semibold">Financial Fortress</span>
                    </div>
                    <div className="flex gap-2">
                      <div className={`text-xs px-2 py-1 rounded ${
                        settings.appearance.theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'
                      }`}>
                        RU
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        settings.appearance.theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'
                      }`}>
                        USD
                      </div>
                    </div>
                  </div>
                  <div className={`h-12 rounded-md mb-4 ${
                    settings.appearance.theme === 'dark' ? 'bg-zinc-800' : 'bg-zinc-100'
                  }`}></div>
                  <div className="flex gap-2 mb-4">
                    <div 
                      className="h-8 py-1 px-3 rounded-md text-white text-sm flex items-center"
                      style={{ backgroundColor: settings.appearance.primaryColor }}
                    >
                      Кнопка
                    </div>
                    <div 
                      className={`h-8 py-1 px-3 rounded-md text-sm flex items-center ${
                        settings.appearance.theme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-zinc-100 text-black'
                      }`}
                    >
                      Кнопка
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки локализации */}
        <TabsContent value="localization" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Языки</CardTitle>
              <CardDescription>
                Настройки языков и переводов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultLanguage">Язык по умолчанию</Label>
                <Select
                  value={settings.localization.defaultLanguage}
                  onValueChange={(value) => handleSettingChange('localization', 'defaultLanguage', value)}
                >
                  <SelectTrigger id="defaultLanguage">
                    <SelectValue placeholder="Выберите язык по умолчанию" />
                  </SelectTrigger>
                  <SelectContent>
                    {settings.localization.availableLanguages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Доступные языки</Label>
                <div className="border rounded-md divide-y">
                  {settings.localization.availableLanguages.map((lang, index) => (
                    <div key={lang.code} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{lang.name}</div>
                        <div className="text-sm text-muted-foreground">({lang.code})</div>
                        {lang.code === settings.localization.defaultLanguage && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            По умолчанию
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Редактировать
                        </Button>
                        {lang.code !== settings.localization.defaultLanguage && (
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Удалить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить язык
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Валюты</CardTitle>
              <CardDescription>
                Настройки валют и форматов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="defaultCurrency">Валюта по умолчанию</Label>
                <Select
                  value={settings.localization.defaultCurrency}
                  onValueChange={(value) => handleSettingChange('localization', 'defaultCurrency', value)}
                >
                  <SelectTrigger id="defaultCurrency">
                    <SelectValue placeholder="Выберите валюту по умолчанию" />
                  </SelectTrigger>
                  <SelectContent>
                    {settings.localization.availableCurrencies.map((currency) => (
                      <SelectItem key={currency.code} value={currency.code}>
                        {currency.name} ({currency.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Доступные валюты</Label>
                <div className="border rounded-md divide-y">
                  {settings.localization.availableCurrencies.map((currency) => (
                    <div key={currency.code} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{currency.symbol}</div>
                        <div className="font-medium">{currency.name}</div>
                        <div className="text-sm text-muted-foreground">({currency.code})</div>
                        {currency.code === settings.localization.defaultCurrency && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                            По умолчанию
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Редактировать
                        </Button>
                        {currency.code !== settings.localization.defaultCurrency && (
                          <Button variant="ghost" size="sm" className="text-destructive">
                            Удалить
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить валюту
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Формат даты</Label>
                  <Select
                    value={settings.localization.dateFormat}
                    onValueChange={(value) => handleSettingChange('localization', 'dateFormat', value)}
                  >
                    <SelectTrigger id="dateFormat">
                      <SelectValue placeholder="Выберите формат даты" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD.MM.YYYY">DD.MM.YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timeFormat">Формат времени</Label>
                  <Select
                    value={settings.localization.timeFormat}
                    onValueChange={(value) => handleSettingChange('localization', 'timeFormat', value)}
                  >
                    <SelectTrigger id="timeFormat">
                      <SelectValue placeholder="Выберите формат времени" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12-часовой (AM/PM)</SelectItem>
                      <SelectItem value="24h">24-часовой</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <Select
                    value={settings.localization.timezone}
                    onValueChange={(value) => handleSettingChange('localization', 'timezone', value)}
                  >
                    <SelectTrigger id="timezone">
                      <SelectValue placeholder="Выберите часовой пояс" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Europe/Moscow">Москва (GMT+3)</SelectItem>
                      <SelectItem value="Europe/London">Лондон (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">Нью-Йорк (GMT-5)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Токио (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки функций */}
        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Реферальная программа</CardTitle>
              <CardDescription>
                Настройки реферальной системы
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="referralEnabled" className="cursor-pointer">
                    Включить реферальную программу
                  </Label>
                  <Switch
                    id="referralEnabled"
                    checked={settings.features.referralProgram.enabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('features', 'referralProgram', 'enabled', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Позволить пользователям приглашать новых участников и получать вознаграждение
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="commissionRate">Процент вознаграждения (%)</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="commissionRate" 
                      type="number"
                      min="0"
                      max="100"
                      value={settings.features.referralProgram.commissionRate}
                      onChange={(e) => handleNestedSettingChange('features', 'referralProgram', 'commissionRate', parseFloat(e.target.value))}
                      disabled={!settings.features.referralProgram.enabled}
                    />
                    <Percent className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="minimumWithdrawal">Минимальная сумма вывода</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="minimumWithdrawal" 
                      type="number"
                      min="0"
                      value={settings.features.referralProgram.minimumWithdrawal}
                      onChange={(e) => handleNestedSettingChange('features', 'referralProgram', 'minimumWithdrawal', parseFloat(e.target.value))}
                      disabled={!settings.features.referralProgram.enabled}
                    />
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="multiLevelEnabled" className="cursor-pointer">
                    Многоуровневая реферальная система
                  </Label>
                  <Switch
                    id="multiLevelEnabled"
                    checked={settings.features.referralProgram.multiLevelEnabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('features', 'referralProgram', 'multiLevelEnabled', checked)}
                    disabled={!settings.features.referralProgram.enabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Включить многоуровневую реферальную программу (вознаграждение за рефералов вторых и третьих уровней)
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Методы депозита</CardTitle>
              <CardDescription>
                Настройки для внесения средств
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minDepositAmount">Минимальная сумма депозита</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="minDepositAmount" 
                      type="number"
                      min="0"
                      value={settings.features.depositOptions.minAmount}
                      onChange={(e) => handleNestedSettingChange('features', 'depositOptions', 'minAmount', parseFloat(e.target.value))}
                    />
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxDepositAmount">Максимальная сумма депозита</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="maxDepositAmount" 
                      type="number"
                      min="0"
                      value={settings.features.depositOptions.maxAmount}
                      onChange={(e) => handleNestedSettingChange('features', 'depositOptions', 'maxAmount', parseFloat(e.target.value))}
                    />
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Доступные методы депозита</Label>
                <div className="border rounded-md divide-y">
                  {settings.features.depositOptions.methods.map((method, index) => (
                    <div key={method.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={method.enabled}
                          onCheckedChange={(checked) => handleArraySettingChange('features', 'depositOptions', index, 'enabled', checked)}
                        />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Комиссия: {method.fee}%
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Настроить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить метод
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Методы вывода</CardTitle>
              <CardDescription>
                Настройки для вывода средств
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minWithdrawAmount">Минимальная сумма вывода</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="minWithdrawAmount" 
                      type="number"
                      min="0"
                      value={settings.features.withdrawOptions.minAmount}
                      onChange={(e) => handleNestedSettingChange('features', 'withdrawOptions', 'minAmount', parseFloat(e.target.value))}
                    />
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="maxWithdrawAmount">Максимальная сумма вывода</Label>
                  <div className="flex gap-2 items-center">
                    <Input 
                      id="maxWithdrawAmount" 
                      type="number"
                      min="0"
                      value={settings.features.withdrawOptions.maxAmount}
                      onChange={(e) => handleNestedSettingChange('features', 'withdrawOptions', 'maxAmount', parseFloat(e.target.value))}
                    />
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="processingTime">Время обработки вывода</Label>
                <Input 
                  id="processingTime" 
                  value={settings.features.withdrawOptions.processingTime}
                  onChange={(e) => handleNestedSettingChange('features', 'withdrawOptions', 'processingTime', e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Доступные методы вывода</Label>
                <div className="border rounded-md divide-y">
                  {settings.features.withdrawOptions.methods.map((method, index) => (
                    <div key={method.id} className="p-3 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Switch
                          checked={method.enabled}
                          onCheckedChange={(checked) => handleArraySettingChange('features', 'withdrawOptions', index, 'enabled', checked)}
                        />
                        <div>
                          <div className="font-medium">{method.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Комиссия: {method.fee}%
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          Настроить
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить метод
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Инвестиционные планы</CardTitle>
              <CardDescription>
                Настройки инвестиционных планов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="investmentPlansEnabled" className="cursor-pointer">
                    Включить инвестиционные планы
                  </Label>
                  <Switch
                    id="investmentPlansEnabled"
                    checked={settings.features.investmentPlans.enabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('features', 'investmentPlans', 'enabled', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Включить функциональность инвестиционных планов
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="displayOnHomepage" className="cursor-pointer">
                    Отображать на главной странице
                  </Label>
                  <Switch
                    id="displayOnHomepage"
                    checked={settings.features.investmentPlans.displayOnHomepage}
                    onCheckedChange={(checked) => handleNestedSettingChange('features', 'investmentPlans', 'displayOnHomepage', checked)}
                    disabled={!settings.features.investmentPlans.enabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Отображать инвестиционные планы на главной странице сайта
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="showCalculator" className="cursor-pointer">
                    Показывать калькулятор доходности
                  </Label>
                  <Switch
                    id="showCalculator"
                    checked={settings.features.investmentPlans.showCalculator}
                    onCheckedChange={(checked) => handleNestedSettingChange('features', 'investmentPlans', 'showCalculator', checked)}
                    disabled={!settings.features.investmentPlans.enabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Отображать калькулятор доходности на странице инвестиционных планов
                </p>
              </div>
              
              <Button variant="outline" disabled={!settings.features.investmentPlans.enabled}>
                Управление инвестиционными планами
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки безопасности */}
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Двухфакторная аутентификация</CardTitle>
              <CardDescription>
                Настройки двухфакторной аутентификации
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorEnabled" className="cursor-pointer">
                    Включить двухфакторную аутентификацию
                  </Label>
                  <Switch
                    id="twoFactorEnabled"
                    checked={settings.security.twoFactorAuth.enabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('security', 'twoFactorAuth', 'enabled', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Включить возможность использования двухфакторной аутентификации
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="twoFactorRequired" className="cursor-pointer">
                    Обязательная двухфакторная аутентификация
                  </Label>
                  <Switch
                    id="twoFactorRequired"
                    checked={settings.security.twoFactorAuth.required}
                    onCheckedChange={(checked) => handleNestedSettingChange('security', 'twoFactorAuth', 'required', checked)}
                    disabled={!settings.security.twoFactorAuth.enabled}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Требовать от всех пользователей настройки двухфакторной аутентификации
                </p>
              </div>
              
              <div className="space-y-2">
                <Label>Методы двухфакторной аутентификации</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="2fa-email"
                      checked={settings.security.twoFactorAuth.methods.includes('email')}
                      onChange={(e) => {
                        const methods = [...settings.security.twoFactorAuth.methods];
                        if (e.target.checked) {
                          if (!methods.includes('email')) methods.push('email');
                        } else {
                          const index = methods.indexOf('email');
                          if (index !== -1) methods.splice(index, 1);
                        }
                        handleNestedSettingChange('security', 'twoFactorAuth', 'methods', methods);
                      }}
                      disabled={!settings.security.twoFactorAuth.enabled}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="2fa-email" className="cursor-pointer">Email</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="2fa-app"
                      checked={settings.security.twoFactorAuth.methods.includes('app')}
                      onChange={(e) => {
                        const methods = [...settings.security.twoFactorAuth.methods];
                        if (e.target.checked) {
                          if (!methods.includes('app')) methods.push('app');
                        } else {
                          const index = methods.indexOf('app');
                          if (index !== -1) methods.splice(index, 1);
                        }
                        handleNestedSettingChange('security', 'twoFactorAuth', 'methods', methods);
                      }}
                      disabled={!settings.security.twoFactorAuth.enabled}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="2fa-app" className="cursor-pointer">Приложение-аутентификатор</Label>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input 
                      type="checkbox" 
                      id="2fa-sms"
                      checked={settings.security.twoFactorAuth.methods.includes('sms')}
                      onChange={(e) => {
                        const methods = [...settings.security.twoFactorAuth.methods];
                        if (e.target.checked) {
                          if (!methods.includes('sms')) methods.push('sms');
                        } else {
                          const index = methods.indexOf('sms');
                          if (index !== -1) methods.splice(index, 1);
                        }
                        handleNestedSettingChange('security', 'twoFactorAuth', 'methods', methods);
                      }}
                      disabled={!settings.security.twoFactorAuth.enabled}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                    <Label htmlFor="2fa-sms" className="cursor-pointer">SMS</Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Политика паролей</CardTitle>
              <CardDescription>
                Требования к паролям пользователей
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="minLength">Минимальная длина пароля</Label>
                <Input 
                  id="minLength" 
                  type="number"
                  min="6"
                  max="32"
                  value={settings.security.passwordPolicy.minLength}
                  onChange={(e) => handleNestedSettingChange('security', 'passwordPolicy', 'minLength', parseInt(e.target.value))}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireUppercase" className="cursor-pointer">
                      Требовать заглавные буквы
                    </Label>
                    <Switch
                      id="requireUppercase"
                      checked={settings.security.passwordPolicy.requireUppercase}
                      onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireUppercase', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireLowercase" className="cursor-pointer">
                      Требовать строчные буквы
                    </Label>
                    <Switch
                      id="requireLowercase"
                      checked={settings.security.passwordPolicy.requireLowercase}
                      onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireLowercase', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireNumbers" className="cursor-pointer">
                      Требовать цифры
                    </Label>
                    <Switch
                      id="requireNumbers"
                      checked={settings.security.passwordPolicy.requireNumbers}
                      onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireNumbers', checked)}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="requireSpecialChars" className="cursor-pointer">
                      Требовать спецсимволы
                    </Label>
                    <Switch
                      id="requireSpecialChars"
                      checked={settings.security.passwordPolicy.requireSpecialChars}
                      onCheckedChange={(checked) => handleNestedSettingChange('security', 'passwordPolicy', 'requireSpecialChars', checked)}
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/20">
                <h4 className="text-sm font-medium mb-2">Сила пароля</h4>
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500"
                      style={{ 
                        width: `${(
                          (settings.security.passwordPolicy.minLength >= 8 ? 25 : 0) +
                          (settings.security.passwordPolicy.requireUppercase ? 25 : 0) +
                          (settings.security.passwordPolicy.requireNumbers ? 25 : 0) +
                          (settings.security.passwordPolicy.requireSpecialChars ? 25 : 0)
                        )}%` 
                      }}
                    ></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Пример пароля, удовлетворяющего текущим требованиям:
                    <code className="ml-1 p-1 bg-muted rounded text-xs">
                      {
                        'P' +
                        'a'.repeat(Math.max(0, settings.security.passwordPolicy.minLength - 3)) +
                        (settings.security.passwordPolicy.requireNumbers ? '1' : '') +
                        (settings.security.passwordPolicy.requireSpecialChars ? '!' : '')
                      }
                    </code>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Сессии и авторизация</CardTitle>
              <CardDescription>
                Настройки сессий и входа в систему
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Таймаут сессии (минуты)</Label>
                <Input 
                  id="sessionTimeout" 
                  type="number"
                  min="5"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleSettingChange('security', 'sessionTimeout', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Время бездействия, после которого пользователю потребуется повторная авторизация
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="loginAttempts">Максимальное количество попыток входа</Label>
                <Input 
                  id="loginAttempts" 
                  type="number"
                  min="1"
                  max="10"
                  value={settings.security.loginAttempts}
                  onChange={(e) => handleSettingChange('security', 'loginAttempts', parseInt(e.target.value))}
                />
                <p className="text-xs text-muted-foreground">
                  Количество неудачных попыток входа, после которых аккаунт будет временно заблокирован
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="recaptchaEnabled" className="cursor-pointer">
                    Включить reCAPTCHA
                  </Label>
                  <Switch
                    id="recaptchaEnabled"
                    checked={settings.security.recaptcha.enabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('security', 'recaptcha', 'enabled', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Использовать Google reCAPTCHA для защиты от ботов
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recaptchaSiteKey">reCAPTCHA Site Key</Label>
                  <Input 
                    id="recaptchaSiteKey" 
                    value={settings.security.recaptcha.siteKey}
                    onChange={(e) => handleNestedSettingChange('security', 'recaptcha', 'siteKey', e.target.value)}
                    disabled={!settings.security.recaptcha.enabled}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="recaptchaSecretKey">reCAPTCHA Secret Key</Label>
                  <Input 
                    id="recaptchaSecretKey" 
                    type="password"
                    value={settings.security.recaptcha.secretKey}
                    onChange={(e) => handleNestedSettingChange('security', 'recaptcha', 'secretKey', e.target.value)}
                    disabled={!settings.security.recaptcha.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки уведомлений */}
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Уведомления администраторов</CardTitle>
              <CardDescription>
                Настройки уведомлений для администраторов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newUserNotification" className="cursor-pointer">
                      Новый пользователь
                    </Label>
                    <Switch
                      id="newUserNotification"
                      checked={settings.notifications.adminNotifications.newUser}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'adminNotifications', 'newUser', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Получать уведомления о регистрации новых пользователей
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newDepositNotification" className="cursor-pointer">
                      Новый депозит
                    </Label>
                    <Switch
                      id="newDepositNotification"
                      checked={settings.notifications.adminNotifications.newDeposit}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'adminNotifications', 'newDeposit', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Получать уведомления о новых депозитах
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="withdrawalRequestNotification" className="cursor-pointer">
                      Запрос на вывод средств
                    </Label>
                    <Switch
                      id="withdrawalRequestNotification"
                      checked={settings.notifications.adminNotifications.withdrawalRequest}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'adminNotifications', 'withdrawalRequest', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Получать уведомления о запросах на вывод средств
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="contactFormNotification" className="cursor-pointer">
                      Сообщение из формы обратной связи
                    </Label>
                    <Switch
                      id="contactFormNotification"
                      checked={settings.notifications.adminNotifications.contactForm}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'adminNotifications', 'contactForm', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Получать уведомления о новых сообщениях из формы обратной связи
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Уведомления пользователей</CardTitle>
              <CardDescription>
                Настройки уведомлений для пользователей
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="depositApprovedNotification" className="cursor-pointer">
                      Подтверждение депозита
                    </Label>
                    <Switch
                      id="depositApprovedNotification"
                      checked={settings.notifications.userNotifications.depositApproved}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'userNotifications', 'depositApproved', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Уведомлять пользователей о подтверждении депозита
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="withdrawalStatusNotification" className="cursor-pointer">
                      Статус вывода средств
                    </Label>
                    <Switch
                      id="withdrawalStatusNotification"
                      checked={settings.notifications.userNotifications.withdrawalStatus}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'userNotifications', 'withdrawalStatus', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Уведомлять пользователей об изменении статуса вывода средств
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="accountLoginNotification" className="cursor-pointer">
                      Вход в аккаунт
                    </Label>
                    <Switch
                      id="accountLoginNotification"
                      checked={settings.notifications.userNotifications.accountLogin}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'userNotifications', 'accountLogin', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Уведомлять пользователей о входе в их аккаунт
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="promotionsNotification" className="cursor-pointer">
                      Промо-акции и специальные предложения
                    </Label>
                    <Switch
                      id="promotionsNotification"
                      checked={settings.notifications.userNotifications.promotions}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'userNotifications', 'promotions', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Отправлять пользователям информацию о промо-акциях и специальных предложениях
                  </p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="newsletterNotification" className="cursor-pointer">
                      Рассылка новостей
                    </Label>
                    <Switch
                      id="newsletterNotification"
                      checked={settings.notifications.userNotifications.newsletter}
                      onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'userNotifications', 'newsletter', checked)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Отправлять пользователям новостную рассылку
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Настройки Email</CardTitle>
              <CardDescription>
                Настройки отправки email-уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailProvider">Провайдер Email</Label>
                <Select
                  value={settings.notifications.emailSettings.provider}
                  onValueChange={(value) => handleNestedSettingChange('notifications', 'emailSettings', 'provider', value)}
                >
                  <SelectTrigger id="emailProvider">
                    <SelectValue placeholder="Выберите провайдера" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="smtp">SMTP</SelectItem>
                    <SelectItem value="sendgrid">SendGrid</SelectItem>
                    <SelectItem value="mailgun">Mailgun</SelectItem>
                    <SelectItem value="ses">Amazon SES</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromName">Имя отправителя</Label>
                  <Input 
                    id="fromName" 
                    value={settings.notifications.emailSettings.fromName}
                    onChange={(e) => handleNestedSettingChange('notifications', 'emailSettings', 'fromName', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">Email отправителя</Label>
                  <Input 
                    id="fromEmail" 
                    type="email"
                    value={settings.notifications.emailSettings.fromEmail}
                    onChange={(e) => handleNestedSettingChange('notifications', 'emailSettings', 'fromEmail', e.target.value)}
                  />
                </div>
              </div>
              
              {settings.notifications.emailSettings.provider === 'smtp' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpHost">SMTP хост</Label>
                      <Input 
                        id="smtpHost" 
                        value={settings.notifications.emailSettings.smtpHost}
                        onChange={(e) => handleNestedSettingChange('notifications', 'emailSettings', 'smtpHost', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPort">SMTP порт</Label>
                      <Input 
                        id="smtpPort" 
                        type="number"
                        value={settings.notifications.emailSettings.smtpPort}
                        onChange={(e) => handleNestedSettingChange('notifications', 'emailSettings', 'smtpPort', parseInt(e.target.value))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="smtpSecure" className="cursor-pointer">
                          Использовать TLS
                        </Label>
                        <Switch
                          id="smtpSecure"
                          checked={settings.notifications.emailSettings.smtpSecure}
                          onCheckedChange={(checked) => handleNestedSettingChange('notifications', 'emailSettings', 'smtpSecure', checked)}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="smtpUsername">SMTP логин</Label>
                      <Input 
                        id="smtpUsername" 
                        value={settings.notifications.emailSettings.smtpUsername}
                        onChange={(e) => handleNestedSettingChange('notifications', 'emailSettings', 'smtpUsername', e.target.value)}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="smtpPassword">SMTP пароль</Label>
                      <Input 
                        id="smtpPassword" 
                        type="password"
                        value={settings.notifications.emailSettings.smtpPassword}
                        onChange={(e) => handleNestedSettingChange('notifications', 'emailSettings', 'smtpPassword', e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <MailCheck className="h-4 w-4 mr-2" />
                    Проверить соединение
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Шаблоны Email</CardTitle>
              <CardDescription>
                Управление шаблонами электронных писем
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border rounded-md divide-y">
                {settings.notifications.emailTemplates.map((template) => (
                  <div key={template.id} className="p-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{template.name}</div>
                      <div className="text-sm text-muted-foreground">
                        Тема: {template.subject}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm">
                        Редактировать
                      </Button>
                      <Button variant="ghost" size="sm">
                        Предпросмотр
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Добавить шаблон
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Настройки обслуживания */}
        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Режим обслуживания</CardTitle>
              <CardDescription>
                Настройки режима технического обслуживания
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="maintenanceMode" className="cursor-pointer">
                    Включить режим обслуживания
                  </Label>
                  <Switch
                    id="maintenanceMode"
                    checked={settings.maintenance.maintenanceMode}
                    onCheckedChange={(checked) => handleSettingChange('maintenance', 'maintenanceMode', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  При включении этого режима сайт будет недоступен для обычных пользователей
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="maintenanceMessage">Сообщение о техническом обслуживании</Label>
                <Textarea 
                  id="maintenanceMessage" 
                  value={settings.maintenance.maintenanceMessage}
                  onChange={(e) => handleSettingChange('maintenance', 'maintenanceMessage', e.target.value)}
                  disabled={!settings.maintenance.maintenanceMode}
                />
                <p className="text-xs text-muted-foreground">
                  Сообщение, которое будет отображаться на странице технического обслуживания
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="allowAdminAccess" className="cursor-pointer">
                    Разрешить доступ администраторам
                  </Label>
                  <Switch
                    id="allowAdminAccess"
                    checked={settings.maintenance.allowAdminAccess}
                    onCheckedChange={(checked) => handleSettingChange('maintenance', 'allowAdminAccess', checked)}
                    disabled={!settings.maintenance.maintenanceMode}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Позволяет администраторам входить в систему во время технического обслуживания
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Резервное копирование</CardTitle>
              <CardDescription>
                Настройки резервного копирования данных
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="automaticBackups" className="cursor-pointer">
                    Автоматическое резервное копирование
                  </Label>
                  <Switch
                    id="automaticBackups"
                    checked={settings.maintenance.backupSettings.automaticBackups}
                    onCheckedChange={(checked) => handleNestedSettingChange('maintenance', 'backupSettings', 'automaticBackups', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Автоматически создавать резервные копии системы
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="backupFrequency">Частота резервного копирования</Label>
                  <Select
                    value={settings.maintenance.backupSettings.backupFrequency}
                    onValueChange={(value) => handleNestedSettingChange('maintenance', 'backupSettings', 'backupFrequency', value)}
                    disabled={!settings.maintenance.backupSettings.automaticBackups}
                  >
                    <SelectTrigger id="backupFrequency">
                      <SelectValue placeholder="Выберите частоту" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Ежедневно</SelectItem>
                      <SelectItem value="weekly">Еженедельно</SelectItem>
                      <SelectItem value="monthly">Ежемесячно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="backupRetention">Срок хранения (дни)</Label>
                  <Input 
                    id="backupRetention" 
                    type="number"
                    min="1"
                    value={settings.maintenance.backupSettings.backupRetention}
                    onChange={(e) => handleNestedSettingChange('maintenance', 'backupSettings', 'backupRetention', parseInt(e.target.value))}
                    disabled={!settings.maintenance.backupSettings.automaticBackups}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeDatabase" className="cursor-pointer">
                      Включить базу данных
                    </Label>
                    <Switch
                      id="includeDatabase"
                      checked={settings.maintenance.backupSettings.includeDatabase}
                      onCheckedChange={(checked) => handleNestedSettingChange('maintenance', 'backupSettings', 'includeDatabase', checked)}
                      disabled={!settings.maintenance.backupSettings.automaticBackups}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="includeFiles" className="cursor-pointer">
                      Включить файлы
                    </Label>
                    <Switch
                      id="includeFiles"
                      checked={settings.maintenance.backupSettings.includeFiles}
                      onCheckedChange={(checked) => handleNestedSettingChange('maintenance', 'backupSettings', 'includeFiles', checked)}
                      disabled={!settings.maintenance.backupSettings.automaticBackups}
                    />
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline"
                onClick={handleCreateBackup}
                disabled={backupInProgress}
              >
                {backupInProgress ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Создание резервной копии...
                  </>
                ) : (
                  <>
                    <CloudUpload className="h-4 w-4 mr-2" />
                    Создать резервную копию сейчас
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Мониторинг и логирование</CardTitle>
              <CardDescription>
                Настройки мониторинга и ведения журнала ошибок
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="errorLogging" className="cursor-pointer">
                    Логирование ошибок
                  </Label>
                  <Switch
                    id="errorLogging"
                    checked={settings.maintenance.errorLogging}
                    onCheckedChange={(checked) => handleSettingChange('maintenance', 'errorLogging', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Вести журнал ошибок и исключений для отладки
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="performanceMonitoring" className="cursor-pointer">
                    Мониторинг производительности
                  </Label>
                  <Switch
                    id="performanceMonitoring"
                    checked={settings.maintenance.performanceMonitoring}
                    onCheckedChange={(checked) => handleSettingChange('maintenance', 'performanceMonitoring', checked)}
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Отслеживать производительность системы и API
                </p>
              </div>
              
              <div className="p-4 border rounded-md bg-muted/20">
                <h4 className="text-sm font-medium mb-2">Статус сервера</h4>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Загрузка CPU</dt>
                    <dd className="text-sm font-medium">32%</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Использование памяти</dt>
                    <dd className="text-sm font-medium">1.2 GB / 4.0 GB</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Использование диска</dt>
                    <dd className="text-sm font-medium">45.3 GB / 100 GB</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground mb-1">Активные соединения с БД</dt>
                    <dd className="text-sm font-medium">24 / 100</dd>
                  </div>
                </dl>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Интеграции и аналитика</CardTitle>
              <CardDescription>
                Настройки интеграций и аналитических сервисов
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="googleAnalyticsEnabled" className="cursor-pointer">
                    Google Analytics
                  </Label>
                  <Switch
                    id="googleAnalyticsEnabled"
                    checked={settings.integrations.analytics.googleAnalytics.enabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('integrations', 'analytics', 'googleAnalytics', {...settings.integrations.analytics.googleAnalytics, enabled: checked})}
                  />
                </div>
                
                {settings.integrations.analytics.googleAnalytics.enabled && (
                  <div className="mt-2">
                    <Label htmlFor="googleAnalyticsId">Идентификатор отслеживания</Label>
                    <Input 
                      id="googleAnalyticsId" 
                      value={settings.integrations.analytics.googleAnalytics.trackingId}
                      onChange={(e) => handleNestedSettingChange('integrations', 'analytics', 'googleAnalytics', {...settings.integrations.analytics.googleAnalytics, trackingId: e.target.value})}
                      placeholder="UA-XXXXXXXXX-X или G-XXXXXXXXXX"
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="yandexMetrikaEnabled" className="cursor-pointer">
                    Яндекс.Метрика
                  </Label>
                  <Switch
                    id="yandexMetrikaEnabled"
                    checked={settings.integrations.analytics.yandexMetrika.enabled}
                    onCheckedChange={(checked) => handleNestedSettingChange('integrations', 'analytics', 'yandexMetrika', {...settings.integrations.analytics.yandexMetrika, enabled: checked})}
                  />
                </div>
                
                {settings.integrations.analytics.yandexMetrika.enabled && (
                  <div className="mt-2">
                    <Label htmlFor="yandexMetrikaId">Идентификатор счетчика</Label>
                    <Input 
                      id="yandexMetrikaId" 
                      value={settings.integrations.analytics.yandexMetrika.trackingId}
                      onChange={(e) => handleNestedSettingChange('integrations', 'analytics', 'yandexMetrika', {...settings.integrations.analytics.yandexMetrika, trackingId: e.target.value})}
                      placeholder="XXXXXXXX"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}