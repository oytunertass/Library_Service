import React, { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import dbConnect from '@/utils/db';
import Book from '@/models/Book';

const BooksPage = (
  { books, error }
) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['All', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Technology'];

  const filteredBooks = books?.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory.toLowerCase() === 'all' || 
                          book.category?.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 md:mb-0">Library Books</h1>
          <div className="w-full md:w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category.toLowerCase() ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.toLowerCase())}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Books Grid */}
     
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link key={book._id} href={`/books/${book._id}`}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative h-64 w-full">
                    <Image
                      src={book.image || '/placeholder-book.jpg'}
                      alt={book.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{book.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
                    {book.category && (
                      <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                        {book.category}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
     

      
      </div>
    </div>
  );
};


export async function getServerSideProps() {
  await dbConnect();

    // Find books and convert to plain objects
    const books = await Book.find({})
      .lean()
      .exec();

    // Transform data to be serializable
    const serializedBooks = books.map(book => ({
      _id: book._id.toString(),
      title: book.title,
      author: book.author,
      description: book.description,
      category: book.category,
      publishedYear: book.publishedYear,
      isbn: book.isbn,
      image: book.image,
      isAvailable: book.isAvailable,
      status: book.status,
    }));


  return {
    props: {
      books: serializedBooks,
    },
  };
}

export default BooksPage;