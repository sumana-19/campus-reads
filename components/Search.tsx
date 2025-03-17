import React from "react";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react"; // Import an icon for better UI

const Search = () => {
  return (
    <div className="flex flex-col items-center text-center gap-4 mt-10 pb-10">
      <p className="font-bebas-neue text-2xl text-light-100">
        Discover your next great read
      </p>
      <h1 className="text-white text-3xl font-bold">
        Explore and Search for Any Book in Our Library
      </h1>

      <div className="relative w-full max-w-lg mt-6">
        <SearchIcon className="absolute left-5 top-1/2 transform -translate-y-1/2 text-light-100 size-6" />
        <Input
          type="search"
          placeholder="Search books..."
          className="w-full h-15 pl-14 pr-5 py-5 rounded-2xl bg-dark-300 text-white placeholder:text-light-100 border-none focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 text-lg"
        />
      </div>
    </div>
  );
};

export default Search;
