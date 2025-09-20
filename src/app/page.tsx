'use client'

import { useState } from 'react'
import { ShoppingCart, User, Search, Menu, X, Plus, Minus, Star, Truck, Shield, RefreshCw, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  colors: string[]
  sizes: string[]
  rating: number
  reviews: number
  description: string
  features: string[]
}

interface CartItem extends Product {
  quantity: number
  selectedColor: string
  selectedSize: string
}

const products: Product[] = [
  {
    id: 1,
    name: "Grind Nation Performance Hoodie",
    price: 49.99,
    originalPrice: 69.99,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop",
    category: "hoodies",
    colors: ["Black", "Gray", "Navy", "Red"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 124,
    description: "Premium quality hoodie perfect for your workout sessions and casual wear.",
    features: ["100% Cotton", "Pre-shrunk", "Machine Washable", "Unisex Fit"]
  },
  {
    id: 2,
    name: "Beast Mode Training Tee",
    price: 24.99,
    originalPrice: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "t-shirts",
    colors: ["Black", "White", "Red", "Orange"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 89,
    description: "Lightweight and breathable tee for intense training sessions.",
    features: ["Moisture-Wicking", "Breathable Fabric", "Athletic Fit", "Fade Resistant"]
  },
  {
    id: 3,
    name: "Grind Nation Motivational Mug",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop",
    category: "mugs",
    colors: ["Black", "White", "Red"],
    sizes: ["11oz", "15oz"],
    rating: 4.7,
    reviews: 156,
    description: "Start your day with motivation. Perfect for your pre-workout coffee or post-workout protein shake.",
    features: ["Ceramic", "Dishwasher Safe", "Microwave Safe", "Fade Resistant Print"]
  },
  {
    id: 4,
    name: "No Excuses Workout Hoodie",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    category: "hoodies",
    colors: ["Black", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.6,
    reviews: 78,
    description: "Heavy-duty hoodie for serious athletes who never make excuses.",
    features: ["Heavy Cotton Blend", "Reinforced Seams", "Kangaroo Pocket", "Drawstring Hood"]
  },
  {
    id: 5,
    name: "Strength & Honor Tee",
    price: 22.99,
    image: "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
    category: "t-shirts",
    colors: ["Black", "White", "Gray", "Navy"],
    sizes: ["S", "M", "L", "XL", "XXL"],
    rating: 4.8,
    reviews: 203,
    description: "Classic fit tee with inspiring message for your fitness journey.",
    features: ["Soft Cotton", "Comfortable Fit", "Durable Print", "Pre-shrunk"]
  },
  {
    id: 6,
    name: "Fuel Your Fire Mug",
    price: 17.99,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
    category: "mugs",
    colors: ["Black", "Red", "Orange"],
    sizes: ["11oz", "15oz"],
    rating: 4.5,
    reviews: 92,
    description: "Ignite your passion with every sip. Perfect for your morning routine.",
    features: ["High-Quality Ceramic", "Comfortable Handle", "Heat Resistant", "Vibrant Colors"]
  }
]

export default function GrindNationStore() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isCustomerAreaOpen, setIsCustomerAreaOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const addToCart = (product: Product, color: string, size: string) => {
    const existingItem = cart.find(item => 
      item.id === product.id && item.selectedColor === color && item.selectedSize === size
    )

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setCart([...cart, { ...product, quantity: 1, selectedColor: color, selectedSize: size }])
    }
  }

  const removeFromCart = (id: number, color: string, size: string) => {
    setCart(cart.filter(item => !(item.id === id && item.selectedColor === color && item.selectedSize === size)))
  }

  const updateQuantity = (id: number, color: string, size: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id, color, size)
    } else {
      setCart(cart.map(item =>
        item.id === id && item.selectedColor === color && item.selectedSize === size
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  const cartItemsCount = cart.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-black text-white sticky top-0 z-50 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                GN
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                GRIND NATION
              </h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => setSelectedCategory('all')}
                className={`hover:text-orange-500 transition-colors ${selectedCategory === 'all' ? 'text-orange-500' : ''}`}
              >
                All Products
              </button>
              <button 
                onClick={() => setSelectedCategory('hoodies')}
                className={`hover:text-orange-500 transition-colors ${selectedCategory === 'hoodies' ? 'text-orange-500' : ''}`}
              >
                Hoodies
              </button>
              <button 
                onClick={() => setSelectedCategory('t-shirts')}
                className={`hover:text-orange-500 transition-colors ${selectedCategory === 't-shirts' ? 'text-orange-500' : ''}`}
              >
                T-Shirts
              </button>
              <button 
                onClick={() => setSelectedCategory('mugs')}
                className={`hover:text-orange-500 transition-colors ${selectedCategory === 'mugs' ? 'text-orange-500' : ''}`}
              >
                Mugs
              </button>
            </nav>

            {/* Search Bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Dialog open={isCustomerAreaOpen} onOpenChange={setIsCustomerAreaOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-orange-500">
                    <User className="w-5 h-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Customer Area</DialogTitle>
                  </DialogHeader>
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Login</TabsTrigger>
                      <TabsTrigger value="orders">My Orders</TabsTrigger>
                    </TabsList>
                    <TabsContent value="login" className="space-y-4">
                      <Input placeholder="Email" type="email" />
                      <Input placeholder="Password" type="password" />
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                        Sign In
                      </Button>
                      <p className="text-sm text-center text-gray-600">
                        Don't have an account? <span className="text-orange-500 cursor-pointer">Sign up</span>
                      </p>
                    </TabsContent>
                    <TabsContent value="orders" className="space-y-4">
                      <div className="text-center py-8 text-gray-500">
                        <Truck className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p>No orders yet</p>
                        <p className="text-sm">Your order history will appear here</p>
                      </div>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>

              <Dialog open={isCartOpen} onOpenChange={setIsCartOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:text-orange-500 relative">
                    <ShoppingCart className="w-5 h-5" />
                    {cartItemsCount > 0 && (
                      <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-1.5 py-0.5 rounded-full min-w-[20px] h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </Badge>
                    )}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Shopping Cart ({cartItemsCount} items)</DialogTitle>
                  </DialogHeader>
                  {cart.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <ShoppingCart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                      <p>Your cart is empty</p>
                      <p className="text-sm">Add some products to get started</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map((item) => (
                        <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex items-center space-x-4 p-4 border rounded-lg">
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">{item.name}</h4>
                            <p className="text-xs text-gray-500">{item.selectedColor} • {item.selectedSize}</p>
                            <p className="font-bold text-orange-600">${item.price}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity - 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                              className="w-8 h-8 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize)}
                            className="text-red-500 hover:text-red-700 p-1"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-4">
                          <span className="font-bold">Total: ${cartTotal.toFixed(2)}</span>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                          Proceed to Checkout
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden border-t border-gray-800 py-4">
              <div className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                  />
                </div>
                <nav className="flex flex-col space-y-2">
                  <button 
                    onClick={() => { setSelectedCategory('all'); setIsMobileMenuOpen(false) }}
                    className={`text-left py-2 hover:text-orange-500 transition-colors ${selectedCategory === 'all' ? 'text-orange-500' : ''}`}
                  >
                    All Products
                  </button>
                  <button 
                    onClick={() => { setSelectedCategory('hoodies'); setIsMobileMenuOpen(false) }}
                    className={`text-left py-2 hover:text-orange-500 transition-colors ${selectedCategory === 'hoodies' ? 'text-orange-500' : ''}`}
                  >
                    Hoodies
                  </button>
                  <button 
                    onClick={() => { setSelectedCategory('t-shirts'); setIsMobileMenuOpen(false) }}
                    className={`text-left py-2 hover:text-orange-500 transition-colors ${selectedCategory === 't-shirts' ? 'text-orange-500' : ''}`}
                  >
                    T-Shirts
                  </button>
                  <button 
                    onClick={() => { setSelectedCategory('mugs'); setIsMobileMenuOpen(false) }}
                    className={`text-left py-2 hover:text-orange-500 transition-colors ${selectedCategory === 'mugs' ? 'text-orange-500' : ''}`}
                  >
                    Mugs
                  </button>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-black via-gray-900 to-black text-white py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            FUEL YOUR GRIND
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-300">
            Premium fitness apparel for those who never quit
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white px-8 py-3 text-lg"
              onClick={() => setSelectedCategory('all')}
            >
              Shop Now
            </Button>
            <div className="flex items-center space-x-6 text-sm">
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-orange-500" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-orange-500" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-5 h-5 text-orange-500" />
                <span>Easy Returns</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-0">
              {selectedCategory === 'all' ? 'All Products' : 
               selectedCategory === 'hoodies' ? 'Hoodies' :
               selectedCategory === 't-shirts' ? 'T-Shirts' : 'Mugs'}
            </h3>
            <div className="text-sm text-gray-600">
              {filteredProducts.length} products found
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.originalPrice && (
                    <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                      SALE
                    </Badge>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-gray-700 hover:text-red-500"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">({product.reviews})</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="text-xl font-bold text-orange-600">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700"
                        onClick={() => setSelectedProduct(product)}
                      >
                        Customize & Add to Cart
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                      {selectedProduct && (
                        <ProductCustomizer 
                          product={selectedProduct} 
                          onAddToCart={addToCart}
                        />
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-full flex items-center justify-center font-bold text-sm">
                  GN
                </div>
                <h3 className="text-xl font-bold">GRIND NATION</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Premium fitness apparel for those who never quit. Fuel your grind with our high-quality products.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Size Guide</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Shipping Info</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Returns</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-orange-500 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Track Order</a></li>
                <li><a href="#" className="hover:text-orange-500 transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <p className="text-gray-400 text-sm mb-4">
                Follow us for fitness motivation and new product updates.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">ig</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-orange-500 transition-colors cursor-pointer">
                  <span className="text-xs font-bold">tw</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 Grind Nation. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

function ProductCustomizer({ product, onAddToCart }: { product: Product, onAddToCart: (product: Product, color: string, size: string) => void }) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  const handleAddToCart = () => {
    onAddToCart(product, selectedColor, selectedSize)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg"
          />
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="text-2xl font-bold">{product.name}</h3>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600 ml-2">({product.reviews} reviews)</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-600">${product.price}</span>
            {product.originalPrice && (
              <span className="text-lg text-gray-500 line-through">${product.originalPrice}</span>
            )}
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div>
            <h4 className="font-semibold mb-2">Color:</h4>
            <div className="flex space-x-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 border rounded-md text-sm ${
                    selectedColor === color 
                      ? 'border-orange-500 bg-orange-50 text-orange-700' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Size:</h4>
            <Select value={selectedSize} onValueChange={setSelectedSize}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Features:</h4>
            <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <Button 
            onClick={handleAddToCart}
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-lg py-3"
          >
            Add to Cart - ${product.price}
          </Button>
        </div>
      </div>
    </div>
  )
}