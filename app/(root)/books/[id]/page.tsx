import BookOverview from "@/components/BookOverview";
import { sampleBooks } from "@/constants";
import React from "react";

const BookPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return <BookOverview {...sampleBooks[id - 1]} />;
};

export default BookPage;
