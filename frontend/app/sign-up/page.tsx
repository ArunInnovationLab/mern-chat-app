"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import useSignUp from "@/hooks/useSignUp";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [gender, setGender] = useState("Male");

  const { loading, signUp } = useSignUp();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate inputs
    const trimmedFullName = fullName.trim();
    const trimmedUsername = username.trim();

    if (trimmedFullName === "") {
      toast.error("Full name cannot be empty or consist only of spaces.");
      return;
    } else if (trimmedUsername === "") {
      toast.error("Username cannot be empty or consist only of spaces.");
      return;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    } else if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = {
      fullName,
      username: trimmedUsername,
      password,
      confirmPassword,
      gender,
    };

    signUp({ data: { ...data } });
  };

  return (
    <div className="bg-gray-400 flex items-center justify-center h-screen">
      <div className="bg-white text-black w-96 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-lg font-medium mb-1"
            >
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              id="fullName"
              type="text"
              className="w-full border rounded-md py-2 px-3 border-gray-300"
              placeholder="Enter your full name"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-lg font-medium mb-1"
            >
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
            <label
              htmlFor="password"
              className="block text-lg font-medium mb-1"
            >
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-lg font-medium mb-1"
            >
              Confirm Password <span className="text-red-600">*</span>
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full border rounded-md py-2 px-3 border-gray-300"
              placeholder="Confirm your password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="gender" className="block text-lg font-medium mb-1">
              Gender
            </label>
            <select
              id="gender"
              className="w-full border rounded-md py-2 px-3 border-gray-300"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="flex justify-center mb-4">
            <button
              disabled={loading}
              type="submit"
              className="font-bold text-white bg-blue-600 hover:bg-blue-700 transition duration-300 rounded-md py-2 px-4 disabled:opacity-50"
            >
              Sign Up
            </button>
          </div>

          <div className="text-center">
            <p>
              Already have an account?{" "}
              <Link href="/sign-in" className="text-blue-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
