import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchAllBooks, issuedBooks, totalBooks } from "../services/booksapi";
import { totalUser } from "../services/authApi";
import BooksCard from "../components/BooksCard";


const AdminDashboard = () => {

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

  const { data: allBooksData, isLoading: booksListLoading } = useQuery({
    queryKey: ["allBooks"],
    queryFn: fetchAllBooks,
  });

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


      <div>
        <h2 className="text-xl font-semibold mb-4">Library Books</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {booksListLoading && <p>Loading books...</p>}

          {allBooksData?.books?.map((book) => (
            <BooksCard
              key={book._id}
              title={book.title}
              author={book.author}
            />
          ))}

        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;