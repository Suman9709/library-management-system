import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-3">

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            LibraryMS
          </h2>
          <p className="text-sm">
            A simple library management system to manage books,
            issues and returns efficiently.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Quick Links
          </h2>
          <ul className="space-y-1 text-sm">
            <li className="hover:text-white cursor-pointer">Home</li>
            <li className="hover:text-white cursor-pointer">Books</li>
            <li className="hover:text-white cursor-pointer">Issue Book</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-white mb-2">
            Contact
          </h2>
          <p className="text-sm">Email: support@library.com</p>
          <p className="text-sm">Phone: +91 1234567890</p>
        </div>

      </div>

      <div className="text-center text-sm border-t border-gray-700 py-4">
        © 2026 LibraryMS. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;