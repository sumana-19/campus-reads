import { auth, signOut } from "@/auth";
import BookList from "@/components/BookList";
import UserDetailsCard from "@/components/UserDetailsCard";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constants";
import { db } from "@/database/db";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, inArray } from "drizzle-orm";
import React from "react";

// const Page = async () => {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) return;

//   const userDetails = await db.select().from(users).where(eq(users.id, userId));

//   const borrowedBookIds = await db
//     .select({ bookId: borrowRecords.bookId })
//     .from(borrowRecords)
//     .where(eq(borrowRecords.userId, userId));
//   const bookIds = borrowedBookIds.map((record) => record.bookId);

//   const borrowedBooks = await db
//     .select()
//     .from(books)
//     .where(inArray(books.id, bookIds));

//   return (
//     <>
//       <form
//         action={async () => {
//           "use server";

//           await signOut();
//         }}
//         className="mb-10"
//       >
//         <Button>Logout</Button>
//       </form>
//       <UserDetailsCard userDetails={userDetails} session={session} />
//       <BookList title="Borrowed Books" books={borrowedBooks} />
//     </>
//   );
// };

const Page = async () => {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) return;

  const userDetails = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  console.log(`userDetails page.tsx: ${JSON.stringify(userDetails, null, 2)}`);

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
    <div className="container mx-auto px-6 py-10 flex flex-col md:flex-row gap-10">
      {/* Left Section: User Details */}
      <div className="md:w-1/3 w-full">
        <UserDetailsCard userDetails={userDetails[0]} session={session} />
      </div>

      {/* Right Section: Borrowed Books */}
      <div className="md:w-2/3 w-full">
        <BookList title="Borrowed Books" books={borrowedBooks} />
      </div>
    </div>
  );
};

export default Page;
