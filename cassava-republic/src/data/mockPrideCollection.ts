import { Product } from "@/types/product";

const mockPrideCollection: Product[] = [
  {
    id: "1",
    slug: "bundle",
    title: "Bundle: When we speak of nothing & And then He sang a lullaby",
    author: "Ani Kayode",
    price: 14500,
    image: "/Ani.png"
  },
  {
    id: "2",
    slug: "love-offers-no-safety",
    title: "Love offers no safety & She called me a woman",
    author: "Makanjuola",
    price: 14500,
    image: "/makanjuola.png"
  },
  {
    id: "3",
    slug: "wild-imperfections",
    title: "Wild Imperfections",
    author: "Natalia",
    price: 14000,
    // originalPrice: 11000,
    image: "/natalia.jpg"
  },
  {
    id: "4",
    slug: "and-then-he-sang-a-lullaby",
    title: "And then he sang a lullaby",
    author: "Ani Kayode",
    price: 11000,
    image: "/ani 2.jpg"
  }
];

export const prideCollection = mockPrideCollection.map((book) => ({
  ...book,
  slug: book.title.toLowerCase().replace(/\s+/g, "-"),
  rating: Math.floor(Math.random() * 5) + 1,
  category: "Fiction"
}));
