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
exports.removeProductById = exports.editProductById = exports.createProduct = exports.fetchProductById = exports.fetchAllProduct = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
// Fetch all products
const fetchAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.findMany();
});
exports.fetchAllProduct = fetchAllProduct;
// Fetch product by id
const fetchProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.findUnique({
        where: {
            id,
        },
    });
});
exports.fetchProductById = fetchProductById;
// Create product
const createProduct = (newProduct) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.create({ data: newProduct });
});
exports.createProduct = createProduct;
// Edit product by id
const editProductById = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const foundProduct = yield (0, exports.fetchProductById)(id);
    if (!foundProduct)
        return null;
    const updatedProduct = {
        productName: (_a = data.productName) !== null && _a !== void 0 ? _a : foundProduct.productName,
        price: (_b = data.price) !== null && _b !== void 0 ? _b : foundProduct.price,
    };
    return yield prisma.product.update({
        where: { id },
        data: updatedProduct,
    });
});
exports.editProductById = editProductById;
// Remove product by id
const removeProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.product.delete({
        where: {
            id,
        },
    });
});
exports.removeProductById = removeProductById;
