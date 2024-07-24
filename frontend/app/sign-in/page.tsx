"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    const trimmedUsername = username.trim();

    if (trimmedUsername === "") {
      toast.error("Username cannot be empty or consist only of spaces.");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }

    // Redirect to the desired page after successful validation
    router.push("/dashboard"); // Update the route as needed
  };

  return (
    <div className="bg-gray-400 flex items-center justify-center h-screen">
      <div className="bg-white text-black w-96 p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold text-center mb-6">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-lg font-medium mb-1">
              Username <span className="text-red-600">*</span>
            </label>
            <input
              id="username"
              type="text"
              className="w-full border rounded-md py-2 px-3 border-gray-300"
              placeholder="Enter your username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-lg font-medium mb-1">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              type="password"
              className="w-full border rounded-md py-2 px-3 border-gray-300"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-center mb-4">
            <button
              type="submit"
              className="font-bold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md py-2 px-4"
            >
              Sign In
            </button>
          </div>

          <div className="text-center">
            <p>
              Don’t have an account?{" "}
              <a href="/dashboard" className="text-blue-600 hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;

