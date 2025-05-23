import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Newspaper, ExternalLink, Share2, Bookmark, Clock } from "lucide-react";

// Данные статей (в реальном приложении должны загружаться с API)
const newsData = [
  {
    id: 1,
    title: "Аналитики предсказывают рост биткоина до $80,000 к концу 2025 года",
    summary: "Согласно последним прогнозам ведущих аналитиков, рост институционального интереса может привести к историческому максимуму стоимости основной криптовалюты.",
    date: "19 мая 2025",
    category: "Прогнозы",
    imageUrl: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=600&auto=format&fit=crop",
    source: "CryptoDaily"
  },
  {
    id: 2,
    title: "Центральные банки ускоряют разработку цифровых валют (CBDC)",
    summary: "Более 80% центральных банков в мире активно разрабатывают собственные цифровые валюты в ответ на рост популярности криптовалют и изменение привычек потребителей.",
    date: "18 мая 2025",
    category: "Регулирование",
    imageUrl: "https://images.unsplash.com/photo-1565514020179-026b5f8dce52?w=600&auto=format&fit=crop",
    source: "Financial Times"
  },
  {
    id: 3,
    title: "Новая технология блокчейн способна обрабатывать 100,000 транзакций в секунду",
    summary: "Стартап из Сингапура представил инновационное решение проблемы масштабируемости блокчейна, которое может совершить революцию в скорости обработки транзакций.",
    date: "17 мая 2025",
    category: "Технологии",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?w=600&auto=format&fit=crop",
    source: "TechCrunch"
  },
  {
    id: 4,
    title: "Крупнейшие банки мира интегрируют криптовалютные сервисы для розничных клиентов",
    summary: "JPMorgan, Bank of America и HSBC объявили о запуске услуг по хранению и обмену криптовалют для своих клиентов, сигнализируя о новой эре принятия цифровых активов.",
    date: "16 мая 2025",
    category: "Финансы",
    imageUrl: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?w=600&auto=format&fit=crop",
    source: "Wall Street Journal"
  }
];

// Новая функция 4: Новостная лента с актуальными событиями в мире финансов
export function NewsSection() {
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  
  const toggleSave = (id: number) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(articleId => articleId !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };
  
  const formatDate = (dateStr: string) => {
    return dateStr;
  };
  
  const getCategoryColor = (category: string) => {
    switch(category) {
      case "Прогнозы":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Регулирование":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Технологии":
        return "bg-green-100 text-green-800 border-green-200";
      case "Финансы":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <section className="py-16 bg-background-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Новости финансового мира
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Будьте в курсе последних событий, трендов и новостей из мира финансов, 
            криптовалют и инвестиций.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {newsData.map(article => (
            <Card key={article.id} className="shadow hover:shadow-lg transition-shadow duration-300 border-0 overflow-hidden flex flex-col">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <Badge className={`absolute top-3 left-3 ${getCategoryColor(article.category)}`}>
                  {article.category}
                </Badge>
              </div>
              
              <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-bold line-clamp-2">
                    {article.title}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="mt-0.5 text-muted-foreground hover:text-primary"
                    onClick={() => toggleSave(article.id)}
                  >
                    <Bookmark 
                      className={`h-5 w-5 ${savedArticles.includes(article.id) ? 'fill-primary text-primary' : ''}`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                <p className="text-muted-foreground line-clamp-3 text-sm mb-4">
                  {article.summary}
                </p>
                
                <div className="mt-auto space-y-3">
                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>{formatDate(article.date)}</span>
                    </div>
                    <span>{article.source}</span>
                  </div>
                  
                  <div className="flex justify-between items-center pt-2">
                    <Button variant="outline" size="sm" className="text-xs gap-1">
                      <Share2 className="h-3 w-3" />
                      Поделиться
                    </Button>
                    <Button className="text-xs gap-1" size="sm">
                      Читать далее
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button variant="outline" className="gap-2">
            <Newspaper className="h-4 w-4" />
            Показать все новости
          </Button>
        </div>
      </div>
    </section>
  );
}