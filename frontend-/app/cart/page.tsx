"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Leaf, Minus, Plus, Trash2, ShoppingBag, Truck, LeafIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

// Mock cart items
const initialCartItems = [
  {
    id: 1,
    name: "Vintage Leather Jacket",
    price: 89,
    originalPrice: 250,
    seller: "Sarah M.",
    image: "/vintage-leather-jacket.png",
    co2Saved: 12,
    quantity: 1,
    condition: "Excellent",
  },
  {
    id: 2,
    name: "Designer Handbag",
    price: 320,
    originalPrice: 800,
    seller: "Emma L.",
    image: "/luxury-designer-handbag.png",
    co2Saved: 8,
    quantity: 1,
    condition: "Like New",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [promoApplied, setPromoApplied] = useState(false)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "eco10") {
      setPromoApplied(true)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCO2Saved = cartItems.reduce((sum, item) => sum + item.co2Saved * item.quantity, 0)
  const discount = promoApplied ? subtotal * 0.1 : 0
  const shipping = subtotal > 50 ? 0 : 9.99
  const total = subtotal - discount + shipping

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
            <Link href="/items" className="text-gray-600 hover:text-green-600 transition-colors">
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
            <Button variant="outline" asChild>
              <Link href="/items">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
            <p className="text-gray-600 mb-6">
              Discover amazing pre-owned items and start your sustainable shopping journey.
            </p>
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/items">Browse Items</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border-green-100">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={96}
                          height={96}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900 truncate">
                              <Link href={`/items/${item.id}`} className="hover:text-green-600">
                                {item.name}
                              </Link>
                            </h3>
                            <p className="text-sm text-gray-600">Sold by {item.seller}</p>
                            <Badge variant="outline" className="mt-1">
                              {item.condition}
                            </Badge>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-gray-200 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="px-3 py-2 min-w-[3rem] text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <div className="text-sm text-green-600 font-medium">
                              {item.co2Saved * item.quantity}kg CO₂ saved
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xl font-bold text-green-600">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <div className="text-sm text-gray-500 line-through">
                              ${(item.originalPrice * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border-green-100">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>

                  {promoApplied && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (ECO10)</span>
                      <span>-${discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>

                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800 mb-1">
                      <LeafIcon className="h-4 w-4" />
                      <span className="font-medium">Environmental Impact</span>
                    </div>
                    <p className="text-sm text-green-700">This order saves {totalCO2Saved}kg of CO₂ emissions!</p>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="border-green-100">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Promo Code</h3>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="border-green-200"
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={applyPromoCode}
                      disabled={promoApplied}
                      className="border-green-200 bg-transparent"
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && <p className="text-sm text-green-600 mt-2">Promo code applied! 10% discount</p>}
                  <p className="text-xs text-gray-500 mt-2">Try "ECO10" for 10% off your first order</p>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700">
                Proceed to Checkout
              </Button>

              {/* Shipping Info */}
              <div className="text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Truck className="h-4 w-4" />
                  <span>Free shipping on orders over $50</span>
                </div>
                <p>Secure checkout • 30-day return policy</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
