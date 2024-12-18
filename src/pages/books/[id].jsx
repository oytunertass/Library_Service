import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Calendar, Book, Clock } from 'lucide-react';
import dbConnect from '@/utils/db';
import BookModel from '@/models/Book';
import Link from 'next/link';
  export default function BookDetail({ book, error , relatedBooks }) {
    const { data: session } = useSession();
    if (error) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <h1 className="text-2xl font-bold text-red-600">{error}</h1>
        </div>
      );
    }
    async function borrowBook(bookId, userid) {
      const res = await fetch(`/api/books/borrow`, {
        method: 'POST',
        body: JSON.stringify({ bookId, userid }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) window.location.reload();
    }
    
    async function returnBook(bookId) {
      const res = await fetch(`/api/books/return`, {
        method: 'POST',
        body: JSON.stringify({ bookId }),
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.ok) window.location.reload();
    }
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-5xl mx-auto px-4">
          {/* Kitap Detayları */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="md:flex">
              {/* Kitap Görseli */}
              <div className="relative h-96 w-full md:w-1/3">
                <Image
                  src={book.image || '/placeholder-book.jpg'}
                  alt={book.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg md:rounded-l-lg"
                />
              </div>
              {/* Detaylar */}
              <div className="p-6 flex-1">
                <h1 className="text-3xl font-bold text-black">{book.title}</h1>
                <p className="text-xl text-gray-600">by {book.author}</p>
                <p className="mt-4 text-gray-700">{book.description}</p>
  
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="flex items-center text-gray-600">
                    <Book className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{book.category}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
  
                {session && (
  <>
    {book.isAvailable ? (
      <Button
        onClick={() => borrowBook(book._id, session.user.id)}
        className="mt-6 w-full bg-blue-500 hover:bg-blue-700"
      >
        Borrow Now
      </Button>
    ) : book.borrowedBy === session.user.id ? (
      <Button
        onClick={() => returnBook(book._id)}
        className="mt-6 w-full bg-red-500 hover:bg-red-700"
      >
        Return Book
      </Button>
    ) : (
      <div className="mt-6">
        <p className="text-gray-600">
          This book is currently borrowed by another user. Available on{' '}
          <span className="font-bold">{new Date(book.returnDate).toLocaleDateString()}</span>.
        </p>
        <Button disabled className="mt-4 w-full bg-gray-400">
          Not Available
        </Button>
      </div>
    )}
  </>
)}

              </div>
            </div>
          </div>
  
          {/* Önerilen Kitaplar */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 text-green-600">You Might Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {relatedBooks.map((relatedBook) => (
                <
                Link key={relatedBook._id} href={`/books/${relatedBook._id}`}>
                <div
                  key={relatedBook._id}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="relative h-48">
                    <Image
                      src={relatedBook.image || '/placeholder-book.jpg'}
                      alt={relatedBook.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-orange-600">{relatedBook.title}</h3>
                    <p className="text-gray-600">{relatedBook.author}</p>
                  </div>
                </div>
              </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();

          
    
    const book = await BookModel.findById(params.id);

    const relatedBooks = await BookModel.find(
        { _id: { $ne: params.id } },
        { title: 1, author: 1, image: 1 }
        ).limit(5);
    
    if (!book) {
      return {
        props: {
          error: "Book not found"
        }
      };
    }

    return {
      props: {
        book: JSON.parse(JSON.stringify(book)),
        relatedBooks: JSON.parse(JSON.stringify(relatedBooks))
      }
    };
  } catch (error) {
    return {
      props: {
        error: "Failed to load book"
      }

    };
  }
}