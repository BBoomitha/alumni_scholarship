import React from "react";

export default function NavBar(): JSX.Element {
  return (
    <header className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center space-x-8">
            <div className="text-xl font-segoe font-semibold text-gray-900">
              AlumniDB
            </div>
            <nav className="hidden md:flex items-center space-x-3">
              <a
                href="#"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Product
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Solutions
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Resources
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Enterprise
                <svg
                  className="w-3 h-3 text-gray-500"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Customers
              </a>
              <a
                href="#"
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Pricing
              </a>
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm text-gray-700 hover:text-gray-900">
              Log in
            </a>
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 bg-black text-white text-sm font-semibold rounded-full hover:opacity-90"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
