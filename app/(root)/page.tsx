import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import { db } from "@/database/db";
import { books, users } from "@/database/schema";
// import { auth } from "@/auth";
// import { desc } from "drizzle-orm";

const Home = async () => {
  // const session = await auth();

  // const latestBooks = (await db
  //   .select()
  //   .from(books)
  //   .limit(10)
  //   .orderBy(desc(books.createdAt))) as Book[];

  const data = await db.select().from(users);
  console.log(JSON.stringify(data, null, 2));

  return (
    <>
      <BookOverview
        {...sampleBooks[0]}
        // userId={session?.user?.id as string}
      />

      <BookList
        title="Latest Books"
        books={sampleBooks}
        containerClassName="mt-28"
      />
    </>
  );
};

export default Home;
