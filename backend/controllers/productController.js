import Product from "../models/Product.js";

// CREATE a new product
export const createProduct = async (req, res) => {
  try {
    const { title, description, category, price, image } = req.body;
    const product = await Product.create({
      title,
      description,
      category,
      price,
      image,
      user: req.user._id
    });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET all products with optional filtering
export const getProducts = async (req, res) => {
  try {
    const { keyword, category } = req.query;
    let filter = {};

    if (keyword) filter.title = { $regex: keyword, $options: "i" }; // case-insensitive search
    if (category) filter.category = category;

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET single product by ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) return res.json(product);
    res.status(404).json({ message: "Product not found" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE product (only by owner)
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    Object.assign(product, req.body);
    await product.save();
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE product (only by owner)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await product.deleteOne();
    res.json({ message: "Product removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
