import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// Helper to calculate total price
const calculateTotalPrice = cart => {
  return cart.products.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
};

// Get all items in user's cart + total price
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "title price category image stock"
    );

    if (!cart || cart.products.length === 0)
      return res.json({ products: [], totalPrice: 0 });

    const totalPrice = calculateTotalPrice(cart);
    res.json({ products: cart.products, totalPrice });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Add product to cart
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // STOCK VALIDATION
    const qtyToAdd = quantity || 1;
    if (product.stock !== undefined && qtyToAdd > product.stock) {
      return res.status(400).json({ message: `Cannot add more than ${product.stock} items` });
    }

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });

    const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);

    if (itemIndex >= 0) {
      cart.products[itemIndex].quantity += qtyToAdd;
      // Remove if quantity <= 0
      if (cart.products[itemIndex].quantity <= 0) {
        cart.products.splice(itemIndex, 1);
      }
    } else if (qtyToAdd > 0) {
      cart.products.push({ product: productId, quantity: qtyToAdd });
    }

    await cart.save();
    const populatedCart = await cart.populate("products.product", "title price category image stock");
    res.json({ products: populatedCart.products, totalPrice: calculateTotalPrice(populatedCart) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Update quantity of a cart item
export const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find(p => p.product.toString() === productId);
    if (!item) return res.status(404).json({ message: "Product not in cart" });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // STOCK VALIDATION
    if (product.stock !== undefined && quantity > product.stock) {
      return res.status(400).json({ message: `Cannot set quantity more than ${product.stock}` });
    }

    if (quantity <= 0) {
      cart.products = cart.products.filter(p => p.product.toString() !== productId);
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    const populatedCart = await cart.populate("products.product", "title price category image stock");
    res.json({ products: populatedCart.products, totalPrice: calculateTotalPrice(populatedCart) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Remove product from cart
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate("products.product", "title price category image stock");
    res.json({ products: populatedCart.products, totalPrice: calculateTotalPrice(populatedCart) });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
