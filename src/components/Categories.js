'use client'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Categories({ categories }) {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Categories</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <Button key={category} variant="outline" asChild>
              <Link href={`/books?category=${category}`}>{category}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}