"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

const Footer: React.FC = () => {
  // const [newsletterEmail, setNewsletterEmail] = useState("");
  // const [isSubscribed, setIsSubscribed] = useState(false);

  // const handleNewsletterSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   if (newsletterEmail.trim()) {
  //     // Handle newsletter subscription logic here
  //     setIsSubscribed(true);
  //     setNewsletterEmail("");
  //     setTimeout(() => setIsSubscribed(false), 3000);
  //   }
  // };

  const footerSections: FooterSection[] = [
    {
      title: "Quick Links",
      links: [
        { label: "Home", href: "/" },
        { label: "About Us", href: "/about" },
        { label: "New Release", href: "/new-release" },
        { label: "Contact Us", href: "/contact" },
        { label: "Blog", href: "/blog" }
      ]
    },
    {
      title: "Categories",
      links: [
        { label: "Fiction", href: "/books/fiction" },
        { label: "Non-Fiction", href: "/books/non-fiction" },
        { label: "Children's Books", href: "/books/children" },
        { label: "Poetry", href: "/books/poetry" },
        { label: "Academic", href: "/books/academic" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "FAQ", href: "/faq" },
        { label: "Shipping Info", href: "/shipping" },
        { label: "Returns", href: "/returns" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" }
      ]
    }
  ];

  const socialLinks = [
    { icon: "facebook", href: "#", label: "Facebook" },
    { icon: "instagram", href: "#", label: "Instagram" },
    { icon: "linkedin", href: "#", label: "LinkedIn" },
    { icon: "twitter", href: "#", label: "Twitter" },
    { icon: "youtube", href: "#", label: "YouTube" }
  ];

  const contactInfo = [
    {
      // icon: <Phone className="w-5 h-5" />,
      label: "Phone",
      value: "+234 (0) 123 456 7890",
      href: "tel:+2341234567890"
    },
    {
      // icon: <Mail className="w-5 h-5" />,
      label: "Email",
      value: "info@cassavarepublic.com",
      href: "mailto:info@cassavarepublic.com"
    },
    {
      // icon: <MapPin className="w-5 h-5" />,
      label: "Address",
      value: "Lagos, Nigeria",
      href: "#"
    }
  ];

  return (
    <footer className="bg-white border-t border-gray-100">
      {/* Newsletter Section */}
      {/* <div className="bg-amber-800 text-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter to get the latest updates on new
              releases, author events, and exclusive offers from Cassava
              Republic.
            </p>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <div className="flex-1">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-md text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2 font-medium"
              >
                <span>Subscribe</span>
              </button>
            </form>

            {isSubscribed && (
              <p className="mt-4 text-green-200 font-medium">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
          </div>
        </div>
      </div> */}

      {/* Main Footer Content */}
      <div className="bg-white">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <Link href="/" className="inline-block mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image
                      src="/cassava-logo.png"
                      alt="Cassava Republic Logo"
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900">
                      Cassava Republic
                    </h4>
                    <p className="text-sm text-gray-600">
                      African Literature & Publishing
                    </p>
                  </div>
                </div>
              </Link>

              <p className="text-gray-600 mb-6 max-w-md">
                Celebrating African stories and voices. We publish and
                distribute contemporary African literature that reflects the
                diversity and richness of the continent.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    {/* <div className="text-orange-500">{contact.icon}</div> */}
                    {contact.href !== "#" ? (
                      <Link
                        href={contact.href}
                        className="text-gray-600 hover:text-orange-500 transition-colors duration-200"
                      >
                        {contact.value}
                      </Link>
                    ) : (
                      <span className="text-gray-600">{contact.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Links Sections */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h5 className="text-lg font-semibold text-gray-900 mb-4">
                  {section.title}
                </h5>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-orange-500 transition-colors duration-200 text-sm"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-amber-800 border-t border-gray-100">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center py-6 space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-white text-center md:text-left">
              <p>
                © {new Date().getFullYear()} Cassava Republic. All rights
                reserved.
              </p>
            </div>

            {/* Social Media Links */}
            <div className="flex items-center space-x-6">
              <span className="text-sm text-white hidden sm:block">
                Follow us:
              </span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <Link
                    key={social.icon}
                    href={social.href}
                    className="text-white hover:text-orange-500 transition-colors duration-200"
                    aria-label={social.label}
                  >
                    {social.icon === "facebook" && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    )}
                    {social.icon === "instagram" && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    )}
                    {social.icon === "linkedin" && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                    {social.icon === "twitter" && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    )}
                    {social.icon === "youtube" && (
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
