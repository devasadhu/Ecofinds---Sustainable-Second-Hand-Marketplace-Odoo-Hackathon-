import User from "../models/User.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

// GET /api/purchases - Get all purchases grouped by transaction
export const getPurchases = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(
      "purchases.product",
      "title price category image stock"
    );

    if (!user.purchases || user.purchases.length === 0)
      return res.json({ transactions: [] });

    const transactionsMap = {};
    user.purchases.forEach(item => {
      if (!transactionsMap[item.transactionId]) transactionsMap[item.transactionId] = [];
      transactionsMap[item.transactionId].push(item);
    });

    const transactions = Object.keys(transactionsMap).map(id => ({
      transactionId: id,
      items: transactionsMap[id],
      purchasedAt: transactionsMap[id][0].purchasedAt
    }));

    res.json({ transactions });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/purchases - Checkout cart
export const addPurchase = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "title price category image stock"
    );

    if (!cart || cart.products.length === 0)
      return res.status(400).json({ message: "Cart is empty" });

    const user = await User.findById(req.user._id);

    // STOCK VALIDATION BEFORE PURCHASE
    for (const item of cart.products) {
      if (item.product.stock !== undefined && item.quantity > item.product.stock) {
        return res.status(400).json({
          message: `Cannot purchase more than ${item.product.stock} of "${item.product.title}"`
        });
      }
    }

    const transactionId = Date.now().toString(); // ✅ must set this

    const purchasedItems = cart.products.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      purchasedAt: new Date(),
      transactionId // ✅ include this here
    }));

    user.purchases.push(...purchasedItems);
    await user.save();

    // OPTIONAL: decrement stock in Product collection
    for (const item of cart.products) {
      if (item.product.stock !== undefined) {
        await Product.findByIdAndUpdate(item.product._id, {
          $inc: { stock: -item.quantity }
        });
      }
    }

    // Clear cart
    cart.products = [];
    await cart.save();

    // Return the transaction just made
    const populatedUser = await User.findById(req.user._id).populate(
      "purchases.product",
      "title price category image stock"
    );

    const newTransactionItems = populatedUser.purchases.filter(
      p => p.transactionId === transactionId
    );

    res.json({
      message: "Purchase successful",
      transactionId,
      items: newTransactionItems
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET /api/purchases/:transactionId - fetch a specific transaction
export const getTransactionById = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const user = await User.findById(req.user._id).populate(
      "purchases.product",
      "title price category image stock"
    );

    const items = user.purchases.filter(p => p.transactionId === transactionId);
    if (!items.length)
      return res.status(404).json({ message: "Transaction not found" });

    res.json({
      transactionId,
      items,
      purchasedAt: items[0].purchasedAt
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
