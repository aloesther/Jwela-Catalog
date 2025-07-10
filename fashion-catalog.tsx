"use client"

import { useState } from "react"
import { Search, Filter, Heart, ShoppingBag, Star, X, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import CartFavoritesPage from "./cart-favorites-page"

const products = [
  {
    id: 1,
    name: "Traditional Agbada - Turquoise",
    price: 100000,
    originalPrice: 120000,
    category: "Dresses",
    gender: "Male",
    image: "/images/jwela-agbada.jpg",
    rating: 4.5,
    reviews: 128,
    colors: ["Turquoise", "Navy", "White"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Denim Jacket Classic",
    price: 35000,
    category: "Outerwear",
    gender: "Unisex",
    image: "/placeholder.svg?height=400&width=300&text=Denim+Jacket",
    rating: 4.8,
    reviews: 89,
    colors: ["Light Blue", "Dark Blue"],
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "High-Waist Skinny Jeans",
    price: 28000,
    category: "Bottoms",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Skinny+Jeans",
    rating: 4.6,
    reviews: 203,
    colors: ["Black", "Blue", "Grey"],
    sizes: ["24", "26", "28", "30", "32"],
    isNew: false,
    isSale: false,
  },
  {
    id: 4,
    name: "Floral Summer Dress",
    price: 22000,
    originalPrice: 28000,
    category: "Dresses",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Summer+Dress",
    rating: 4.7,
    reviews: 156,
    colors: ["Floral Pink", "Floral Blue"],
    sizes: ["XS", "S", "M", "L"],
    isNew: false,
    isSale: true,
  },
  {
    id: 5,
    name: "Luxury Steel Wristwatch",
    price: 85000,
    category: "Accessories",
    gender: "Male",
    image: "/placeholder.svg?height=400&width=300&text=Men+Watch",
    rating: 4.9,
    reviews: 67,
    colors: ["Silver", "Gold", "Black"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Elegant Ladies Watch",
    price: 65000,
    originalPrice: 80000,
    category: "Accessories",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Ladies+Watch",
    rating: 4.8,
    reviews: 94,
    colors: ["Rose Gold", "Silver", "Gold"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
  {
    id: 7,
    name: "Leather Crossbody Bag",
    price: 45000,
    category: "Accessories",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Crossbody+Bag",
    rating: 4.6,
    reviews: 112,
    colors: ["Black", "Brown", "Tan"],
    sizes: ["One Size"],
    isNew: false,
    isSale: false,
  },
  {
    id: 8,
    name: "Men's Leather Wallet",
    price: 18000,
    category: "Accessories",
    gender: "Male",
    image: "/placeholder.svg?height=400&width=300&text=Leather+Wallet",
    rating: 4.5,
    reviews: 89,
    colors: ["Black", "Brown"],
    sizes: ["One Size"],
    isNew: false,
    isSale: false,
  },
  {
    id: 9,
    name: "Statement Necklace",
    price: 25000,
    originalPrice: 32000,
    category: "Accessories",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Statement+Necklace",
    rating: 4.4,
    reviews: 76,
    colors: ["Gold", "Silver"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
  {
    id: 10,
    name: "Men's Sunglasses",
    price: 35000,
    category: "Accessories",
    gender: "Male",
    image: "/placeholder.svg?height=400&width=300&text=Men+Sunglasses",
    rating: 4.7,
    reviews: 134,
    colors: ["Black", "Brown", "Blue"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
  {
    id: 11,
    name: "Silk Scarf",
    price: 15000,
    category: "Accessories",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Silk+Scarf",
    rating: 4.3,
    reviews: 58,
    colors: ["Floral", "Geometric", "Solid"],
    sizes: ["One Size"],
    isNew: false,
    isSale: false,
  },
  {
    id: 12,
    name: "Men's Belt",
    price: 22000,
    category: "Accessories",
    gender: "Male",
    image: "/placeholder.svg?height=400&width=300&text=Leather+Belt",
    rating: 4.6,
    reviews: 91,
    colors: ["Black", "Brown"],
    sizes: ["32", "34", "36", "38", "40"],
    isNew: false,
    isSale: false,
  },
  {
    id: 13,
    name: "Pearl Earrings",
    price: 30000,
    originalPrice: 38000,
    category: "Accessories",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Pearl+Earrings",
    rating: 4.8,
    reviews: 102,
    colors: ["White", "Cream"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
  {
    id: 14,
    name: "Sports Chronograph Watch",
    price: 120000,
    category: "Accessories",
    gender: "Male",
    image: "/placeholder.svg?height=400&width=300&text=Sports+Watch",
    rating: 4.9,
    reviews: 45,
    colors: ["Black", "Blue", "Silver"],
    sizes: ["One Size"],
    isNew: true,
    isSale: false,
  },
  {
    id: 15,
    name: "Designer Handbag",
    price: 75000,
    originalPrice: 95000,
    category: "Accessories",
    gender: "Female",
    image: "/placeholder.svg?height=400&width=300&text=Designer+Handbag",
    rating: 4.7,
    reviews: 87,
    colors: ["Black", "Beige", "Red"],
    sizes: ["One Size"],
    isNew: false,
    isSale: true,
  },
]

const categories = ["All", "Tops", "Bottoms", "Dresses", "Outerwear", "Accessories"]
const genderFilters = ["All", "Male", "Female", "Unisex"]

export default function Component() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedGender, setSelectedGender] = useState("All")
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { toast } = useToast()
  const [showCartFavoritesPage, setShowCartFavoritesPage] = useState(false)
  const [showSizeGuideDialog, setShowSizeGuideDialog] = useState(false)

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    const matchesGender = selectedGender === "All" || product.gender === selectedGender
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesGender && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)
      case "featured":
        // Featured sorting: prioritize sale items, then new items, then by rating
        const aScore = (a.isSale ? 2 : 0) + (a.isNew ? 1 : 0) + a.rating / 10
        const bScore = (b.isSale ? 2 : 0) + (b.isNew ? 1 : 0) + b.rating / 10
        return bScore - aScore
      default:
        return 0
    }
  })

  const toggleFavorite = (productId: number) => {
    const isFav = favorites.includes(productId)
    const newFavorites = isFav ? favorites.filter((id) => id !== productId) : [...favorites, productId]

    setFavorites(newFavorites)

    const product = products.find((p) => p.id === productId)
    toast({
      title: isFav ? "Removed from favorites" : "Added to favorites",
      description: product?.name,
      duration: 2000,
    })
  }

  const handleAddToCart = (product: any) => {
    setSelectedProduct(product)
    setShowOrderDialog(true)

    if (!cart.includes(product.id)) {
      setCart([...cart, product.id])
      toast({
        title: "Added to cart",
        description: product.name,
        duration: 2000,
      })
    }
    setCart((prev) => {
      if (!prev.includes(product.id)) {
        toast({
          title: "Added to cart",
          description: product.name,
          duration: 2000,
        })
        return [...prev, product.id]
      }
      return prev
    })
  }

  const getWhatsAppDetails = (category: string) => {
    if (category === "Accessories") {
      return {
        phone: "2348169061610",
        instagramHandle: "@jwela.shop",
        instagram:
          "https://www.instagram.com/jwela.shop?utm_source=ig_web_button_share_sheet&igsh=MWo4b2Zwemo5OXdzeg==",
      }
    } else {
      return {
        phone: "2348067142622",
        instagramHandle: "@jwela.apparel",
        instagram: "https://www.instagram.com/jwela.apparel?utm_source=ig_web_button_share_sheet&igsh=c3A5cHMwODl4djB4",
      }
    }
  }

  const handleViewCartFavorites = () => {
    setShowCartFavoritesPage(true)
  }

  const handleBackToMain = () => {
    setShowCartFavoritesPage(false)
  }

  if (showCartFavoritesPage) {
    return <CartFavoritesPage initialCart={cart} initialFavorites={favorites} onBack={handleBackToMain} />
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/jwela-logo-clean.png" alt="Jwela" className="h-10 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              {/* Favorites Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Heart className="h-5 w-5" />
                    {favorites.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {favorites.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Favorites ({favorites.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {favorites.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">No favorites yet</p>
                    ) : (
                      favorites.map((favoriteId) => {
                        const product = products.find((p) => p.id === favoriteId)
                        if (!product) return null
                        return (
                          <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-lg font-bold text-green-600">₦{product.price.toLocaleString()}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <Button size="sm" onClick={() => handleAddToCart(product)}>
                                Add to Cart
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => toggleFavorite(product.id)}>
                                Remove
                              </Button>
                            </div>
                          </div>
                        )
                      })
                    )}
                    {favorites.length > 0 && (
                      <Button
                        variant="outline"
                        className="w-full mt-4 bg-transparent"
                        onClick={handleViewCartFavorites}
                      >
                        View All Favorites
                      </Button>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

              {/* Cart Sheet */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <ShoppingBag className="h-5 w-5" />
                    {cart.length > 0 && (
                      <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                        {cart.length}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Shopping Cart ({cart.length})</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-muted-foreground text-center py-8">Your cart is empty</p>
                    ) : (
                      <>
                        {cart.map((cartId) => {
                          const product = products.find((p) => p.id === cartId)
                          if (!product) return null
                          return (
                            <div key={product.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <img
                                src={product.image || "/placeholder.svg"}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-sm">{product.name}</h4>
                                <p className="text-lg font-bold text-green-600">₦{product.price.toLocaleString()}</p>
                              </div>
                              <div className="flex flex-col gap-2">
                                <Button size="sm" onClick={() => handleAddToCart(product)}>
                                  Order Now
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setCart((prev) => prev.filter((id) => id !== cartId))
                                    toast({
                                      title: "Removed from cart",
                                      description: product.name,
                                      duration: 2000,
                                    })
                                  }}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                        <Separator />
                        <div className="space-y-2">
                          <div className="flex justify-between items-center font-semibold">
                            <span>Total:</span>
                            <span className="text-xl text-green-600">
                              ₦
                              {cart
                                .reduce((total, cartId) => {
                                  const product = products.find((p) => p.id === cartId)
                                  return total + (product?.price || 0)
                                }, 0)
                                .toLocaleString()}
                            </span>
                          </div>
                          <Button className="w-full" size="lg">
                            Checkout All Items
                          </Button>
                          <Button variant="outline" className="w-full bg-transparent" onClick={handleViewCartFavorites}>
                            View All Cart Items
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

 {/* Hero Section */}
<section className="relative overflow-hidden">
  {/* Desktop Banner */}
  <div className="hidden md:block relative">
    <img
      src="/Jwela Website Header (1).jpg"
      alt="Fashion Banner"
      className="w-full h-auto max-h-[500px] object-contain"
    />

    {/* Optional overlay for better text readability if needed */}
    <div className="absolute inset-0 bg-black/10"></div>

    {/* Content positioned over the banner */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          </p>
          <Button size="lg" className="px-8 bg-white text-black hover:bg-gray-100 font-semibold">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  </div>

  {/* Mobile Banner */}
  <div className="md:hidden relative">
    <img
      src="/Jwela Website Header (1).jpg"
      alt="Fashion Banner"
      className="w-full h-auto object-contain"
    />

    {/* Stronger overlay for mobile readability */}
    <div className="absolute inset-0 bg-black/30"></div>

    {/* Mobile Content */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 drop-shadow-lg">New Collection</h2>
          <p className="text-base sm:text-lg mb-6 max-w-sm mx-auto drop-shadow-md opacity-90">
            Discover our fashion essentials
          </p>
          <Button size="default" className="px-6 bg-white text-black hover:bg-gray-100 font-semibold">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>
      
      {/* Filters and Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Sort by
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                  <DropdownMenuRadioItem value="featured">Featured</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="newest">Newest</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gender Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-sm font-medium text-muted-foreground self-center mr-2">Gender:</span>
          {genderFilters.map((gender) => (
            <Button
              key={gender}
              variant={selectedGender === gender ? "default" : "outline"}
              onClick={() => setSelectedGender(gender)}
              size="sm"
              className="rounded-full"
            >
              {gender}
            </Button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="group cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                    {product.isSale && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
                  </div>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                  >
                    <Heart className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`} />
                  </Button>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground ml-1">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.colors.slice(0, 3).map((color, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {color}
                      </Badge>
                    ))}
                    {product.colors.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.colors.length - 3}
                      </Badge>
                    )}
                  </div>
                  <Button className="w-full" onClick={() => handleAddToCart(product)}>
                    Add to Cart
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Complete Your Order
              <Button variant="ghost" size="icon" onClick={() => setShowOrderDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>
              Contact us on WhatsApp to complete your order and discuss delivery details
            </DialogDescription>
          </DialogHeader>

          {selectedProduct && (
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                <img
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div>
                  <h4 className="font-semibold">{selectedProduct.name}</h4>
                  <p className="text-lg font-bold text-green-600">₦{selectedProduct.price.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2 text-sm">Why WhatsApp?</h4>
                <ul className="text-xs text-blue-700 space-y-1">
                  <li>• Get accurate delivery fees for your location</li>
                  <li>• Confirm availability and specifications</li>
                  <li>• Personalized customer service & order tracking</li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">📱</span>
                  </div>
                  <span className="font-semibold text-green-800 text-sm">Complete Order on WhatsApp</span>
                </div>
                <p className="text-xs text-green-700 mb-3">
                  Chat with our team to finalize your order, get delivery quotes, and arrange payment.
                </p>
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <div>
                    <span className="text-xs font-medium">
                      {(() => {
                        const whatsappDetails = getWhatsAppDetails(selectedProduct.category)
                        return whatsappDetails.instagramHandle
                      })()}
                    </span>
                    <p className="text-xs text-gray-600">
                      {(() => {
                        const whatsappDetails = getWhatsAppDetails(selectedProduct.category)
                        return `+${whatsappDetails.phone}`
                      })()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1"
                    onClick={() => {
                      const whatsappDetails = getWhatsAppDetails(selectedProduct.category)
                      const message = `Hi! I'm interested in ordering this product:

Product: ${selectedProduct.name}
Price: ₦${selectedProduct.price.toLocaleString()}

Please let me know:
- Delivery fee to my location
- Payment options
- Delivery timeline

Thank you!`
                      const whatsappUrl = `https://wa.me/${whatsappDetails.phone}?text=${encodeURIComponent(message)}`
                      window.open(whatsappUrl, "_blank")
                      setShowOrderDialog(false)
                    }}
                  >
                    💬 Chat on WhatsApp
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-3 rounded-lg border border-pink-200">
                <div className="flex items-center gap-2 mb-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  <span className="font-semibold text-pink-800 text-sm">Follow us on Instagram</span>
                </div>
                <p className="text-xs text-pink-700 mb-2">
                  Stay updated with our latest collections and exclusive offers!
                </p>
                <div className="flex items-center justify-between bg-white p-2 rounded border">
                  <span className="text-xs font-medium">
                    {(() => {
                      const whatsappDetails = getWhatsAppDetails(selectedProduct.category)
                      return whatsappDetails.instagramHandle
                    })()}
                  </span>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white border-none hover:from-pink-600 hover:to-purple-700 text-xs px-2 py-1"
                    onClick={() => {
                      const whatsappDetails = getWhatsAppDetails(selectedProduct.category)
                      window.open(whatsappDetails.instagram, "_blank")
                    }}
                  >
                    <Instagram className="h-3 w-3 mr-1" />
                    Follow
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                <p className="text-xs text-yellow-800">
                  <strong>Order Process:</strong>
                  <br />
                  1. Click "Order on WhatsApp" below
                  <br />
                  2. Discuss delivery location and fees
                  <br />
                  3. Confirm order details and payment
                  <br />
                  4. Complete payment and provide address
                  <br />
                  5. Receive confirmation and tracking info
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-green-500 hover:bg-green-600"
                  onClick={() => {
                    const whatsappDetails = getWhatsAppDetails(selectedProduct.category)
                    const message = `Hi! I'm interested in ordering this product:

Product: ${selectedProduct.name}
Price: ₦${selectedProduct.price.toLocaleString()}

Please let me know:
- Delivery fee to my location
- Payment options
- Delivery timeline

Thank you!`
                    const whatsappUrl = `https://wa.me/${whatsappDetails.phone}?text=${encodeURIComponent(message)}`
                    window.open(whatsappUrl, "_blank")
                    setShowOrderDialog(false)
                  }}
                >
                  💬 Order on WhatsApp
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent" onClick={() => setShowOrderDialog(false)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Size Guide Dialog */}
      <Dialog open={showSizeGuideDialog} onOpenChange={setShowSizeGuideDialog}>
        <DialogContent className="sm:max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              Size Guide
              <Button variant="ghost" size="icon" onClick={() => setShowSizeGuideDialog(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
            <DialogDescription>Find your perfect fit with our comprehensive size guide</DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {/* Clothing Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Clothing Sizes</h3>

              {/* Women's Clothing */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-pink-600">Women's Clothing</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Bust (inches)</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Waist (inches)</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Hips (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">XS</td>
                        <td className="border border-gray-300 px-3 py-2">30-32</td>
                        <td className="border border-gray-300 px-3 py-2">24-26</td>
                        <td className="border border-gray-300 px-3 py-2">34-36</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">S</td>
                        <td className="border border-gray-300 px-3 py-2">32-34</td>
                        <td className="border border-gray-300 px-3 py-2">26-28</td>
                        <td className="border border-gray-300 px-3 py-2">36-38</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">M</td>
                        <td className="border border-gray-300 px-3 py-2">34-36</td>
                        <td className="border border-gray-300 px-3 py-2">28-30</td>
                        <td className="border border-gray-300 px-3 py-2">38-40</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">L</td>
                        <td className="border border-gray-300 px-3 py-2">36-38</td>
                        <td className="border border-gray-300 px-3 py-2">30-32</td>
                        <td className="border border-gray-300 px-3 py-2">40-42</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">XL</td>
                        <td className="border border-gray-300 px-3 py-2">38-40</td>
                        <td className="border border-gray-300 px-3 py-2">32-34</td>
                        <td className="border border-gray-300 px-3 py-2">42-44</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">XXL</td>
                        <td className="border border-gray-300 px-3 py-2">40-42</td>
                        <td className="border border-gray-300 px-3 py-2">34-36</td>
                        <td className="border border-gray-300 px-3 py-2">44-46</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Men's Clothing */}
              <div className="mb-6">
                <h4 className="font-medium mb-3 text-blue-600">Men's Clothing</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left">Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Chest (inches)</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Waist (inches)</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Neck (inches)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">S</td>
                        <td className="border border-gray-300 px-3 py-2">34-36</td>
                        <td className="border border-gray-300 px-3 py-2">28-30</td>
                        <td className="border border-gray-300 px-3 py-2">14-14.5</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">M</td>
                        <td className="border border-gray-300 px-3 py-2">38-40</td>
                        <td className="border border-gray-300 px-3 py-2">32-34</td>
                        <td className="border border-gray-300 px-3 py-2">15-15.5</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">L</td>
                        <td className="border border-gray-300 px-3 py-2">42-44</td>
                        <td className="border border-gray-300 px-3 py-2">36-38</td>
                        <td className="border border-gray-300 px-3 py-2">16-16.5</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">XL</td>
                        <td className="border border-gray-300 px-3 py-2">46-48</td>
                        <td className="border border-gray-300 px-3 py-2">40-42</td>
                        <td className="border border-gray-300 px-3 py-2">17-17.5</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">XXL</td>
                        <td className="border border-gray-300 px-3 py-2">50-52</td>
                        <td className="border border-gray-300 px-3 py-2">44-46</td>
                        <td className="border border-gray-300 px-3 py-2">18-18.5</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Accessories Sizes */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Accessories</h3>

              {/* Watch Sizes */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Watch Sizes</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    <strong>Wrist Measurement Guide:</strong>
                  </p>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Small: 5.5" - 6.5" (14cm - 16.5cm)</li>
                    <li>• Medium: 6.5" - 7.5" (16.5cm - 19cm)</li>
                    <li>• Large: 7.5" - 8.5" (19cm - 21.5cm)</li>
                  </ul>
                  <p className="text-xs text-blue-600 mt-2">
                    Most of our watches come with adjustable straps to fit various wrist sizes.
                  </p>
                </div>
              </div>

              {/* Belt Sizes */}
              <div className="mb-4">
                <h4 className="font-medium mb-3">Belt Sizes</h4>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-300 px-3 py-2 text-left">Belt Size</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Waist Size (inches)</th>
                        <th className="border border-gray-300 px-3 py-2 text-left">Waist Size (cm)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">32</td>
                        <td className="border border-gray-300 px-3 py-2">30-32</td>
                        <td className="border border-gray-300 px-3 py-2">76-81</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">34</td>
                        <td className="border border-gray-300 px-3 py-2">32-34</td>
                        <td className="border border-gray-300 px-3 py-2">81-86</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">36</td>
                        <td className="border border-gray-300 px-3 py-2">34-36</td>
                        <td className="border border-gray-300 px-3 py-2">86-91</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">38</td>
                        <td className="border border-gray-300 px-3 py-2">36-38</td>
                        <td className="border border-gray-300 px-3 py-2">91-97</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 font-medium">40</td>
                        <td className="border border-gray-300 px-3 py-2">38-40</td>
                        <td className="border border-gray-300 px-3 py-2">97-102</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Measurement Tips */}
            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
              <h4 className="font-medium mb-2 text-yellow-800">How to Measure</h4>
              <div className="text-sm text-yellow-700 space-y-2">
                <p>
                  <strong>Bust/Chest:</strong> Measure around the fullest part of your chest
                </p>
                <p>
                  <strong>Waist:</strong> Measure around your natural waistline
                </p>
                <p>
                  <strong>Hips:</strong> Measure around the fullest part of your hips
                </p>
                <p>
                  <strong>Wrist:</strong> Measure around your wrist bone
                </p>
              </div>
            </div>

            {/* Contact for Help */}
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <h4 className="font-medium mb-2 text-green-800">Need Help with Sizing?</h4>
              <p className="text-sm text-green-700 mb-3">
                Still unsure about your size? Contact us on WhatsApp for personalized sizing assistance!
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-600 text-white border-green-600 hover:bg-green-700"
                  onClick={() => {
                    const message = "Hi! I need help with sizing for a product. Can you assist me?"
                    const whatsApp = `https://wa.me/2348169061610?text=${encodeURIComponent(message)}`
                    window.open(whatsApp, "_blank")
                    setShowSizeGuideDialog(false)
                  }}
                >
                  WhatsApp Accessories
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="bg-green-600 text-white border-green-600 hover:bg-green-700"
                  onClick={() => {
                    const message = "Hi! I need help with sizing for clothing. Can you assist me?"
                    const whatsApp = `https://wa.me/2348067142622?text=${encodeURIComponent(message)}`
                    window.open(whatsApp, "_blank")
                    setShowSizeGuideDialog(false)
                  }}
                >
                  WhatsApp Outfits
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Footer */}
      <footer className="bg-slate-50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">JWELA</h3>
              <p className="text-muted-foreground">
                Premium apparel and accessories brand focused on quality, style, and sustainability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <button
                    className="hover:text-foreground transition-colors text-left"
                    onClick={() => {
                      setShowSizeGuideDialog(true)
                    }}
                  >
                    Size Guide
                  </button>
                </li>
                <li>
                  <div className="space-y-1">
                    <p className="font-medium text-foreground">Contact</p>
                    <div className="text-sm space-y-1">
                      <button
                        onClick={() => {
                          const message =
                            "Hello! I'm interested in your accessories. Can you help me with more information?"
                          const accessoriesWhatsApp = `https://wa.me/2348169061610?text=${encodeURIComponent(message)}`
                          window.open(accessoriesWhatsApp, "_blank")
                          toast({
                            title: "Opening WhatsApp",
                            description: "Accessories support",
                            duration: 2000,
                          })
                        }}
                        className="block text-green-600 hover:text-green-700 transition-colors underline text-sm"
                      >
                        WhatsApp Accessories (+234 816 906 1610)
                      </button>
                      <button
                        onClick={() => {
                          const message =
                            "Hello! I'm interested in your outfits. Can you help me with more information?"
                          const outfitsWhatsApp = `https://wa.me/2348067142622?text=${encodeURIComponent(message)}`
                          window.open(outfitsWhatsApp, "_blank")
                          toast({
                            title: "Opening WhatsApp",
                            description: "Outfits support",
                            duration: 2000,
                          })
                        }}
                        className="block text-green-600 hover:text-green-700 transition-colors underline text-sm"
                      >
                        WhatsApp Outfits (+234 806 714 2622)
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="https://www.instagram.com/jwela.shop?utm_source=ig_web_button_share_sheet&igsh=MWo4b2Zwemo5OXdzeg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors"
                  >
                    @jwela.shop (Accessories)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/jwela.apparel?utm_source=ig_web_button_share_sheet&igsh=c3A5cHMwODl4djB4"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors"
                  >
                    @jwela.apparel (Outfits)
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 Jwela Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
