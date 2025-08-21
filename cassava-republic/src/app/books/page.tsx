import { getProducts } from "@/services/bookServices";
import { Metadata } from "next";
import BooksGrid from "@/components/BooksGrid";

export const metadata: Metadata = {
  title: "Books | Cassava Republic",
  description:
    "Browse our complete collection of books from African authors and publishers",
  keywords: [
    "books",
    "african literature",
    "cassava republic",
    "fiction",
    "non-fiction",
    "authors"
  ],
  openGraph: {
    title: "Books | Cassava Republic",
    description:
      "Browse our complete collection of books from African authors and publishers",
    type: "website"
  }
};

export default async function BooksPage() {
  const books = await getProducts();

  return (
    <>
      <BooksGrid books={books} />
    </>
  );
}
