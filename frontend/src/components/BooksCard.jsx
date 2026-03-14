import React from "react";
import Button from "./Button";
import { useUser } from "../hooks/useUser";

const BooksCard = ({ title, author }) => {
  const { data } = useUser();

  const user = data?.data;

  const isAdmin = user?.role === "admin";

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300">

      <div className="p-4 flex flex-col gap-2">

        <h2 className="text-lg font-semibold text-gray-800">
          {title || "Book Title"}
        </h2>

        <p className="text-gray-600 text-sm">
          Author: {author || "Unknown"}
        </p>

        <Button className="mt-2">
          {isAdmin ? "Issue Book" : "Get Book"}
        </Button>

      </div>

    </div>
  );
};

export default BooksCard;