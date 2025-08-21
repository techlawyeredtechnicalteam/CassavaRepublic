"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const featuredBooks = [
    {
      id: 1,
      title: "A pair of wings",
      author: "Carole Hopson",
      image: "/Carole-Hopson.jpg"
    },
    {
      id: 2,
      title: "The world was in our hands",
      author: "Chitra Nagarajan",
      image: "/Chitra Nagarajan.png"
    },
    {
      id: 3,
      title: "The Mercy Step",
      author: "Marcia Hutchinson",
      image: "/marcia.jpeg"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredBooks.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [featuredBooks.length]);

  // Slide animation for mobile
  const getMobileTranslate = () => {
    return `-${currentSlide * 100}%`;
  };

  const router = useRouter();

  const handleRouter = () => {
    router.push("/books");
  };

  return (
    <section className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-[96vh] w-screen flex items-center justify-center max-w-none">
      <div className="w-full h-full mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center h-full">
          {/* Left Content */}
          <div className="mb-12 lg:mb-0 flex flex-col justify-center h-full">
            <h2 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-10">
              Find Your
              <br />
              <span className="text-gray-700">Next Book</span>
            </h2>
            <div className="mb-10">
              <p className="text-gray-600 text-xl mb-3">
                Discover a world where every page brings a new adventure.
              </p>
              <p className="text-gray-600 text-xl">
                Cassava Republic, we curate a diverse collection of books.
              </p>
            </div>
            <button
              onClick={handleRouter}
              className="bg-amber-700 hover:bg-amber-800 text-white px-10 py-4 rounded-md font-semibold text-lg transition-colors inline-flex items-center"
            >
              Explore Now
            </button>
          </div>

          {/* Right Content - Book Carousel */}
          <div className="relative flex flex-col items-center justify-center h-full">
            {/* Desktop Carousel */}
            <div className="hidden md:flex justify-center items-center space-x-8 overflow-hidden h-[340px]">
              {featuredBooks.map((book, index) => (
                <div
                  key={book.id}
                  className={`transition-all duration-500 ${
                    index === currentSlide
                      ? "scale-100 z-10"
                      : index === (currentSlide + 1) % featuredBooks.length ||
                        index ===
                          (currentSlide - 1 + featuredBooks.length) %
                            featuredBooks.length
                      ? "scale-90 opacity-70"
                      : "scale-75 opacity-40"
                  }`}
                >
                  <div className="w-64 bg-white rounded-xl shadow-xl flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-40 h-56 bg-gray-200 rounded mb-4 mx-auto overflow-hidden">
                        <Image
                          src={book.image}
                          alt={book.title}
                          width={120}
                          height={168}
                          className="object-cover rounded mx-auto w-full h-full"
                        />
                      </div>
                      <h3 className="font-semibold text-lg">{book.title}</h3>
                      <p className="text-gray-500 text-base">{book.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Mobile Carousel */}
            <div className="md:hidden w-full overflow-hidden h-[340px]">
              <div
                className="flex transition-transform duration-700"
                style={{ transform: `translateX(${getMobileTranslate()})` }}
              >
                {featuredBooks.map((book) => (
                  <div
                    key={book.id}
                    className="min-w-full flex-shrink-0 flex flex-col items-center justify-center"
                  >
                    <div className="w-64 bg-white rounded-xl shadow-xl flex items-center justify-center mx-auto">
                      <div className="text-center p-6">
                        <div className="w-40 h-56 bg-gray-200 rounded mb-4 mx-auto overflow-hidden">
                          <Image
                            src={book.image}
                            alt={book.title}
                            width={120}
                            height={168}
                            className="object-cover rounded mx-auto w-full h-full"
                          />
                        </div>
                        <h3 className="font-semibold text-lg">{book.title}</h3>
                        <p className="text-gray-500 text-base">{book.author}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Carousel Indicators */}
            <div className="flex justify-center mt-8 space-x-3">
              {featuredBooks.map((_, index) => (
                <button
                  aria-label="Carousel Indicators"
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide ? "bg-amber-700" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
