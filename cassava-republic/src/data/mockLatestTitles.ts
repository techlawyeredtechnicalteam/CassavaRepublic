import { Product } from "@/types/product";

const mockLatestTitles: Product[] = [
  {
    id: "1",
    slug: "midnight-in-the-morgue",
    title: "Midnight in the Morgue",
    author: "Chika Unigwe",
    price: 10000,
    image: "/Chika.jpeg"
  },
  {
    id: "2",
    slug: "flying-up-the-mountain",
    title: "Flying Up The Mountain",
    author: "Elizabeth Irene Baitie",
    price: 5000,
    image: "/Elizabeth.jpg"
  },
  {
    id: "3",
    slug: "on-ladies-and-handbags",
    title: "On Ladies and Handbags",
    author: "Mylo FreeMan",
    price: 14000,
    image: "/Mylo.jpg"
  },
  {
    id: "4",
    slug: "the-world-was-in-our-hands",
    title: "The World Was In Our Hands",
    author: "Chitra Nagarajan",
    price: 17000,
    image: "/Chitra Nagarajan.png"
  }
];

export const latestTitles = mockLatestTitles.map((book) => ({
  ...book,
  slug: book.title.toLowerCase().replace(/\s+/g, "-"),
  rating: Math.floor(Math.random() * 5) + 1, // Random rating between 1 and 5
  category: "Fiction" // Default category for simplicity
}));