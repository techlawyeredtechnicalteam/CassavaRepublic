"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from "lucide-react";
import type { NavItems } from "@/types/header";
import { useCartStore } from "@/store/zustand";

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

// Extended NavItems type to include dropdown items
interface ExtendedNavItems extends NavItems {
  dropdownItems?: DropdownItem[];
}

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const itemCount = useCartStore((state) => state.getItemCount());

  const booksDropdown: DropdownItem[] = [
    {
      label: "Fiction",
      href: "/books/fiction",
      description: "Novels and short stories"
    },
    {
      label: "Non-Fiction",
      href: "/books/non-fiction",
      description: "Biographies, essays, and more"
    },
    {
      label: "Poetry",
      href: "/books/poetry",
      description: "Contemporary African poetry"
    },
    {
      label: "Children's Books",
      href: "/books/children",
      description: "Stories for young readers"
    },
    {
      label: "Academic",
      href: "/books/academic",
      description: "Scholarly and educational texts"
    },
    {
      label: "Young Adult",
      href: "/books/young-adult",
      description: "Books for teens and young adults"
    },
    {
      label: "All Books",
      href: "/books",
      description: "Browse our complete collection"
    }
  ];

  const projectsDropdown: DropdownItem[] = [
    {
      label: "Reading Programs",
      href: "/projects/reading-programs",
      description: "Community literacy initiatives"
    },
    {
      label: "Author Events",
      href: "/projects/author-events",
      description: "Book launches and readings"
    },
    {
      label: "Publishing Support",
      href: "/projects/publishing-support",
      description: "Support for emerging authors"
    },
    {
      label: "Educational Partnerships",
      href: "/projects/educational-partnerships",
      description: "School and university collaborations"
    }
  ];

  const navItems: ExtendedNavItems[] = [
    { label: "HOME", href: "/", isActive: true },
    { label: "ABOUT US", href: "/about" },
    {
      label: "BOOKS",
      href: "/books",
      hasDropDown: true,
      dropdownItems: booksDropdown
    },
    { label: "NEW RELEASE", href: "/new-release" },
    {
      label: "PROJECTS",
      href: "/projects",
      hasDropDown: true,
      dropdownItems: projectsDropdown
    },
    { label: "CONTACT US", href: "/contact" },
    { label: "BLOG", href: "/blog" }
  ];

  const socialLinks = [
    { icon: "facebook", href: "#", label: "Facebook" },
    { icon: "instagram", href: "#", label: "Instagram" },
    { icon: "linkedin", href: "#", label: "LinkedIn" },
    { icon: "twitter", href: "#", label: "Twitter" },
    { icon: "youtube", href: "#", label: "YouTube" }
  ];

  // const toggleMenu = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

  const handleDropdownToggle = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const NewsletterButton = () => (
    <Link
      href="/newsletter"
      className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
      aria-label="Go to Newsletter"
    >
      Newsletter
    </Link>
  );

  return (
    <header className="bg-white">
      {/* Top Bar */}
      <div className="bg-amber-800 text-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end items-center h-12 text-sm">
            {/* Social Media Icons */}
            <div className="flex items-center space-x-6 sm:space-x-8">
              {socialLinks.map((social) => (
                <Link
                  key={social.icon}
                  href={social.href}
                  className="hover:text-gray-300 transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon === "facebook" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  )}
                  {social.icon === "instagram" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  )}
                  {social.icon === "linkedin" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  )}
                  {social.icon === "twitter" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  )}
                  {social.icon === "youtube" && (
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                  )}
                </Link>
              ))}
              <div>
                <NewsletterButton />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20 w-full">
            {/* Logo - Left */}
            <div className="flex-shrink-0">
              <Link href="/">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                      src="/cassava-logo.png"
                      alt="Cassava Republic Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>
              </Link>
            </div>

            {/* Nav Items - Center */}
            <nav className="hidden lg:flex flex-1 justify-center items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasDropDown && handleMouseEnter(item.label)
                  }
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={`relative flex items-center space-x-1 text-sm font-medium tracking-wide transition-colors duration-200 hover:text-orange-500 ${
                      item.isActive ? "text-orange-500" : "text-gray-700"
                    }`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropDown && (
                      <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                    )}
                    {item.isActive && (
                      <span className="absolute -bottom-6 left-0 right-0 h-0.5 bg-orange-500"></span>
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropDown &&
                    item.dropdownItems &&
                    activeDropdown === item.label && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                        <div className="max-h-96 overflow-y-auto">
                          {item.dropdownItems.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="block px-4 py-3 hover:bg-gray-50 transition-colors duration-200 group"
                            >
                              <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900 group-hover:text-orange-500 transition-colors duration-200">
                                  {dropdownItem.label}
                                </span>
                                {dropdownItem.description && (
                                  <span className="text-xs text-gray-500 mt-1">
                                    {dropdownItem.description}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions - Far Right */}
            <div className="flex items-center space-x-4 ml-auto">
              {/* Search Bar (desktop only) */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Books"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                  aria-label="Account"
                >
                  <User className="w-5 h-5" />
                </button>

                <Link
                  href="/cart"
                  className="p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200 relative"
                  aria-label={`Shopping Cart with ${itemCount} items`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                      {itemCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="lg:hidden p-2 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-4 py-4 space-y-4">
              {/* Mobile Search */}
              <div className="relative md:hidden mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search Books"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm"
                />
              </div>

              {/* Mobile Navigation */}
              <nav className="space-y-4">
                {navItems.map((item) => (
                  <div key={item.href} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Link
                        href={item.href}
                        className={`block text-base font-medium transition-colors duration-200 hover:text-orange-500 ${
                          item.isActive ? "text-orange-500" : "text-gray-700"
                        }`}
                        onClick={() =>
                          !item.hasDropDown && setIsMenuOpen(false)
                        }
                      >
                        {item.label}
                      </Link>
                      {item.hasDropDown && (
                        <button
                          onClick={() => handleDropdownToggle(item.label)}
                          className="p-1 text-gray-600 hover:text-orange-500 transition-colors duration-200"
                          aria-label={`Toggle ${item.label} dropdown`}
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              activeDropdown === item.label ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Dropdown */}
                    {item.hasDropDown &&
                      item.dropdownItems &&
                      activeDropdown === item.label && (
                        <div className="ml-4 space-y-2 border-l-2 border-gray-100 pl-4">
                          {item.dropdownItems.map((dropdownItem, index) => (
                            <Link
                              key={index}
                              href={dropdownItem.href}
                              className="block text-sm text-gray-600 hover:text-orange-500 transition-colors duration-200 py-1"
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {dropdownItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                  </div>
                ))}
              </nav>
              <div>
                <NewsletterButton />
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
