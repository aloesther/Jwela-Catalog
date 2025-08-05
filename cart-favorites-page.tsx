"use client"

import { useState } from "react"
import { ArrowLeft, Heart, ShoppingBag, Star, Trash2, Instagram, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

// Sample products data (in a real app, this would come from props or context)
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
]

interface CartFavoritesPageProps {
  initialCart?: number[]
  initialFavorites?: number[]
  onBack?: () => void
}

export default function CartFavoritesPage({
  initialCart = [1, 2],
  initialFavorites = [1, 5, 6],
  onBack,
}: CartFavoritesPageProps) {
  const [cart, setCart] = useState<number[]>(initialCart)
  const [favorites, setFavorites] = useState<number[]>(initialFavorites)
  const [quantities, setQuantities] = useState<Record<number, number>>({})
  const [showOrderDialog, setShowOrderDialog] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const { toast } = useToast()

  const getQuantity = (productId: number) => quantities[productId] || 1

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }))
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((id) => id !== productId))
    const product = products.find((p) => p.id === productId)
    toast({
      title: "Removed from cart",
      description: product?.name,
      duration: 2000,
    })
  }

  const removeFromFavorites = (productId: number) => {
    setFavorites((prev) => prev.filter((id) => id !== productId))
    const product = products.find((p) => p.id === productId)
    toast({
      title: "Removed from favorites",
      description: product?.name,
      duration: 2000,
    })
  }

  const moveToCart = (productId: number) => {
    if (!cart.includes(productId)) {
      setCart((prev) => [...prev, productId])
      const product = products.find((p) => p.id === productId)
      toast({
        title: "Added to cart",
        description: product?.name,
        duration: 2000,
      })
    }
  }

  const moveToFavorites = (productId: number) => {
    if (!favorites.includes(productId)) {
      setFavorites((prev) => [...prev, productId])
      const product = products.find((p) => p.id === productId)
      toast({
        title: "Added to favorites",
        description: product?.name,
        duration: 2000,
      })
    }
  }

  const handleOrderProduct = (product: any) => {
    setSelectedProduct(product)
    setShowOrderDialog(true)
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

  const cartProducts = cart.map((id) => products.find((p) => p.id === id)).filter(Boolean)
  const favoriteProducts = favorites.map((id) => products.find((p) => p.id === id)).filter(Boolean)

  const cartTotal = cartProducts.reduce((total, product) => {
    return total + product!.price * getQuantity(product!.id)
  }, 0)

  const cartItemsCount = cartProducts.reduce((total, product) => {
    return total + getQuantity(product!.id)
  }, 0)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <img src="/images/jwela-logo-clean.png" alt="Jwela" className="h-8 w-auto" />
              <h1 className="text-xl font-semibold">My Cart & Favorites</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="cart" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="cart" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Shopping Cart ({cart.length})
            </TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites ({favorites.length})
            </TabsTrigger>
          </TabsList>

          {/* Cart Tab */}
          <TabsContent value="cart" className="space-y-6">
            {cart.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
                  <p className="text-muted-foreground text-center mb-6">Add some items to your cart to get started</p>
                  <Button onClick={onBack}>Continue Shopping</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                  {cartProducts.map((product) => (
                    <Card key={product!.id}>
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <img
                            src={product!.image || "/placeholder.svg"}
                            alt={product!.name}
                            className="w-24 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex justify-between items-start mb-2">
                              <div>
                                <h3 className="font-semibold text-lg">{product!.name}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    <span className="text-sm text-muted-foreground ml-1">
                                      {product!.rating}
                                    </span>
                                  </div>
                                  {product!.isSale && <Badge variant="destructive">Sale</Badge>}
                                  {product!.isNew && <Badge className="bg-green-500">New</Badge>}
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeFromCart(product!.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex flex-wrap gap-1 mb-3">
                              {product!.colors.slice(0, 3).map((color, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {color}
                                </Badge>
                              ))}
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">₦{product!.price.toLocaleString()}</span>
                                {product!.originalPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    ₦{product!.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3">
                                {/* Quantity Controls */}
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-transparent"
                                    onClick={() => updateQuantity(product!.id, getQuantity(product!.id) - 1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">{getQuantity(product!.id)}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-transparent"
                                    onClick={() => updateQuantity(product!.id, getQuantity(product!.id) + 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>

                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" onClick={() => moveToFavorites(product!.id)}>
                                    <Heart className="h-4 w-4 mr-1" />
                                    Save
                                  </Button>
                                  <Button size="sm" onClick={() => handleOrderProduct(product)}>
                                    Order Now
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="lg:col-span-1">
                  <Card className="sticky top-24">
                    <CardHeader>
                      <CardTitle>Order Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span>Items ({cartItemsCount})</span>
                        <span>₦{cartTotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span className="text-green-600">Contact for quote</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Subtotal</span>
                        <span>₦{cartTotal.toLocaleString()}</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Checkout All Items
                      </Button>
                      <Button variant="outline" className="w-full bg-transparent" onClick={onBack}>
                        Continue Shopping
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites" className="space-y-6">
            {favorites.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No favorites yet</h3>
                  <p className="text-muted-foreground text-center mb-6">
                    Save items you love to easily find them later
                  </p>
                  <Button onClick={onBack}>Browse Products</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {favoriteProducts.map((product) => (
                  <Card key={product!.id} className="group hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden rounded-t-lg">
                        <img
                          src={product!.image || "/placeholder.svg"}
                          alt={product!.name}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 left-3 flex flex-col gap-2">
                          {product!.isNew && <Badge className="bg-green-500 hover:bg-green-600">New</Badge>}
                          {product!.isSale && <Badge className="bg-red-500 hover:bg-red-600">Sale</Badge>}
                        </div>
                        <Button
                          size="icon"
                          variant="secondary"
                          className="absolute top-3 right-3"
                          onClick={() => removeFromFavorites(product!.id)}
                        >
                          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-2">{product!.name}</h3>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-muted-foreground ml-1">
                              {product!.rating} ({product!.reviews})
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold">₦{product!.price.toLocaleString()}</span>
                          {product!.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₦{product!.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {product!.colors.slice(0, 3).map((color, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {color}
                            </Badge>
                          ))}
                          {product!.colors.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{product!.colors.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            className="flex-1 bg-transparent"
                            onClick={() => moveToCart(product!.id)}
                          >
                            Add to Cart
                          </Button>
                          <Button className="flex-1" onClick={() => handleOrderProduct(product)}>
                            Order Now
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Order Dialog */}
      <Dialog open={showOrderDialog} onOpenChange={setShowOrderDialog}>
        <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Complete Your Order</DialogTitle>
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

      <Toaster />
    </div>
  )
}
