import { Product } from "@/types/product";

const mockForthComingTitle: Product[] = [
  {
    id: "1",
    slug: "A-pair-of-wing",
    title: "A Pair of Wing",
    author: "Carole Hopson",
    price: 10000,
    image: "/Carole-Hopson.jpg"
  },
  {
    id: "2",
    slug: "the-mercy-steps",
    title: "The Mercy Steps",
    author: "Marcia Hutchinson",
    price: 13000,
    image: "/marcia.jpeg"
  },
  {
    id: "3",
    slug: "hassan-and-hassana-share-everything",
    title: "Hassan and Hassana Share Everything",
    author: "Chinyere",
    price: 4500,
    image: "/Chinyere.jpeg"
  },
  {
    id: "4",
    slug: "henrietta-lacks",
    title: "Henrietta Lacks: The Mother of Modern Medicine",
    author: "Henrietta",
    price: 3000,
    image: "/Henrietta.png"
  }
];

export const forthComingTitle = mockForthComingTitle.map((book) => ({
  ...book,
  slug: book.title.toLowerCase().replace(/\s+/g, "-"),
  rating: Math.floor(Math.random() * 5) + 1,
  category: "Fiction"
}));
