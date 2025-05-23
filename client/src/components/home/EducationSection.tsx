import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Book, Video, FileText, BookOpen, ArrowRight, Lightbulb, BarChart } from "lucide-react";

// Структура образовательных материалов
const educationContent = {
  beginners: [
    {
      id: 1,
      title: "Основы личных финансов",
      type: "article",
      duration: "10 мин чтения",
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "Что такое инвестиции и как начать",
      type: "video",
      duration: "18 мин",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      title: "Управление рисками для начинающих",
      type: "guide",
      duration: "15 мин чтения",
      image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?w=400&auto=format&fit=crop"
    },
    {
      id: 4,
      title: "Как составить финансовый план",
      type: "video",
      duration: "22 мин",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&auto=format&fit=crop"
    }
  ],
  intermediate: [
    {
      id: 5,
      title: "Фундаментальный анализ активов",
      type: "course",
      duration: "5 уроков",
      image: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=400&auto=format&fit=crop"
    },
    {
      id: 6,
      title: "Технический анализ рынков",
      type: "video",
      duration: "35 мин",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&auto=format&fit=crop"
    },
    {
      id: 7,
      title: "Диверсификация портфеля",
      type: "article",
      duration: "12 мин чтения",
      image: "https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=400&auto=format&fit=crop"
    },
    {
      id: 8,
      title: "Психология инвестора",
      type: "guide",
      duration: "20 мин чтения",
      image: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&auto=format&fit=crop"
    }
  ],
  advanced: [
    {
      id: 9,
      title: "Хеджирование рисков",
      type: "course",
      duration: "7 уроков",
      image: "https://images.unsplash.com/photo-1559526324-593bc073d938?w=400&auto=format&fit=crop"
    },
    {
      id: 10,
      title: "Опционные стратегии",
      type: "video",
      duration: "45 мин",
      image: "https://images.unsplash.com/photo-1624996752380-8ec242e0f85d?w=400&auto=format&fit=crop"
    },
    {
      id: 11,
      title: "Макроэкономические индикаторы",
      type: "article",
      duration: "18 мин чтения",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&auto=format&fit=crop"
    },
    {
      id: 12,
      title: "Построение алгоритмических стратегий",
      type: "guide",
      duration: "30 мин чтения",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&auto=format&fit=crop"
    }
  ]
};

// Иконки для типов материалов
const ContentTypeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case "article":
      return <FileText className="h-4 w-4" />;
    case "video":
      return <Video className="h-4 w-4" />;
    case "guide":
      return <BookOpen className="h-4 w-4" />;
    case "course":
      return <Book className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

// Новая функция 5: Образовательный раздел с обучающими материалами
export function EducationSection() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Финансовое образование
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Инвестируйте время в свои знания. Изучайте основы инвестирования, 
            стратегии и лучшие практики от экспертов финансового рынка.
          </p>
        </div>
        
        <Tabs defaultValue="beginners" className="max-w-5xl mx-auto">
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-3 w-full max-w-lg">
              <TabsTrigger value="beginners" className="flex flex-col md:flex-row gap-2 items-center">
                <Lightbulb className="h-5 w-5" />
                <span>Начинающим</span>
              </TabsTrigger>
              <TabsTrigger value="intermediate" className="flex flex-col md:flex-row gap-2 items-center">
                <Book className="h-5 w-5" />
                <span>Средний уровень</span>
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex flex-col md:flex-row gap-2 items-center">
                <BarChart className="h-5 w-5" />
                <span>Продвинутым</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="beginners" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {educationContent.beginners.map(item => (
                <Card key={item.id} className="shadow overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 flex items-center gap-1 px-2 py-0 h-5 text-xs">
                        <ContentTypeIcon type={item.type} />
                        <span className="capitalize">{item.type}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.duration}
                      </span>
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button className="w-full mt-2" variant="outline" size="sm">
                      Начать обучение
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="intermediate" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {educationContent.intermediate.map(item => (
                <Card key={item.id} className="shadow overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-green-50 text-green-600 border-green-100 flex items-center gap-1 px-2 py-0 h-5 text-xs">
                        <ContentTypeIcon type={item.type} />
                        <span className="capitalize">{item.type}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.duration}
                      </span>
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button className="w-full mt-2" variant="outline" size="sm">
                      Начать обучение
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="advanced" className="focus-visible:outline-none focus-visible:ring-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {educationContent.advanced.map(item => (
                <Card key={item.id} className="shadow overflow-hidden flex flex-col h-full hover:shadow-md transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-100 flex items-center gap-1 px-2 py-0 h-5 text-xs">
                        <ContentTypeIcon type={item.type} />
                        <span className="capitalize">{item.type}</span>
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {item.duration}
                      </span>
                    </div>
                    <CardTitle className="text-base font-semibold">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto pt-0">
                    <Button className="w-full mt-2" variant="outline" size="sm">
                      Начать обучение
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-10">
          <Button className="gradient-bg text-white">
            Просмотреть все обучающие материалы
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}