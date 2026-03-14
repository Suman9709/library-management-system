import React, { useState } from "react";
import Button from "../components/Button";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const loginMutation = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      email: form.email,
      password: form.password,
    })

  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50 px-4">

      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 md:p-8">

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-blue-600 mb-6">
          Login to Library
        </h2>


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">


          <div>
            <label className="block text-gray-600 mb-1">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>


          <div>
            <label className="block text-gray-600 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <Button className="w-full mt-2" onClick={handleSubmit}>Login</Button>

        </form>
      </div>
    </div>
  );
};

export default LoginPage;