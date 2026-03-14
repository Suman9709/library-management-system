import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllBooks,
  fetchBooksByCategory,
} from "../services/booksapi";
import BooksCard from "../components/BooksCard";

const UserDashboard = () => {
  const [category, setCategory] = useState("");

  const stats = [
    { title: "Books Issued", value: 3, color: "bg-blue-500" },
    { title: "Books Returned", value: 10, color: "bg-green-500" },
    { title: "Due Books", value: 1, color: "bg-red-500" },
    { title: "Available Books", value: 120, color: "bg-purple-500" },
  ];

  const { data: allBooksData, isLoading: booksListLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: fetchAllBooks,
  });

  const { data: categoryBooks, isLoading: categoryLoading } = useQuery({
    queryKey: ["booksByCategory", category],
    queryFn: () => fetchBooksByCategory(category),
    enabled: !!category,
  });

  const booksToShow = category
    ? categoryBooks?.books
    : allBooksData?.books;

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          User Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your books and library activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-5 flex justify-between items-center"
          >
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>

            <div className={`${stat.color} w-12 h-12 rounded-lg`} />
          </div>
        ))}

      </div>

      <div className="bg-white shadow-md rounded-lg p-6">

        <h2 className="text-xl font-semibold mb-4">
          Quick Actions
        </h2>

        <div className="flex flex-wrap gap-4">

          <Link
            to="/books"
            className="bg-blue-500 text-white px-8 py-4 rounded-lg text-center hover:bg-blue-600 transition"
          >
            Browse Books
          </Link>

        </div>

      </div>

      <div className="flex items-center gap-4">

        <select
          className="border p-2 rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Programming">Programming</option>
          <option value="Fiction">Fiction</option>
          <option value="Science">Science</option>
          <option value="SelfHelp">Self Help</option>
        </select>

        <button
          className="bg-gray-500 text-white px-3 py-1 rounded"
          onClick={() => setCategory("")}
        >
          Reset
        </button>

      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">
          Library Books
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {(booksListLoading || categoryLoading) && (
            <p>Loading books...</p>
          )}

          {booksToShow?.map((book) => (
            <BooksCard
              key={book._id}
              title={book.title}
              author={book.author}
              isbn={book.isbn}
            />
          ))}

        </div>

      </div>

    </div>
  );
};

export default UserDashboard;