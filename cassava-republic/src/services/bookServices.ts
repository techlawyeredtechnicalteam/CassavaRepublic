import { Product } from "@/types/product";
import { latestTitles } from "@/data/mockLatestTitles";
import { forthComingTitle } from "@/data/mockForthComingTitle";
import { prideCollection } from "@/data/mockPrideCollection";
import { nonFiction } from "@/data/mockNonFiction";

// Function to get all products from different collections
export const getProducts = async (): Promise<Product[]> => {
  try {
    // Combine all product collections with unique IDs
    const allProducts: Product[] = [
      ...latestTitles.map((product, index) => ({
        ...product,
        id: `latest-${index + 1}`
      })),
      ...forthComingTitle.map((product, index) => ({
        ...product,
        id: `forthcoming-${index + 1}`
      })),
      ...prideCollection.map((product, index) => ({
        ...product,
        id: `pride-${index + 1}`
      })),
      ...nonFiction.map((product, index) => ({
        ...product,
        id: `nonfiction-${index + 1}`
      }))
    ];

    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (
  productId: string
): Promise<Product | null> => {
  try {
    const products = await getProducts();
    return products.find((p) => p.id === productId) || null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
};

export const getProductBySlug = async (
  slug: string
): Promise<Product | null> => {
  try {
    const products = await getProducts();
    return products.find((p) => p.slug === slug) || null;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    return null;
  }
};
