import React from "react";

const Categories: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-gray-50 via-white to-gray-100 w-screen max-w-none">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-12">
          {/* <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 tracking-tight">
            Explore Our Categories
          </h2> */}
          <p className="text-lg text-gray-600 max-w-2xl text-center">
            Discover stories and ideas from Africa and her diaspora—fiction,
            non-fiction, and more. Curated for every reader, every journey.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 justify-items-center">
          {[
            { name: "Fiction", icon: "📚", color: "bg-amber-100" },
            { name: "Non-Fiction", icon: "📚", color: "bg-amber-200" },
            { name: "Crime", icon: "📚", color: "bg-amber-50" },
            { name: "Youth Adult", icon: "📚", color: "bg-amber-100" },
            { name: "Cassava Short", icon: "📚", color: "bg-amber-200" }
          ].map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center cursor-pointer group transition-transform hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center text-3xl shadow-md group-hover:shadow-lg transition-all`}
              >
                {category.icon}
              </div>
              <span className="mt-4 text-base sm:text-lg text-gray-800 group-hover:text-amber-700 font-semibold text-center transition-colors">
                {category.name}
              </span>
              {/* <span className="mt-2 text-xs text-gray-500 group-hover:text-amber-600 transition-colors text-center">
                {category.name === "Cassava Short"
                  ? "Short stories & essays"
                  : category.name === "Youth Adult"
                  ? "For young readers"
                  : category.name === "Crime"
                  ? "Mystery & thrillers"
                  : category.name === "Non-Fiction"
                  ? "Ideas & real stories"
                  : "Novels & tales"}
              </span> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Categories;
