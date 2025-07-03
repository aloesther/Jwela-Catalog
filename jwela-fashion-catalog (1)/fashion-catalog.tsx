"use client"

import { useState } from "react"
import { Search, Filter, Heart, ShoppingBag, Star } from "lucide-react"
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
        return b.isNew ? 1 : -1
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <img src="/images/jwela-logo.png" alt="Jwela Apparel" className="h-12 w-auto" />
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <ShoppingBag className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-50 to-slate-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">New Collection 2024</h2>
          <p className="text-xl text-muted-foreground mb-8">Discover our latest fashion essentials</p>
          <Button size="lg">Shop Now</Button>
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
                  >
                    <Heart className="h-4 w-4" />
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
                  <Button className="w-full">Add to Cart</Button>
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

      {/* Footer */}
      <footer className="bg-slate-50 mt-16">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">JWELA</h3>
              <p className="text-muted-foreground">
                Premium apparel brand focused on quality, style, and sustainability.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Shop</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>New Arrivals</li>
                <li>Women</li>
                <li>Men</li>
                <li>Sale</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Size Guide</li>
                <li>Returns</li>
                <li>Shipping</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>Instagram</li>
                <li>Facebook</li>
                <li>Twitter</li>
                <li>Newsletter</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Jwela Brand. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
