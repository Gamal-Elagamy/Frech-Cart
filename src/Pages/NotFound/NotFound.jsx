import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white rounded-lg">
      <div className="flex flex-col items-center justify-center w-full h-full p-6 bg-white dark:bg-gray-900 rounded-lg shadow-xl">
        <img
          src="https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
          alt="Not Found"
          className="w-80 mb-6 transition-transform transform hover:scale-110 rounded-lg"
        />
        <h1 className="text-4xl font-bold mb-2">Oops! Page Not Found</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
        <Link
          to="/"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-medium shadow-md hover:bg-blue-700 transition dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
