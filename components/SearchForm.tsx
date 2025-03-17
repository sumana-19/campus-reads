import React from "react";
import { Search } from "lucide-react"; // Search icon
import Form from "next/form";
import { searchBooks } from "@/lib/actions/book";
import SearchFormReset from "./SearchFormReset";

const SearchForm = ({ query }: { query?: string }) => {
  console.log(`SearchForm: ${query}`);
  return (
    <div className="flex flex-col items-center text-center gap-4 mt-10 pb-10">
      <p className="font-bebas-neue text-2xl text-light-100">
        Discover your next great read
      </p>
      <h1 className="text-white text-3xl font-bold">
        Explore and Search for Any Book in Our Library
      </h1>

      <Form
        action="/library"
        scroll={false}
        className="relative w-full max-w-xl mt-6 flex items-center gap-2 bg-dark-300 rounded-2xl px-5 py-4 shadow-md focus-within:ring-2 focus-within:ring-primary transition-all search-form"
      >
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-light-100 size-6" />

        <input
          name="query"
          defaultValue={query}
          className="w-full pl-12 pr-4 py-2 rounded-xl bg-transparent text-white placeholder:text-light-100 border-none focus:outline-none"
          placeholder="Search Books..."
        />

        {query && <SearchFormReset />}

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-all"
        >
          <Search className="size-5" />
        </button>
      </Form>
    </div>
  );
};

export default SearchForm;
