import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  fetchAllBooks,
  issuedBooks,
  totalBooks,
  fetchBooksByCategory,
} from "../services/booksapi";
import { totalUser } from "../services/authApi";
import BooksCard from "../components/BooksCard";

const AdminDashboard = () => {
  const [category, setCategory] = useState("");

  const { data: booksData, isLoading: booksLoading } = useQuery({
    queryKey: ["totalBooks"],
    queryFn: totalBooks,
  });

  const { data: issuedData, isLoading: issuedLoading } = useQuery({
    queryKey: ["issuedBooks"],
    queryFn: issuedBooks,
  });


  const { data: usersData, isLoading: usersLoading } = useQuery({
    queryKey: ["totalUsers"],
    queryFn: totalUser,
  });


  const { data: allBooksData, isLoading: booksListLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: fetchAllBooks,
  });


  const { data: categoryBooks, isLoading: categoryLoading } = useQuery({
    queryKey: ["booksByCategory", category],
    queryFn: () => fetchBooksByCategory(category),
    enabled: !!category,
  });

  const stats = [
    {
      title: "Total Books",
      value: booksLoading ? "..." : booksData?.data || 0,
      color: "bg-blue-500",
    },
    {
      title: "Issued Books",
      value: issuedLoading ? "..." : issuedData?.data?.length || 0,
      color: "bg-green-500",
    },
    {
      title: "Total Users",
      value: usersLoading ? "..." : usersData?.data || 0,
      color: "bg-purple-500",
    },
    {
      title: "Available Books",
      value:
        booksLoading || issuedLoading
          ? "..."
          : (booksData?.data || 0) - (issuedData?.data?.length || 0),
      color: "bg-orange-500",
    },
  ];


  const booksToShow = category
    ? categoryBooks?.books
    : allBooksData?.books;

  return (
    <div className="space-y-8">


      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-500">
          Manage your library system
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

export default AdminDashboard;