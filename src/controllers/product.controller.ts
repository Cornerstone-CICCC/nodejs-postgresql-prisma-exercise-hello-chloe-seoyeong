import { Request, Response } from "express";
import {
  createProduct,
  editProductById,
  fetchAllProduct,
  fetchProductById,
  removeProductById,
} from "../models/product.model";
import { Product } from "@prisma/client";

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await fetchAllProduct();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get products" });
  }
};

const getProductById = async (req: Request<{ id: string }>, res: Response) => {
  try {
    const id = Number(req.params.id);
    const product = await fetchProductById(id);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to get product by id" });
  }
};

const addProduct = async (
  req: Request<{}, {}, Omit<Product, "id">>,
  res: Response
) => {
  try {
    const { productName, price } = req.body;
    const product = await createProduct({ productName, price });
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to add product" });
  }
};

const updateProduct = async (
  req: Request<{ id: string }, {}, Partial<Product>>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const { productName, price } = req.body;
    const product = await editProductById(id, {
      productName,
      price,
    });
    if (!product) {
      res.status(404).json({ message: "Product not found! " });
    }
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to update product" });
  }
};

const deleteProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const id = Number(req.params.id);
    const product = await removeProductById(id);
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Unable to delete product" });
  }
};

export default {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProductById,
};
