import { useState } from "react";
import { 
  Card, CardContent, CardDescription, CardFooter, 
  CardHeader, CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Switch 
} from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  Select, SelectContent, SelectItem, 
  SelectTrigger, SelectValue 
} from "@/components/ui/select";
import {
  AlertCircle, Plus, Bell, BellOff, Edit, Trash2,
  AlertTriangle, Tag, ArrowUp, ArrowDown, Clock,
  CheckCircle2, Calendar, CreditCard, Info
} from "lucide-react";

// Пример данных для уведомлений
const alertsData = {
  activeAlerts: [
    { 
      id: 1, 
      type: "price", 
      asset: "Apple Inc. (AAPL)", 
      condition: "above", 
      value: 190.00,
      status: "active",
      createdAt: "05.05.2025"
    },
    { 
      id: 2, 
      type: "price", 
      asset: "Bitcoin (BTC)", 
      condition: "below", 
      value: 58000.00,
      status: "active",
      createdAt: "12.05.2025"
    },
    { 
      id: 3, 
      type: "news", 
      keyword: "Инфляция",
      sources: ["Bloomberg", "Reuters", "CNBC"],
      status: "active",
      createdAt: "14.05.2025"
    },
    { 
      id: 4, 
      type: "event", 
      event: "Отчет по занятости (NFP)",
      date: "05.06.2025",
      status: "active",
      createdAt: "18.05.2025"
    },
    { 
      id: 5, 
      type: "technical", 
      asset: "S&P 500 (SPX)",
      indicator: "RSI",
      condition: "above",
      value: 70,
      status: "active",
      createdAt: "19.05.2025"
    }
  ],
  recentTriggers: [
    { 
      id: 1, 
      alertType: "price", 
      message: "Цена Apple Inc. превысила $190.00",
      triggeredAt: "19.05.2025 15:32",
      status: "triggered"
    },
    { 
      id: 2, 
      alertType: "news", 
      message: "Новая новость по ключевому слову 'ФРС': ФРС сигнализирует о возможном снижении ставки",
      triggeredAt: "18.05.2025 10:15",
      status: "triggered"
    },
    { 
      id: 3, 
      alertType: "event", 
      message: "Напоминание: Выход данных по инфляции (CPI) через 1 день",
      triggeredAt: "17.05.2025 09:00",
      status: "reminder"
    },
    { 
      id: 4, 
      alertType: "technical", 
      message: "Технический индикатор: RSI для S&P 500 превысил 70 (зона перекупленности)",
      triggeredAt: "16.05.2025 16:05",
      status: "triggered"
    }
  ],
  watchedAssets: [
    "Apple Inc. (AAPL)",
    "Bitcoin (BTC)",
    "S&P 500 (SPX)",
    "Tesla Inc. (TSLA)",
    "Ethereum (ETH)",
    "Gold ETF (GLD)"
  ],
  notificationSettings: {
    emailEnabled: true,
    pushEnabled: true,
    smsEnabled: false,
    dailyDigest: true,
    silentHours: {
      enabled: true,
      from: "22:00",
      to: "08:00"
    }
  }
};

// Компонент для настройки умных уведомлений - Новая функция 4 для личного кабинета
export default function SmartAlerts() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [alertType, setAlertType] = useState<string>("price");
  const [settings, setSettings] = useState(alertsData.notificationSettings);
  
  // Получение иконки для типа уведомления
  const getAlertIcon = (type: string) => {
    switch(type) {
      case "price": return <Tag className="h-4 w-4 text-blue-500" />;
      case "news": return <Info className="h-4 w-4 text-purple-500" />;
      case "event": return <Calendar className="h-4 w-4 text-amber-500" />;
      case "technical": return <AlertCircle className="h-4 w-4 text-green-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Получение иконки для условия
  const getConditionIcon = (condition: string) => {
    switch(condition) {
      case "above": return <ArrowUp className="h-4 w-4 text-green-500" />;
      case "below": return <ArrowDown className="h-4 w-4 text-red-500" />;
      default: return <Info className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Получение иконки для статуса
  const getStatusIcon = (status: string) => {
    switch(status) {
      case "triggered": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "reminder": return <Clock className="h-4 w-4 text-amber-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Умные уведомления</h2>
          <p className="text-muted-foreground">
            Настройте оповещения и автоматические мониторинг рынка
          </p>
        </div>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="gradient-bg text-white"
        >
          <Plus className="mr-2 h-4 w-4" />
          {showAddForm ? "Отменить" : "Создать уведомление"}
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="border-dashed border-2 border-primary/50">
          <CardHeader>
            <CardTitle>Создать новое уведомление</CardTitle>
            <CardDescription>
              Настройте параметры для получения своевременных оповещений
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="alert-type">Тип уведомления</Label>
                <Select
                  value={alertType}
                  onValueChange={setAlertType}
                >
                  <SelectTrigger id="alert-type" className="w-full">
                    <SelectValue placeholder="Выберите тип уведомления" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">Цена актива</SelectItem>
                    <SelectItem value="news">Новостное оповещение</SelectItem>
                    <SelectItem value="event">Экономическое событие</SelectItem>
                    <SelectItem value="technical">Технический индикатор</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {alertType === "price" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="price-asset">Актив</Label>
                    <Select defaultValue={alertsData.watchedAssets[0]}>
                      <SelectTrigger id="price-asset" className="w-full">
                        <SelectValue placeholder="Выберите актив" />
                      </SelectTrigger>
                      <SelectContent>
                        {alertsData.watchedAssets.map((asset, index) => (
                          <SelectItem key={index} value={asset}>{asset}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="price-condition">Условие</Label>
                    <Select defaultValue="above">
                      <SelectTrigger id="price-condition" className="w-full">
                        <SelectValue placeholder="Выберите условие" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Выше чем</SelectItem>
                        <SelectItem value="below">Ниже чем</SelectItem>
                        <SelectItem value="change">Изменение на</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="price-value">Значение</Label>
                    <Input id="price-value" type="number" placeholder="Например: 190.00" />
                  </div>
                </div>
              )}
              
              {alertType === "news" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="news-keyword">Ключевое слово или фраза</Label>
                    <Input id="news-keyword" placeholder="Например: Инфляция, ФРС, Процентная ставка" />
                  </div>
                  
                  <div>
                    <Label>Источники новостей</Label>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="news-bloomberg" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="news-bloomberg">Bloomberg</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="news-reuters" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="news-reuters">Reuters</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="news-wsj" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="news-wsj">Wall Street Journal</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="news-cnbc" className="rounded border-gray-300" defaultChecked />
                        <label htmlFor="news-cnbc">CNBC</label>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {alertType === "event" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="event-type">Экономическое событие</Label>
                    <Select defaultValue="nfp">
                      <SelectTrigger id="event-type" className="w-full">
                        <SelectValue placeholder="Выберите событие" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nfp">Отчет по занятости (NFP)</SelectItem>
                        <SelectItem value="cpi">Индекс потребительских цен (CPI)</SelectItem>
                        <SelectItem value="interest">Решение по процентной ставке</SelectItem>
                        <SelectItem value="gdp">ВВП</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="event-reminder">Напоминание</Label>
                    <Select defaultValue="day">
                      <SelectTrigger id="event-reminder" className="w-full">
                        <SelectValue placeholder="Когда напомнить" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="week">За неделю</SelectItem>
                        <SelectItem value="day">За день</SelectItem>
                        <SelectItem value="hour">За час</SelectItem>
                        <SelectItem value="release">В момент выхода данных</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
              
              {alertType === "technical" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="technical-asset">Актив</Label>
                    <Select defaultValue={alertsData.watchedAssets[2]}>
                      <SelectTrigger id="technical-asset" className="w-full">
                        <SelectValue placeholder="Выберите актив" />
                      </SelectTrigger>
                      <SelectContent>
                        {alertsData.watchedAssets.map((asset, index) => (
                          <SelectItem key={index} value={asset}>{asset}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="technical-indicator">Индикатор</Label>
                    <Select defaultValue="rsi">
                      <SelectTrigger id="technical-indicator" className="w-full">
                        <SelectValue placeholder="Выберите индикатор" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rsi">Индекс относительной силы (RSI)</SelectItem>
                        <SelectItem value="macd">MACD</SelectItem>
                        <SelectItem value="ma">Скользящая средняя</SelectItem>
                        <SelectItem value="bb">Полосы Боллинджера</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="technical-condition">Условие</Label>
                    <Select defaultValue="above">
                      <SelectTrigger id="technical-condition" className="w-full">
                        <SelectValue placeholder="Выберите условие" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="above">Выше чем</SelectItem>
                        <SelectItem value="below">Ниже чем</SelectItem>
                        <SelectItem value="crossover">Пересечение</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="technical-value">Значение</Label>
                    <Input id="technical-value" type="number" placeholder="Например: 70" defaultValue="70" />
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2 mt-2">
                <Switch id="important-alert" />
                <Label htmlFor="important-alert">Пометить как важное уведомление</Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
            >
              Отмена
            </Button>
            <Button 
              onClick={() => {
                // Тут будет логика сохранения уведомления
                setShowAddForm(false);
              }}
            >
              Сохранить уведомление
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-primary" />
                Активные уведомления
              </CardTitle>
              <CardDescription>
                Список ваших настроенных уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertsData.activeAlerts.map(alert => (
                  <div 
                    key={alert.id} 
                    className="p-3 border rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          {getAlertIcon(alert.type)}
                        </div>
                        <div>
                          <div className="font-medium">
                            {alert.type === "price" && `${alert.asset} ${alert.condition === "above" ? "выше" : "ниже"} $${alert.value}`}
                            {alert.type === "news" && `Ключевое слово: "${alert.keyword}"`}
                            {alert.type === "event" && `Событие: ${alert.event}`}
                            {alert.type === "technical" && `${alert.asset}: ${alert.indicator} ${alert.condition === "above" ? "выше" : "ниже"} ${alert.value}`}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            Создано: {alert.createdAt}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <div className="flex items-center mr-2">
                          <Switch 
                            id={`alert-switch-${alert.id}`}
                            defaultChecked={alert.status === "active"}
                          />
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    {alert.type === "price" && (
                      <div className="flex items-center mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          {getConditionIcon(alert.condition)}
                          {alert.condition === "above" ? "Выше" : "Ниже"} ${alert.value}
                        </Badge>
                      </div>
                    )}
                    {alert.type === "news" && alert.sources && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {alert.sources.map((source, index) => (
                          <Badge key={index} variant="outline">{source}</Badge>
                        ))}
                      </div>
                    )}
                    {alert.type === "event" && (
                      <div className="flex items-center mt-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {alert.date}
                        </Badge>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-amber-500" />
                Недавние срабатывания
              </CardTitle>
              <CardDescription>
                История полученных уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {alertsData.recentTriggers.map(trigger => (
                  <div 
                    key={trigger.id} 
                    className="p-3 border rounded-lg hover:bg-muted/20 transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="mt-0.5">
                          {getStatusIcon(trigger.status)}
                        </div>
                        <div>
                          <div className="font-medium">
                            {trigger.message}
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {trigger.triggeredAt}
                          </div>
                        </div>
                      </div>
                      <Badge variant={trigger.status === "triggered" ? "default" : "outline"}>
                        {trigger.status === "triggered" ? "Сработало" : "Напоминание"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <Button variant="outline" size="sm">
                Показать все уведомления
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Отслеживаемые активы</CardTitle>
              <CardDescription>
                Активы для быстрого создания уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alertsData.watchedAssets.map((asset, index) => (
                  <div 
                    key={index} 
                    className="flex justify-between items-center p-2 hover:bg-muted/20 rounded-md transition-colors"
                  >
                    <span>{asset}</span>
                    <Button variant="ghost" size="sm">
                      <Plus className="h-4 w-4 mr-1" />
                      Уведомление
                    </Button>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  <Plus className="h-4 w-4 mr-1" />
                  Добавить актив
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Настройки уведомлений</CardTitle>
              <CardDescription>
                Каналы и параметры получения уведомлений
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <Label htmlFor="email-notifications">Email уведомления</Label>
                  </div>
                  <Switch 
                    id="email-notifications" 
                    checked={settings.emailEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, emailEnabled: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                    </svg>
                    <Label htmlFor="push-notifications">Push уведомления</Label>
                  </div>
                  <Switch 
                    id="push-notifications" 
                    checked={settings.pushEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, pushEnabled: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-muted-foreground" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <Label htmlFor="sms-notifications">SMS уведомления</Label>
                  </div>
                  <Switch 
                    id="sms-notifications" 
                    checked={settings.smsEnabled}
                    onCheckedChange={(checked) => setSettings({...settings, smsEnabled: checked})}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <Label htmlFor="daily-digest">Ежедневная сводка</Label>
                  </div>
                  <Switch 
                    id="daily-digest"
                    checked={settings.dailyDigest}
                    onCheckedChange={(checked) => setSettings({...settings, dailyDigest: checked})}
                  />
                </div>
                
                <div className="pt-2 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <Label htmlFor="silent-hours" className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground" />
                      Тихие часы
                    </Label>
                    <Switch 
                      id="silent-hours" 
                      checked={settings.silentHours.enabled}
                      onCheckedChange={(checked) => setSettings({
                        ...settings, 
                        silentHours: {
                          ...settings.silentHours,
                          enabled: checked
                        }
                      })}
                    />
                  </div>
                  
                  {settings.silentHours.enabled && (
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      <div className="space-y-1">
                        <Label htmlFor="silent-from" className="text-xs">С</Label>
                        <Input 
                          id="silent-from" 
                          type="time" 
                          value={settings.silentHours.from}
                          onChange={(e) => setSettings({
                            ...settings,
                            silentHours: {
                              ...settings.silentHours,
                              from: e.target.value
                            }
                          })}
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="silent-to" className="text-xs">До</Label>
                        <Input 
                          id="silent-to" 
                          type="time" 
                          value={settings.silentHours.to}
                          onChange={(e) => setSettings({
                            ...settings,
                            silentHours: {
                              ...settings.silentHours,
                              to: e.target.value
                            }
                          })}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Сохранить настройки</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}