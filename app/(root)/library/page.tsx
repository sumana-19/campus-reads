import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import BookList from "@/components/BookList";
import { db } from "@/database/db";
import { books } from "@/database/schema";
import { ilike, or } from "drizzle-orm";

export default async function Page({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query || "";

  const allBooks = query
    ? await db
        .select()
        .from(books)
        .where(
          or(
            ilike(books.title, `%${query}%`),
            ilike(books.author, `%${query}%`),
            ilike(books.genre, `%${query}%`)
          )
        )
    : await db.select().from(books); // If no query, fetch all books

  return (
    <>
      <SearchForm query={query} />
      <BookList
        title={query ? `Search results for "${query}"` : "All Books"}
        books={allBooks}
      />
    </>
  );
}
