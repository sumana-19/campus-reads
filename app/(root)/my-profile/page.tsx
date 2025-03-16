import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/db";
import { books, borrowRecords } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";
import React from "react";

const Page = async () => {
  const userId = (await auth())?.user?.id;

  if (!userId) return;

  const borrowedBookIds = await db
    .select({ bookId: borrowRecords.bookId })
    .from(borrowRecords)
    .where(eq(borrowRecords.userId, userId));
  const bookIds = borrowedBookIds.map((record) => record.bookId);

  const borrowedBooks = await db
    .select()
    .from(books)
    .where(inArray(books.id, bookIds));

  return (
    <>
      <form
        action={async () => {
          "use server";

          await signOut();
        }}
        className="mb-10"
      >
        <Button>Logout</Button>
      </form>

      <BookList title="Borrowed Books" books={borrowedBooks} />
    </>
  );
};

export default Page;
