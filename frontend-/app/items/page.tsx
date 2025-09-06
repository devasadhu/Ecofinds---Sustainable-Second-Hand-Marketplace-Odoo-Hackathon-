"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Leaf, Search, ShoppingCart, Heart, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock product data
const products = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: 89,
    originalPrice: 250,
    category: "Clothing",
    condition: "Excellent",
    seller: "Sarah M.",
    rating: 4.8,
    reviews: 23,
    image: "/vintage-leather-jacket.png",
    co2Saved: 12,
    description: "Classic brown leather jacket in excellent condition. Barely worn, perfect for fall weather.",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "iPhone 12 Pro",
    price: 450,
    originalPrice: 999,
    category: "Electronics",
    condition: "Good",
    seller: "Mike R.",
    rating: 4.6,
    reviews: 18,
    image: "/iphone-12-pro-phone.jpg",
    co2Saved: 45,
    description: "Unlocked iPhone 12 Pro, 128GB. Minor scratches on back, screen is perfect.",
    location: "Los Angeles, CA",
  },
  {
    id: 3,
    name: "Designer Handbag",
    price: 320,
    originalPrice: 800,
    category: "Accessories",
    condition: "Like New",
    seller: "Emma L.",
    rating: 4.9,
    reviews: 31,
    image: "/luxury-designer-handbag.png",
    co2Saved: 8,
    description: "Authentic designer handbag, used only twice. Comes with original dust bag.",
    location: "Chicago, IL",
  },
  {
    id: 4,
    name: "Wooden Coffee Table",
    price: 150,
    originalPrice: 400,
    category: "Furniture",
    condition: "Good",
    seller: "David K.",
    rating: 4.7,
    reviews: 12,
    image: "/wooden-coffee-table-furniture.jpg",
    co2Saved: 25,
    description: "Solid oak coffee table with minor wear. Perfect for living room or office.",
    location: "Austin, TX",
  },
  {
    id: 5,
    name: "Gaming Laptop",
    price: 650,
    originalPrice: 1200,
    category: "Electronics",
    condition: "Excellent",
    seller: "Alex P.",
    rating: 4.8,
    reviews: 15,
    image: "/gaming-laptop-computer.jpg",
    co2Saved: 55,
    description: "High-performance gaming laptop, barely used. Perfect for gaming and work.",
    location: "Seattle, WA",
  },
  {
    id: 6,
    name: "Vintage Dress",
    price: 45,
    originalPrice: 120,
    category: "Clothing",
    condition: "Good",
    seller: "Lisa H.",
    rating: 4.5,
    reviews: 8,
    image: "/vintage-dress-fashion.jpg",
    co2Saved: 6,
    description: "Beautiful vintage floral dress from the 80s. Size medium, great condition.",
    location: "Miami, FL",
  },
]

export default function ItemsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [cart, setCart] = useState<number[]>([])
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = ["all", "Clothing", "Electronics", "Accessories", "Furniture", "Books", "Sports"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      default:
        return b.id - a.id // newest first
    }
  })

  const addToCart = (productId: number) => {
    setCart((prev) => (prev.includes(productId) ? prev : [...prev, productId]))
  }

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((id) => id !== productId))
  }

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Leaf className="h-8 w-8 text-green-600" />
            <span className="text-2xl font-bold text-green-800">EcoFinds</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-600 hover:text-green-600 transition-colors">
              Home
            </Link>
            <Link href="/items" className="text-green-600 font-medium">
              Browse Items
            </Link>
            <Link href="/quiz" className="text-gray-600 hover:text-green-600 transition-colors">
              Eco Quiz
            </Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors">
              Dashboard
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                    {cart.length}
                  </Badge>
                )}
              </Link>
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/sell">Sell Items</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sustainable Marketplace</h1>
          <p className="text-gray-600">Discover quality pre-owned items and help reduce waste while saving money.</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-green-200 focus:border-green-500"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-48 border-green-200">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48 border-green-200">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {sortedProducts.length} of {products.length} items
            {selectedCategory !== "all" && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <Card key={product.id} className="border-green-100 hover:shadow-lg transition-shadow group">
              <CardContent className="p-0">
                <div className="relative">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <button
                    onClick={() => toggleFavorite(product.id)}
                    className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                    />
                  </button>
                  <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                    {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}% off
                  </Badge>
                </div>

                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg text-gray-900 group-hover:text-green-600 transition-colors">
                      <Link href={`/items/${product.id}`}>{product.name}</Link>
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {product.condition}
                    </Badge>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <div className="flex items-center gap-1 mb-2">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating}</span>
                    <span className="text-sm text-gray-500">({product.reviews})</span>
                  </div>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600 font-medium">{product.co2Saved}kg CO₂ saved</div>
                      <div className="text-xs text-gray-500">by {product.seller}</div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {cart.includes(product.id) ? (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(product.id)}
                        className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      >
                        Remove from Cart
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        className="flex-1 bg-green-600 hover:bg-green-700"
                      >
                        Add to Cart
                      </Button>
                    )}
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/items/${product.id}`}>View Details</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search terms or filters to find what you're looking for.
            </p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
