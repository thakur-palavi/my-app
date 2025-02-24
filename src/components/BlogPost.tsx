"use client";

import { useState, useEffect, useRef } from "react";
import { blogs } from "../app/data/blogs"; // If using static data

const ITEMS_PER_PAGE = 10;

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [displayedBlogs, setDisplayedBlogs] = useState(
    blogs.slice(0, ITEMS_PER_PAGE)
  );
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (page === 1) return;

    const newBlogs = blogs.slice(0, page * ITEMS_PER_PAGE);
    setDisplayedBlogs(newBlogs);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        Infinite Scroll Blog
      </h1>
      <div className="space-y-6">
        {displayedBlogs.map((blog) => (
          <div key={blog.id} className="p-4 border rounded shadow">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-40 object-cover mb-3"
            />
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.content}</p>
          </div>
        ))}
      </div>

      {/* Skeleton Loading (While Fetching New Data) */}
      {loading && (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="p-4 border rounded shadow animate-pulse"
            >
              <div className="w-full h-40 bg-gray-300 mb-3"></div>
              <div className="h-6 bg-gray-300 w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 w-full"></div>
            </div>
          ))}
        </div>
      )}

      {/* Loader Element for Intersection Observer */}
      <div ref={observerRef} className="h-10 mt-6 text-center">
        {displayedBlogs.length < blogs.length ? (
          <div className="flex justify-center items-center space-x-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-150"></div>
            <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce delay-300"></div>
          </div>
        ) : (
          "No more posts"
        )}
      </div>

      {/* Optional: "Load More" Button Instead of Auto-Scroll */}
      {displayedBlogs.length < blogs.length && (
        <div className="text-center mt-6">
          <button
            onClick={() => setPage((prev) => prev + 1)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

// import { useState, useEffect, useRef } from "react";
// import { blogs } from "../app/data/blogs";

// const ITEMS_PER_PAGE = 10;

// export default function BlogPage() {
//   const [page, setPage] = useState(1);
//   const [displayedBlogs, setDisplayedBlogs] = useState(
//     blogs.slice(0, ITEMS_PER_PAGE)
//   );
//   const observerRef = useRef<HTMLDivElement | null>(null);

//   useEffect(() => {
//     if (page === 1) return;

//     const newBlogs = blogs.slice(0, page * ITEMS_PER_PAGE);
//     setDisplayedBlogs(newBlogs);
//   }, [page]);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       },
//       { threshold: 1.0 }
//     );

//     if (observerRef.current) {
//       observer.observe(observerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-3xl font-bold text-center mb-6">
//         Infinite Scroll Blog
//       </h1>
//       <div className="space-y-6">
//         {displayedBlogs.map((blog) => (
//           <div key={blog.id} className="p-4 border rounded shadow">
//             <img
//               src={blog.image}
//               alt={blog.title}
//               className="w-full h-40 object-cover mb-3"
//             />
//             <h2 className="text-xl font-semibold">{blog.title}</h2>
//             <p className="text-gray-600">{blog.content}</p>
//           </div>
//         ))}
//       </div>
//       {/* Loader Element for Intersection Observer */}
//       <div ref={observerRef} className="h-10 mt-6 text-center">
//         {displayedBlogs.length < blogs.length
//           ? "Loading more..."
//           : "No more posts"}
//       </div>
//     </div>
//   );
// }
