import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import UserDetailsCard from "@/components/UserDetailsCard";
import { Button } from "@/components/ui/button";
import { db } from "@/database/db";
import { books, borrowRecords, users } from "@/database/schema";
import { formatBorrowedBook } from "@/lib/utils";
import { eq, inArray } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return;

  const userDetails = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  const borrowedBooksRaw = await db
    .select({
      id: books.id,
      title: books.title,
      genre: books.genre,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, userId));

  const borrowedBooks = borrowedBooksRaw.map((book) => {
    const { borrowedText: borrowDate, daysLeftText: dueDate } =
      formatBorrowedBook(book.borrowDate.toISOString(), book.dueDate);

    return {
      ...book,
      borrowDate,
      dueDate,
      isLoanedBook: true,
    };
  });

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10 flex justify-end"
      >
        <Button className="hover:bg-red-600 px-6 py-2">Logout</Button>
      </form>
      <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
        <div className="md:w-1/3 w-full">
          <UserDetailsCard userDetails={userDetails[0]} session={session} />
        </div>

        <div className="md:w-2/3 w-full">
          <BookList title="Borrowed Books" books={borrowedBooks} />
        </div>
      </div>
    </>
  );
};

export default Page;
