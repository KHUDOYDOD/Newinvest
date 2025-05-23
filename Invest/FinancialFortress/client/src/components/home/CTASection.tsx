import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export function CTASection() {
  return (
    <section className="py-16 gradient-bg text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">Готовы начать инвестировать?</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">Присоединяйтесь к тысячам успешных инвесторов. Начните получать стабильный доход уже сегодня!</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth?tab=register">
            <Button className="gold-gradient text-primary font-bold py-6 px-8 rounded-lg text-lg hover:opacity-90 transition-all w-full sm:w-auto">
              Создать аккаунт
            </Button>
          </Link>
          <Link href="/auth?tab=login">
            <Button 
              variant="outline" 
              className="bg-white bg-opacity-10 text-white border-white border-opacity-30 py-6 px-8 rounded-lg text-lg hover:bg-opacity-20 transition-all w-full sm:w-auto"
            >
              Войти в систему
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
