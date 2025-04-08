import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

// Fetch all products
export const fetchAllProduct = async () => {
  return await prisma.product.findMany();
};

// Fetch product by id
export const fetchProductById = async (id: number) => {
  return await prisma.product.findUnique({
    where: {
      id,
    },
  });
};

// Create product
export const createProduct = async (newProduct: Omit<Product, "id">) => {
  return await prisma.product.create({ data: newProduct });
};

// Edit product by id
export const editProductById = async (id: number, data: Partial<Product>) => {
  const foundProduct = await fetchProductById(id);
  if (!foundProduct) return null;
  const updatedProduct = {
    productName: data.productName ?? foundProduct.productName,
    price: data.price ?? foundProduct.price,
  };
  return await prisma.product.update({
    where: { id },
    data: updatedProduct,
  });
};

// Remove product by id
export const removeProductById = async (id: number) => {
  return await prisma.product.delete({
    where: {
      id,
    },
  });
};
