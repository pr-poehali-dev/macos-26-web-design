import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  featured?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Премиум наушники',
    price: 24990,
    image: 'https://cdn.poehali.dev/projects/f84a78fc-54db-4591-8ad1-5833fe908d71/files/6e8db3f3-9b93-4373-abd9-ab44f4478111.jpg',
    category: 'Аудио',
    featured: true
  },
  {
    id: 2,
    name: 'Умные часы',
    price: 34990,
    image: 'https://cdn.poehali.dev/projects/f84a78fc-54db-4591-8ad1-5833fe908d71/files/4ae46c8a-cc35-4bf6-a8dc-4487da43a186.jpg',
    category: 'Гаджеты',
    featured: true
  },
  {
    id: 3,
    name: 'Ноутбук Pro',
    price: 119990,
    image: 'https://cdn.poehali.dev/projects/f84a78fc-54db-4591-8ad1-5833fe908d71/files/35e9832f-898d-451c-aecf-59af91911a0a.jpg',
    category: 'Компьютеры',
    featured: true
  }
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<'home' | 'catalog' | 'cart' | 'about'>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');

  const categories = ['Все', 'Аудио', 'Гаджеты', 'Компьютеры'];

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = selectedCategory === 'Все'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-effect">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">Магазин</h1>
            
            <div className="flex items-center gap-1">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="text-sm"
              >
                Главная
              </Button>
              <Button
                variant={activeSection === 'catalog' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('catalog')}
                className="text-sm"
              >
                Каталог
              </Button>
              <Button
                variant={activeSection === 'about' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('about')}
                className="text-sm"
              >
                О нас
              </Button>
              <Button
                variant={activeSection === 'cart' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('cart')}
                className="relative text-sm"
              >
                <Icon name="ShoppingCart" size={18} className="mr-2" />
                Корзина
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        {activeSection === 'home' && (
          <div className="animate-fade-in">
            <section className="relative min-h-[70vh] flex items-center justify-center px-6 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: 'url(https://cdn.poehali.dev/projects/f84a78fc-54db-4591-8ad1-5833fe908d71/files/79f1c7e5-5942-40c0-8dc4-a26e573d14f8.jpg)'
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-background" />
              <div className="relative text-center max-w-4xl mx-auto space-y-6 z-10">
                <h2 className="text-6xl md:text-7xl font-bold tracking-tight animate-scale-in drop-shadow-lg">
                  Думай иначе
                </h2>
                <p className="text-xl text-foreground max-w-2xl mx-auto drop-shadow">
                  Откройте для себя новое поколение технологий. Элегантный дизайн встречается с инновациями.
                </p>
                <div className="flex gap-4 justify-center pt-4">
                  <Button size="lg" onClick={() => setActiveSection('catalog')} className="text-base shadow-lg">
                    Смотреть каталог
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('about')} className="text-base bg-white/90 backdrop-blur shadow-lg">
                    Узнать больше
                  </Button>
                </div>
              </div>
            </section>

            <section className="py-20 px-6">
              <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-bold mb-4">Популярные товары</h3>
                  <p className="text-muted-foreground text-lg">Самые востребованные продукты этого сезона</p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {products.filter(p => p.featured).map((product, index) => (
                    <Card
                      key={product.id}
                      className="overflow-hidden hover-lift cursor-pointer group animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-square overflow-hidden bg-gray-50">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div>
                          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                          <h4 className="text-xl font-semibold">{product.name}</h4>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                          <Button onClick={() => addToCart(product)}>
                            Купить
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          </div>
        )}

        {activeSection === 'catalog' && (
          <div className="py-12 px-6 animate-fade-in">
            <div className="max-w-7xl mx-auto">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-6">Каталог товаров</h2>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <Button
                      key={cat}
                      variant={selectedCategory === cat ? 'default' : 'outline'}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <Card
                    key={product.id}
                    className="overflow-hidden hover-lift cursor-pointer group animate-scale-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="p-6 space-y-4">
                      <div>
                        <Badge variant="secondary" className="mb-2">{product.category}</Badge>
                        <h4 className="text-xl font-semibold">{product.name}</h4>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold">{product.price.toLocaleString('ru-RU')} ₽</span>
                        <Button onClick={() => addToCart(product)}>
                          В корзину
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === 'cart' && (
          <div className="py-12 px-6 animate-fade-in">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8">Корзина</h2>

              {cart.length === 0 ? (
                <Card className="p-12 text-center">
                  <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-2xl font-semibold mb-2">Корзина пуста</h3>
                  <p className="text-muted-foreground mb-6">Добавьте товары из каталога</p>
                  <Button onClick={() => setActiveSection('catalog')}>
                    Перейти в каталог
                  </Button>
                </Card>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <Card key={item.id} className="p-6 animate-scale-in">
                      <div className="flex gap-6">
                        <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <h4 className="text-lg font-semibold">{item.name}</h4>
                            <Badge variant="secondary" className="mt-1">{item.category}</Badge>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Icon name="Minus" size={16} />
                            </Button>
                            <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Icon name="Plus" size={16} />
                            </Button>
                          </div>
                        </div>
                        <div className="text-right flex flex-col justify-between items-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Icon name="Trash2" size={18} />
                          </Button>
                          <span className="text-xl font-bold">
                            {(item.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}

                  <Card className="p-6 glass-effect">
                    <div className="space-y-4">
                      <div className="flex justify-between text-lg">
                        <span>Товаров:</span>
                        <span>{cartItemsCount}</span>
                      </div>
                      <div className="flex justify-between text-2xl font-bold">
                        <span>Итого:</span>
                        <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <Button size="lg" className="w-full text-lg">
                        Оформить заказ
                      </Button>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        )}

        {activeSection === 'about' && (
          <div className="py-12 px-6 animate-fade-in">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-5xl font-bold">О нашем магазине</h2>
                <p className="text-xl text-muted-foreground">
                  Мы создаём будущее технологий
                </p>
              </div>

              <Card className="p-8 md:p-12 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-3xl font-semibold">Наша миссия</h3>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Мы верим в силу инноваций и стремимся предоставить нашим клиентам лучшие технологические решения. 
                    Каждый продукт в нашем каталоге тщательно отобран и проверен на качество.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 pt-6">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon name="Award" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg">Качество</h4>
                    <p className="text-sm text-muted-foreground">Только проверенные бренды</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon name="Truck" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg">Доставка</h4>
                    <p className="text-sm text-muted-foreground">Быстрая доставка по всей стране</p>
                  </div>
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <Icon name="Shield" size={32} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg">Гарантия</h4>
                    <p className="text-sm text-muted-foreground">Официальная гарантия на все товары</p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 md:p-12 space-y-6">
                <h3 className="text-3xl font-semibold">Свяжитесь с нами</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Icon name="Mail" size={24} className="text-primary" />
                    <span className="text-lg">info@shop.com</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="Phone" size={24} className="text-primary" />
                    <span className="text-lg">+7 (800) 123-45-67</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon name="MapPin" size={24} className="text-primary" />
                    <span className="text-lg">Москва, ул. Примерная, 1</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-20 py-12 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-sm">© 2026 Магазин. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}