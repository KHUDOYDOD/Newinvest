import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Phone, Mail, Clock } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

export default function LiveChat() {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "support",
      message: "Здравствуйте! Я ваш персональный консультант. Как могу помочь?",
      timestamp: new Date(Date.now() - 60000),
      type: "text"
    },
    {
      id: 2,
      sender: "user",
      message: "Подскажите, как работает система инвестиций?",
      timestamp: new Date(Date.now() - 30000),
      type: "text"
    },
    {
      id: 3,
      sender: "support",
      message: "Конечно! Наша платформа предлагает различные инвестиционные планы с доходностью от 8% до 15% в день. Хотели бы узнать подробнее о конкретном плане?",
      timestamp: new Date(Date.now() - 15000),
      type: "text"
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        sender: "user" as const,
        message: newMessage,
        timestamp: new Date(),
        type: "text" as const
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");
      setIsTyping(true);

      // Симуляция ответа поддержки
      setTimeout(() => {
        const supportResponses = [
          "Спасибо за ваш вопрос! Наш специалист свяжется с вами в течение 5 минут.",
          "Отличный вопрос! Позвольте мне найти для вас самую актуальную информацию.",
          "Понял вас. Сейчас подготовлю подробный ответ.",
          "Это важная тема. Наш финансовый консультант уже готовит для вас персональное предложение."
        ];
        
        const response = {
          id: messages.length + 2,
          sender: "support" as const,
          message: supportResponses[Math.floor(Math.random() * supportResponses.length)],
          timestamp: new Date(),
          type: "text" as const
        };
        
        setMessages(prev => [...prev, response]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const quickResponses = [
    "Как создать депозит?",
    "Когда поступят выплаты?",
    "Как работает реферальная программа?",
    "Условия вывода средств"
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-500 to-blue-600 bg-clip-text text-transparent">
          Чат с поддержкой
        </h2>
        <p className="text-muted-foreground mt-2">Получите помощь от наших экспертов в реальном времени</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Window */}
        <Card className="lg:col-span-2 h-[600px] flex flex-col">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-green-500" />
              Онлайн консультация
              <Badge variant="default" className="bg-green-500">В сети</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] p-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                      <span className="text-xs opacity-75">
                        {message.sender === 'user' ? user?.username : 'Поддержка'}
                      </span>
                    </div>
                    <p className="text-sm">{message.message}</p>
                    <p className="text-xs opacity-50 mt-1">
                      {message.timestamp.toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Bot className="h-4 w-4" />
                      <span className="text-xs">Поддержка печатает...</span>
                    </div>
                    <div className="flex space-x-1 mt-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Responses */}
            <div className="p-4 border-t">
              <p className="text-sm text-muted-foreground mb-2">Быстрые вопросы:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickResponses.map((response, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setNewMessage(response)}
                    className="text-xs"
                  >
                    {response}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Напишите ваш вопрос..."
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1"
                />
                <Button onClick={sendMessage} className="bg-green-500 hover:bg-green-600">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Support Info */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Время работы
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-sm"><strong>Пн-Пт:</strong> 9:00 - 22:00</p>
                <p className="text-sm"><strong>Сб-Вс:</strong> 10:00 - 20:00</p>
                <Badge variant="default" className="bg-green-500">Сейчас в сети</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контакты поддержки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Phone className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">+7 (495) 123-45-67</p>
                  <p className="text-sm text-muted-foreground">Горячая линия</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Mail className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">support@investpro.ru</p>
                  <p className="text-sm text-muted-foreground">Email поддержка</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Частые вопросы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium text-sm">Как быстро обрабатываются заявки?</p>
                  <p className="text-xs text-muted-foreground mt-1">Обычно в течение 1-24 часов</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium text-sm">Минимальная сумма депозита?</p>
                  <p className="text-xs text-muted-foreground mt-1">От $10 USD</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="font-medium text-sm">Есть ли комиссии?</p>
                  <p className="text-xs text-muted-foreground mt-1">Без скрытых комиссий</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}