import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import Search from "@/components/Search";
import { db } from "@/database/db";
import { books, borrowRecords } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const allBooks = await db.select().from(books);

  return (
    <>
      <Search />
      <BookList title="All Library Books" books={allBooks} />
    </>
  );
};

export default Page;
