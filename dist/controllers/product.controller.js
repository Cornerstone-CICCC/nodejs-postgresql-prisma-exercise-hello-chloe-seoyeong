"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const products = yield (0, product_model_1.fetchAllProduct)();
        res.status(200).json(products);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to get products" });
    }
});
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = yield (0, product_model_1.fetchProductById)(id);
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to get product by id" });
    }
});
const addProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productName, price } = req.body;
        const product = yield (0, product_model_1.createProduct)({ productName, price });
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to add product" });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const { productName, price } = req.body;
        const product = yield (0, product_model_1.editProductById)(id, {
            productName,
            price,
        });
        if (!product) {
            res.status(404).json({ message: "Product not found! " });
        }
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to update product" });
    }
});
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = Number(req.params.id);
        const product = yield (0, product_model_1.removeProductById)(id);
        res.status(200).json(product);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Unable to delete product" });
    }
});
exports.default = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProductById,
};
