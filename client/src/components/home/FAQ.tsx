import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Как начать инвестировать?",
    answer: "Для начала инвестирования вам необходимо зарегистрироваться на нашей платформе, пополнить счет и выбрать подходящий инвестиционный план. После этого ваш депозит будет активирован, и вы начнете получать прибыль уже через 24 часа."
  },
  {
    question: "Как происходит вывод средств?",
    answer: "Вывод средств осуществляется через личный кабинет. Вы можете вывести как полученную прибыль, так и основную сумму инвестиции в любое время. Средства поступают на указанные вами реквизиты в течение 1-24 часов в зависимости от выбранного способа вывода."
  },
  {
    question: "Какие способы оплаты вы принимаете?",
    answer: "Мы принимаем различные способы оплаты, включая банковские карты (Visa, MasterCard), банковские переводы, а также криптовалюты (Bitcoin, Ethereum, USDT). Все транзакции проходят через защищенное соединение."
  },
  {
    question: "Как работает реферальная программа?",
    answer: "Реферальная программа позволяет вам получать дополнительный доход, приглашая новых инвесторов. За каждого приглашенного пользователя вы получаете процент от его инвестиций (от 0.1% до 0.2% в зависимости от вашего тарифа). Реферальное вознаграждение начисляется автоматически."
  },
  {
    question: "Безопасны ли мои инвестиции?",
    answer: "Мы используем передовые технологии шифрования и защиты данных для обеспечения безопасности ваших инвестиций. Наша команда экспертов внимательно следит за рынком и минимизирует потенциальные риски. Все данные пользователей хранятся в зашифрованном виде и не передаются третьим лицам."
  }
];

export function FAQ() {
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">Часто задаваемые вопросы</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Ответы на самые популярные вопросы о нашей платформе.</p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="p-4 bg-background-light hover:bg-gray-100 transition-all font-medium text-lg px-6 text-start">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="p-4 border-t border-gray-200 text-muted-foreground px-6">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
