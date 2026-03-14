import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Button from "./Button";
import { useUser } from "../hooks/useUser";
import { useLogout } from "../hooks/useLogout";

const Navbar = () => {
  const { data } = useUser();

  const user = data?.data; 
  const logoutMutation = useLogout();

  const [menuOpen, setMenuOpen] = useState(false);

  const isAdmin = user?.role === "admin";

  const userLinks = [
    
    { name: "Books", path: "/books" },
    { name: "Issued Books", path: "/issued-books" },
  ];

  const adminLinks = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Manage Books", path: "/admin/books" },
    { name: "Issued Books", path: "/admin/issued-books" },
  ];

  const links = isAdmin ? adminLinks : userLinks;

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">
          LibraryMS
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-6 items-center">

          {user &&
            links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `font-medium ${
                    isActive ? "text-blue-600" : "text-gray-700"
                  } hover:text-blue-600`
                }
              >
                {link.name}
              </NavLink>
            ))}

          {user ? (
            <div className="flex items-center gap-3">
              <span>{user?.name}</span>

              <Button
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
              >
                Logout
              </Button>
            </div>
          ) : (
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 flex flex-col gap-3">

          {user &&
            links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className="text-gray-700 font-medium hover:text-blue-600"
              >
                {link.name}
              </NavLink>
            ))}

          {user ? (
            <>
              <div className="flex items-center gap-2 mt-2">
                
                <span>{user?.name}</span>
              </div>

              <Button
                className="mt-2"
                onClick={() => logoutMutation.mutate()}
              >
                Logout
              </Button>
            </>
          ) : (
            <NavLink to="/login">
              <Button>Login</Button>
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;