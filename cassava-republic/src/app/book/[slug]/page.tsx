import { getProductBySlug } from "@/services/bookServices";
import { Product } from "@/types/product";
import { Metadata } from "next";
import Link from "next/link";
import BookDetails from "@/components/BookDetails";
import Header from "@/components/Header";

// Generate metadata for SEO
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const product = await getProductBySlug(slug);
    if (!product) {
      return {
        title: "Book not found | Cassava Republic",
        description: "The requested book could not be found"
      };
    }

    const description =
      product.description ||
      `${product.title} by ${product.author} - Available at Cassava Republic`;

    return {
      title: `${product.title} | Cassava Republic`,
      description: description,
      openGraph: {
        title: product.title,
        description: description,
        images: [
          {
            url: product.image,
            width: 800,
            height: 600,
            alt: product.title
          }
        ],
        type: "website"
      },
      twitter: {
        card: "summary_large_image",
        title: product.title,
        description: description,
        images: [product.image]
      }
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Book | Cassava Republic",
      description: "View book details"
    };
  }
}

export default async function BookPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  let product: Product | null = null;

  try {
    const { slug } = await params;
    product = await getProductBySlug(slug);
  } catch (error) {
    console.error("Error fetching book:", error);
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Book Not Found</h1>
        <p className="text-gray-600 mb-8">
          The book you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/books"
          className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
        >
          Browse All Books
        </Link>
      </div>
    );
  }

  return (
    <>
      <Header />
      <BookDetails product={product} />
    </>
  );
}
