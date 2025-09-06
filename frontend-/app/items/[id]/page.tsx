"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Leaf, ShoppingCart, Heart, Star, MapPin, Shield, Truck, ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useParams, useRouter } from "next/navigation"

// Mock product data (same as items page)
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
    description:
      "Classic brown leather jacket in excellent condition. Barely worn, perfect for fall weather. This timeless piece features genuine leather construction with a comfortable cotton lining. The jacket has been carefully maintained and shows minimal signs of wear.",
    location: "New York, NY",
    size: "Medium",
    brand: "Wilson Leather",
    material: "100% Genuine Leather",
    measurements: 'Chest: 42", Length: 26", Sleeve: 25"',
    sellerRating: 4.9,
    sellerSales: 47,
    images: ["/vintage-leather-jacket-front.jpg", "/vintage-leather-jacket-back.png", "/vintage-leather-jacket-detail.jpg"],
  },
  // Add other products here if needed
]

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isInCart, setIsInCart] = useState(false)

  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Button asChild>
            <Link href="/items">Back to Items</Link>
          </Button>
        </div>
      </div>
    )
  }

  const handleAddToCart = () => {
    setIsInCart(!isInCart)
  }

  const handleToggleFavorite = () => {
    setIsFavorite(!isFavorite)
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
                {isInCart && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                    1
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
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
          <Link href="/items" className="hover:text-green-600 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Items
          </Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images?.[selectedImage] || product.image}
                alt={product.name}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images && (
              <div className="flex gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImage === index ? "border-green-600" : "border-gray-200"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <button onClick={handleToggleFavorite} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <Heart className={`h-6 w-6 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-600"}`} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{product.rating}</span>
                  <span className="text-gray-500">({product.reviews} reviews)</span>
                </div>
                <Badge variant="outline">{product.condition}</Badge>
                <Badge className="bg-green-100 text-green-800">{product.co2Saved}kg CO₂ saved</Badge>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                <span className="text-xl text-gray-500 line-through">${product.originalPrice}</span>
                <Badge className="bg-green-600 text-white">
                  {(((product.originalPrice - product.price) / product.originalPrice) * 100).toFixed(0)}% off
                </Badge>
              </div>
            </div>

            <Separator />

            {/* Product Info */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Product Details</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Brand:</span>
                  <span className="ml-2 font-medium">{product.brand}</span>
                </div>
                <div>
                  <span className="text-gray-600">Size:</span>
                  <span className="ml-2 font-medium">{product.size}</span>
                </div>
                <div>
                  <span className="text-gray-600">Material:</span>
                  <span className="ml-2 font-medium">{product.material}</span>
                </div>
                <div>
                  <span className="text-gray-600">Condition:</span>
                  <span className="ml-2 font-medium">{product.condition}</span>
                </div>
              </div>
              {product.measurements && (
                <div>
                  <span className="text-gray-600 text-sm">Measurements:</span>
                  <p className="text-sm font-medium">{product.measurements}</p>
                </div>
              )}
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Seller Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Seller Information</h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{product.seller}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span>{product.sellerRating} rating</span>
                    <span>•</span>
                    <span>{product.sellerSales} sales</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <MapPin className="h-4 w-4" />
                    <span>{product.location}</span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Profile
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className={`w-full ${isInCart ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </Button>
              <Button variant="outline" size="lg" className="w-full bg-transparent">
                Message Seller
              </Button>
            </div>

            {/* Trust & Safety */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-800 mb-2">Trust & Safety</h4>
              <div className="space-y-2 text-sm text-green-700">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span>Buyer protection included</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4" />
                  <span>Secure shipping available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Leaf className="h-4 w-4" />
                  <span>Verified sustainable seller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
