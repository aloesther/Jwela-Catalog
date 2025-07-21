"use client"

import { useState } from "react"
import { Search, Filter, Heart, ShoppingBag, Star, X, Instagram, ChevronLeft, ChevronRight } from "lucide-react"
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
    price: 120000,
    category: "Dresses",
    gender: "Male",
    image: "/images/jwela-agbada.jpg",
    rating: 4.5,
    colors: ["Turquoise"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      turquoise: [
        "/images/jwela-agbada.jpg",
 
      ],
    },
  },
  {
    id: 2,
    name: "Casio Wristwatch",
    price: 14000,
    category: "Accessories",
    gender: "Unisex",
    image: "/images/Casio 14.jpg",
    rating: 4.8,
    colors: ["Black", "Gold", "Silver"],
    isNew: true,
    isSale: false,
    images: {
      "light blue": ["/images/Casio 14.jpg"
        
      ],
    },
  },
  {
    id: 3,
    name: "Casio Illuminator Wristwatch",
    price: 25000,
    originalPrice: 30000,
    category: "Accessories",
    gender: "Unisex",
    image: "/images/Casio Illuminator - 25.jpg",
    rating: 4.6,
    colors: ["Black", "Gold", "Silver"],
    isNew: false,
    isSale: true,
    images: {
      black: [
        "/images/Casio Illuminator - 25.jpg",
      ],
      gold: ["/images/Casio Illuminator G.jpg" ,
      ],
      black: [ "/images/Casio Illuminator G25.jpg",
      ],
      silver: ["/images/Casio Illuminator S25.jpg" ,
      ],
    },
  },
  {
    id: 4,
    name: "Curren Wristwatch",
    price: 40000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Curren 45.jpg",
    rating: 4.7,
    colors: ["Black", "Black", "Brown", "Brown"],
    isNew: true,
    isSale: false,
    images: {
      "Black": [
        "/images/Curren Bb45.jpg",
      ],
      "Black": [
        "/images/Curren B45.jpg" ,
         ],
      "Brown": [
        "/images/Curren 45.jpg" ,
         ],
      "Brown": [
        "/images/Curren Br45.jpg" ,
      ],
    },
  },
  {
    id: 5,
    name: "Daniel Wellinton Wristwatch",
    price: 15000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Daniel Wellinton 15.jpg",
    rating: 4.9,
    colors: ["Black"],
    isNew: true,
    isSale: false,
    images: {
      black: [
        "/images/Daniel Wellinton 15.jpg" ,

      ],
    },
  },
  {
    id: 6,
    name: "G shock Wristwatch",
    price: 38000,
    originalPrice: 40000,
    category: "Accessories",
    gender: "Male",
    image: "/images/G shock B38.jpg",
    rating: 4.8,
    colors: ["Black", "Gold", "White", "Gold"],
    isNew: false,
    isSale: true,
    images: {
      "black": [
        "/images/G shock B38.jpg",
      ],
      gold: [
        "/images/G shock G38.jpg",
      ],
      white: [
        "/images/G shock W38.jpg",
    
      ],
    },
  },
  {
    id: 7,
    name: "Keep moving Wristwatch",
    price: 10000,
    category: "Accessories",
    gender: "Female",
    image: "/images/Keep moving 10.jpg",
    rating: 4.6,
    colors: ["Silver"],
    isNew: false,
    isSale: false,
    images: {
      black: [
        "/images/Keep moving 10.jpg",
      ],
    },
  },
  {
    id: 8,
    name: "Leather Peodagar Wristwatch",
    price: 25000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Leather Peodagar B25.jpg",
    rating: 4.5,
    colors: ["Black", "Brown", "Brown"],
    isNew: false,
    isSale: false,
    images: {
      black: [
        "/images/Leather Peodagar B25.jpg",
      ],
      brown: [
        "/images/Leather Peodagar BR.25.jpg",
            ],
      brown: [
        "/images/Leather Peodagar BR25.jpg",
      ],
    },
  },
  {
    id: 9,
    name: "Montblanc Wristwatch",
    price: 10000,
    originalPrice: 15000,
    category: "Accessories",
    gender: "Female",
    image: "/images/Montblanc G10.jpg",
    rating: 4.4,
    colors: ["Gold"],
    isNew: false,
    isSale: true,
    images: {
      gold: [
        "/images/Montblanc G10.jpg",
      ],
    },
  },
  {
    id: 10,
    name: "Patek Philippe Wristwatch",
    price: 24000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Patek Philippe 24.jpg",
    rating: 4.7,
    colors: ["Silver", "Silver"],
    isNew: true,
    isSale: false,
    images: {
      silver: [
        "/images/Patek Philippe 24.jpg",
      ],
      silver: [
        "/images/Patek Philippe S24.jpg",
      ],
    },
  },
  {
    id: 11,
    name: "Patex Philippe Wristwatch",
    price: 25000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Patex Philippe 25.jpg",
    rating: 4.3,
    colors: ["Black", "Blue", "Black", "Black"],
    isNew: false,
    isSale: false,
    images: {
      black: [
        "/images/Patex Philippe 25.jpg",
      ],
      blue: [
        "/images/Patex Philippe B25.jpg",
      ],
      black: [
        "/images/Patex Philippe S25.jpg",
              ],
      black: [
        "/images/Patex Philippe bb25.jpg",
      ],
    },
  },
  {
    id: 12,
    name: "Poedagar Wristwatch - 001",
    price: 25000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Poedagar .25.jpg",
    rating: 4.6,
    colors: ["Silver"],
    isNew: false,
    isSale: false,
    images: {
      silver: [
        "/images/Poedagar .25.jpg",
      ],
    },
  },
    {
    id: 13,
    name: "Poedagar Wristwatch - 002",
    price: 25000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Poedagar S25.jpg",
    rating: 4.8,
    colors: ["Black", "Gold"],
    isNew: false,
    isSale: false,
    images: {
      black: ["images/Poedagar B25.jpg"
              ],
      gold: [
        "/images/Poedagar R25.jpg",
      ],
    },
  },
   {
    id: 14,
    name: "Poedagar Wristwatch - 003",
    price: 25000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Poedagar 25.jpg",
    rating: 4.8,
    colors: ["Silver", "Gold"],
    isNew: false,
    isSale: false,
    images: {
      silver: [ "/images/Poedagar ss25.jpg" ,
        "/images/Poedagar sss25.jpg" ,
              ],
        gold: ["/images/Poedagar Rs25.jpg"
        ],
    },
  },
  {
    id: 15,
    name: "Promade Wristwatch",
    price: 17000,
    originalPrice: 20000,
    category: "Accessories",
    gender: "Male",
    image: "/images/Promade Br17.jpg",
    rating: 4.8,
    colors: ["Brown"],
    isNew: false,
    isSale: true,
    images: {
      brown: [
        "/images/Promade Br17.jpg",
      ],
    },
  },
    {
    id: 16,
    name: "Black Unisex Bomber jacket",
    price: 25000,
    category: "Dresses",
    gender: "Unisex",
    image: "/images/Black Bomber jacket.jpg",
    rating: 4.5,
    colors: ["Black"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      black: [
        "/images/Black Bomber jacket.jpg",
 
      ],
    },
  },
    {
    id: 17,
    name: "Africa Print Bomber jacket",
    price: 20000,
    category: "Dresses",
    gender: "Unisex",
    image: "/images/Bomber jacket - .jpg",
    rating: 4.5,
    colors: ["Red", "Green"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: true,
    images: {
      green: [
        "/images/Bomber jacket - G.jpg",
        "/images/Bomber jacket - R.jpg" ,
] ,
    },
  },
    {
    id: 18,
    name: "Black kaftan with embroidery",
    price: 60000,
    category: "Dresses",
    gender: "Male",
    image: "/images/Black kaftan.jpg",
    rating: 4.5,
    colors: ["Black"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      black: [
        "/images/Black kaftan.jpg",
      ],
    },
  },
    {
    id: 19,
    name: "Blue Kaftan with embroidery",
    price: 60000,
    category: "Dresses",
    gender: "Male",
    image: "/images/Blue Kaftan.jpg",
    rating: 4.5,
    colors: ["Blue"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      blue: [
        "/images/Blue Kaftan.jpg",
        "/images/Blue kaftan (2).jpg"
      ],
    },
  },
    {
    id: 20,
    name: "Blue kaftan with black sleeve",
    price: 50000,
    category: "Dresses",
    gender: "Male",
    image: "/images/Blue and black kaftan.jpg",
    rating: 4.5,
    colors: ["Blue"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      blue: [
        "/images/jwela-agbada.jpg",
      ],
    },
  },
         {
    id: 21,
    name: "Blue complete Agbada",
    price: 120000,
    category: "Agbada",
    gender: "Male",
    image: "/images/Blue complete agbaada.jpg",
    rating: 4.5,
    colors: ["Blue"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      blue: [
        "/images/Blue complete agbaada.jpg",
      ],
    },
  },
         {
    id: 22,
    name: "Carton color complete Agbada",
    price: 150000,
    category: "Agbada",
    gender: "Male",
    image: "/images/Carton color complete agbada set.jpg",
    rating: 4.5,
    colors: ["Carton"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      brown: [
        "/images/Carton color complete agbada set.jpg" ,
      ],
    },
  },
         {
    id: 23,
    name: "Green complete Agbada",
    price: 150000,
    category: "Agbada",
    gender: "Male",
    image: "/images/Green Agbada.jpg",
    rating: 4.5,
    colors: ["Green"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      green: [
        "/images/Green Agbada.jpg" ,
        "/images/Green Agbada (2).jpg"
      ],
    },
  },
         {
    id: 22,
    name: "Mint green complete Agbada",
    price: 150000,
    category: "Agbada",
    gender: "Male",
    image: "/images/Mint Green complete Agbada set.jpg",
    rating: 4.5,
    colors: ["Green"],
    sizes: ["M", "L", "XL", "XXL"],
    isNew: false,
    isSale: false,
    images: {
      green: [
        "/images/Mint Green complete Agbada set.jpg" ,
      ],
    },
  },
]

const categories = ["All", "Dresses", "Pants", "Kaftan", "Agbada", "Accessories"]
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
  const [showProductPreview, setShowProductPreview] = useState(false)
  const [previewProduct, setPreviewProduct] = useState<any>(null)
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

  function ProductImageSlider({ product, isPreview = false }: { product: any; isPreview?: boolean }) {
    const [selectedColor, setSelectedColor] = useState(product.colors[0]?.toLowerCase().replace(/\s+/g, "") || "black")
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    const currentImages = product.images?.[selectedColor] || [product.image]

    const getColorBackground = (color: string) => {
      const colorMap: { [key: string]: string } = {
        black: "bg-black",
        white: "bg-white",
        navy: "bg-blue-900",
        blue: "bg-blue-600",
        "light blue": "bg-blue-400",
        "dark blue": "bg-blue-800",
        turquoise: "bg-cyan-500",
        cream: "bg-yellow-100",
        grey: "bg-gray-500",
        gray: "bg-gray-500",
        camel: "bg-yellow-600",
        burgundy: "bg-red-900",
        olive: "bg-green-700",
        pink: "bg-pink-400",
        "floral pink": "bg-gradient-to-r from-pink-200 to-purple-200",
        "floral blue": "bg-gradient-to-r from-blue-200 to-indigo-200",
        silver: "bg-gray-300",
        gold: "bg-yellow-500",
        "rose gold": "bg-pink-300",
        brown: "bg-amber-700",
        tan: "bg-amber-600",
        beige: "bg-amber-200",
        red: "bg-red-600",
        floral: "bg-gradient-to-r from-pink-200 to-purple-200",
        geometric: "bg-gradient-to-r from-blue-200 to-green-200",
        solid: "bg-gray-400",
      }
      return colorMap[color.toLowerCase()] || "bg-gray-400"
    }

    const nextImage = () => {
      setCurrentImageIndex((prev) => (prev + 1) % currentImages.length)
    }

    const prevImage = () => {
      setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)
    }

    return (
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={currentImages[currentImageIndex] || product.image}
            alt={`${product.name} - ${selectedColor}`}
            className={`w-full object-cover ${isPreview ? "h-96" : "h-80"}`}
          />

          {/* Navigation Arrows */}
          {currentImages.length > 1 && (
            <>
              <Button
                size="icon"
                variant="secondary"
                className="absolute left-2 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="secondary"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Image Counter */}
          {currentImages.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
              {currentImageIndex + 1} / {currentImages.length}
            </div>
          )}

          <div className="absolute top-3 left-3 flex gap-2">
            {product.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
            {product.isSale && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
          </div>
        </div>

        {/* Thumbnail Images */}
        {currentImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {currentImages.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                  currentImageIndex === index ? "border-black" : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <img src={image || product.image} alt={`Thumbnail ${index + 1}`} className="w-full h-16 object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Color Selector */}
        {product.colors && product.colors.length > 1 && (
          <div>
            <h4 className="font-semibold mb-3">Color</h4>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => {
                    setSelectedColor(color.toLowerCase().replace(/\s+/g, ""))
                    setCurrentImageIndex(0)
                  }}
                  className={`w-8 h-8 rounded-full border-2 transition-all ${getColorBackground(color)} ${
                    selectedColor === color.toLowerCase().replace(/\s+/g, "")
                      ? "border-gray-600 ring-2 ring-gray-300"
                      : "border-gray-300 hover:border-gray-600"
                  }`}
                  title={color}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const handleAddToCart = (product: any) => {
    // Only add to cart if not already present
    if (!cart.includes(product.id)) {
      setCart((prev) => [...prev, product.id])
      toast({
        title: "Added to cart",
        description: product.name,
        duration: 2000,
      })
    }

    // Set the selected product and show order dialog
    setSelectedProduct(product)
    setShowOrderDialog(true)
  }

  const handleProductClick = (product: any) => {
    setPreviewProduct(product)
    setShowProductPreview(true)
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
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/jwela-logo-clean.png"
              alt="Jwela"
              className="h-10 w-auto"
            />
          </div>

          {/* Right-side content (Favorites Sheet Button) */}
          <div className="flex items-center gap-4">
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
                    <p className="text-muted-foreground text-center py-8">
                      No favorites yet
                    </p>
                  ) : (
                    favorites.map((favoriteId) => {
                      const product = products.find((p) => p.id === favoriteId)
                      if (!product) return null
                      return (
                        <div
                          key={product.id}
                          className="flex items-center gap-3 p-3 border rounded-lg"
                        >
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {product.name}
                            </h4>
                            <p className="text-lg font-bold text-green-600">
                              ₦{product.price.toLocaleString()}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleAddToCart(product)}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toggleFavorite(product.id)}
                            >
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
          </div>
        </div>
      </div>
    </header>
  </div>
)

return (
  <div className="min-h-screen bg-background">
    {/* Header */}
    <header className="border-b">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/images/jwela-logo-clean.png"
              alt="Jwela"
              className="h-10 w-auto"
            />
          </div>

          {/* Header Right Icons (Favorites & Cart) */}
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
                        <Button
                          variant="outline"
                          className="w-full bg-transparent"
                          onClick={handleViewCartFavorites}
                        >
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
  </div>
)

     {/* Hero Section */}
<section className="relative overflow-hidden">
  {/* Desktop Banner */}
  <div className="hidden md:block relative">
    <img
      src="/Jwela Website Header (1).jpg"
      alt="Fashion Banner"
      className="w-full h-auto max-h-[500px] object-contain"
    />
    
    {/* Optional overlay for better text readability */}
    <div className="absolute inset-0 bg-black/10"></div>

    {/* Content positioned over the banner */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
            Your Style, Your Identity
          </h2>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto drop-shadow-md opacity-90">
            Discover our premium traditional collections
          </p>
          <Button size="lg" className="px-8 bg-white text-black hover:bg-gray-100 font-semibold">
            Shop Now
          </Button>
        </div>
      </div>
    </div>
  </div>
</section>

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
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 drop-shadow-lg">
          Your Style, On the Go
        </h2>
        <p className="text-base sm:text-lg mb-6 max-w-sm mx-auto drop-shadow-md opacity-90">
          Explore outfits crafted to match your bold identity.
        </p>
        <Button size="lg" className="px-8 bg-white text-black hover:bg-gray-100 font-semibold">
          Explore Now
        </Button>
      </div>
    </div>
  </div>
</div>


     {/* Product Showcase Section */}
<section className="container mx-auto px-4 py-16">
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Product</h2>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      Explore our signature piece in multiple styles and colors
    </p>
  </div>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
    {/* Product Images Slider */}
    <ProductImageSlider product={products.find((p) => p.id === 1) || products[0]} />

    {/* Product Details */}
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">
          Traditional Agbada - Turquoise
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <Star className="h-5 w-5 text-yellow-400" />
            <span className="text-sm text-muted-foreground ml-2">4.5</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl font-bold">₦100,000</span>
          <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>
        </div>
      </div>

      {/* Description & Actions */}
      <div className="space-y-4">
        <p className="text-muted-foreground">
          Experience the epitome of African elegance with our Traditional Agbada. Meticulously crafted with
          premium materials.
        </p>

        <div className="flex gap-4">
          <Button size="lg" className="flex-1" onClick={() => handleAddToCart(products[0])}>
            <ShoppingBag className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button variant="outline" size="lg" onClick={() => toggleFavorite(1)}>
            <Heart className={`h-5 w-5 ${favorites.includes(1) ? "fill-red-500 text-red-500" : ""}`} />
          </Button>
        </div>
      </div>

      {/* Product Features */}
      <div className="border-t pt-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="font-semibold">Perfect Fit</div>
            <div className="text-sm text-muted-foreground">Well tailored</div>
          </div>
          <div>
            <div className="font-semibold">Authentic Design</div>
            <div className="text-sm text-muted-foreground">Handcrafted</div>
          </div>
          <div>
            <div className="font-semibold">Cultural Pride</div>
            <div className="text-sm text-muted-foreground">Embrace tradition</div>
          </div>
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
            <Card
              key={product.id}
              className="group cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => handleProductClick(product)}
            >
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
                    {product.colors.slice(0, 3).map((color: string, index: number) => (
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
                  <Button
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
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

      {/* Product Preview Dialog */}
      <Dialog open={showProductPreview} onOpenChange={setShowProductPreview}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {previewProduct?.name}
              <Button variant="ghost" size="icon" onClick={() => setShowProductPreview(false)}>
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>
          {previewProduct && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Images Slider */}
              <ProductImageSlider product={previewProduct} isPreview={true} />

              {/* Product Details */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm text-muted-foreground ml-2">
                        {previewProduct.rating} ({previewProduct.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-bold">₦{previewProduct.price.toLocaleString()}</span>
                    {previewProduct.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        ₦{previewProduct.originalPrice.toLocaleString()}
                      </span>
                    )}
                    {previewProduct.isNew && <Badge className="bg-green-500 hover:bg-green-600">New Arrival</Badge>}
                    {previewProduct.isSale && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
                  </div>
                </div>

                {/* Available Colors */}
                {previewProduct.colors && previewProduct.colors.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Available Colors</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewProduct.colors.map((color: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {color}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Available Sizes */}
                {previewProduct.sizes && previewProduct.sizes.length > 0 && (
                  <div>
                    <h4 className="font-semibold mb-3">Available Sizes</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewProduct.sizes.map((size: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {size}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {previewProduct.category === "Accessories"
                      ? "Premium quality accessory crafted with attention to detail and style."
                      : "High-quality apparel designed for comfort, style, and durability."}
                  </p>

                  <div className="flex gap-4">
                    <Button
                      size="lg"
                      className="flex-1"
                      onClick={() => {
                        handleAddToCart(previewProduct)
                        setShowProductPreview(false)
                      }}
                    >
                      <ShoppingBag className="h-5 w-5 mr-2" />
                      Add to Cart
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(previewProduct.id)
                      }}
                    >
                      <Heart
                        className={`h-5 w-5 ${favorites.includes(previewProduct.id) ? "fill-red-500 text-red-500" : ""}`}
                      />
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-6">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="font-semibold">Smooth delivery</div>
                      <div className="text-sm text-muted-foreground">confirm prices upon purchase</div>
                    </div>
                    <div>
                      <div className="font-semibold">Quality Guarantee</div>
                      <div className="text-sm text-muted-foreground">Premium materials</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
                    onClick={() => setShowSizeGuideDialog(true)}
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
                          const message = "Hello! I'm interested in your accessories. Can you help me with more information?";
                          const accessoriesWhatsApp = `https://wa.me/2348169061610?text=${encodeURIComponent(message)}`;
                          window.open(accessoriesWhatsApp, "_blank");
                          toast({
                            title: "Opening WhatsApp",
                            description: "Accessories support",
                            duration: 2000,
                          });
                        }}
                        className="block text-green-600 hover:text-green-700 transition-colors underline text-sm"
                      >
                        WhatsApp Accessories (+234 816 906 1610)
                      </button>
                      <button
                        onClick={() => {
                          const message = "Hello! I'm interested in your outfits. Can you help me with more information?";
                          const outfitsWhatsApp = `https://wa.me/2348067142622?text=${encodeURIComponent(message)}`;
                          window.open(outfitsWhatsApp, "_blank");
                          toast({
                            title: "Opening WhatsApp",
                            description: "Outfits support",
                            duration: 2000,
                          });
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
                    href="https://www.instagram.com/jwela.shop"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-pink-600 transition-colors"
                  >
                    @jwela.shop (Accessories)
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/jwela.apparel"
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
