'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FeaturedBooks({ featuredBooks }) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredBooks.map((book) => (
            <Card key={book.id}>
              <CardContent className="p-4">
                <Image
                  src={book.image}
                  alt={book.title}
                  width={300}
                  height={400}
                  className="w-full h-64 object-cover rounded-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-900">{book.title}</h3>
                <p className="text-sm text-gray-600">{book.author}</p>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/books/${book._id}`}>View Details</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}