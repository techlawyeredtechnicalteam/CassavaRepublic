import { Product } from "@/types/product";

const mockNonFiction: Product[] = [
  {
    id: "1",
    slug: "a-stranger-pose",
    title: "A Stranger Pose",
    author: "Emmanuel Iduma",
    price: 7000,
    image: "/emmanuel-iduma.jpg"
  },
  {
    id: "2",
    slug: "soldiers-of-fortune",
    title: "Soldiers of Fortune",
    author: "Max Siollun",
    price: 12000,
    image: "/max siollun.jpeg"
  },
  {
    id: "3",
    slug: "city-of-imagination",
    title: "Lagos: City of Imagination",
    author: "Kaye Whiteman",
    price: 14000,
    image: "/kaye whiteman.jpg"
  },
  {
    id: "4",
    slug: "safe-house",
    title: "Safe House",
    author: "Ellah Allfrey",
    price: 5000,
    image: "/ellah allfrey.jpg"
  }
];

export const nonFiction = mockNonFiction.map((book) => ({
  ...book,
  slug: book.title.toLowerCase().replace(/\s+/g, "-"),
  rating: Math.floor(Math.random() * 5) + 1,
  category: "Fiction"
}));
