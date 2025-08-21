// import React from "react";
// import type { Author } from "@/types/author";

// const AuthorSection: React.FC = () => {
//   const authors: Author[] = [
//     {
//       id: 1,
//       name: "James Clear",
//       image: "/api/placeholder/60/60",
//       latestBook: "Atomic Habits"
//     },
//     {
//       id: 2,
//       name: "Napoleon Hill",
//       image: "/api/placeholder/60/60",
//       latestBook: "Think and Grow Rich"
//     },
//     {
//       id: 3,
//       name: "Robert Kiyosaki",
//       image: "/api/placeholder/60/60",
//       latestBook: "Rich Dad Poor Dad"
//     },
//     {
//       id: 4,
//       name: "Brian Tracy",
//       image: "/api/placeholder/60/60",
//       latestBook: "Eat That Frog!"
//     }
//   ];
//   return (
//     <section className="py-12 bg-white h-[24rem]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex space-x-8 overflow-x-auto pb-4">
//           {authors.map((author) => (
//             <div
//               key={author.id}
//               className="flex-shrink-0 flex items-center space-x-3 min-w-max"
//             >
//               <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
//               <div>
//                 <p className="text-sm text-gray-600">
//                   Latest from {author.name}
//                 </p>
//                 {/* <ChevronRight className="w-4 h-4 text-gray-400 inline ml-1" /> */}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default AuthorSection;
