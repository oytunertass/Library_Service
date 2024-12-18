import Hero from '@/components/Hero';
import FeaturedBooks from '@/components/FeaturedBooks';
import Categories from '@/components/Categories';
import Footer from '@/components/Footer';
import dbConnect from '@/utils/db';
import BookModel from '@/models/Book';

const categories = ['All', 'Fiction', 'Non-Fiction', 'Science', 'History', 'Technology'];

export default function Home({ featuredBooks }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero books={featuredBooks} />
      <FeaturedBooks featuredBooks={featuredBooks} />
      <Categories categories={categories} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  try {
    await dbConnect();

    const allBooks = await BookModel.find().lean();
    const featuredBooks = allBooks.slice(0, 3);

    const serializedBooks = featuredBooks.map(book => ({
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
      createdAt: book.createdAt?.toISOString() || null,
      updatedAt: book.updatedAt?.toISOString() || null,
      returnDate: book.returnDate?.toISOString() || null,
      borrowedBy: book.borrowedBy?.toString() || null
    }));

    return {
      props: {
        featuredBooks: serializedBooks,
      },
    };
  } catch (error) {
    console.error('Failed to fetch featured books:', error);
    return {
      props: {
        featuredBooks: [],
        error: 'Failed to load featured books'
      },
    };
  }
}