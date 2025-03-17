"use client";
import { X } from "lucide-react";
import Link from "next/link";
import React from "react";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;

    if (form) form.reset();
  };
  return (
    <button
      type="reset"
      onClick={reset}
      className="bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-dark transition-all"
    >
      <Link href="/library" className="search-btn text-white">
        <X className="size-5" />
      </Link>
    </button>
  );
};

export default SearchFormReset;
