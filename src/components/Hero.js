import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Search } from "lucide-react";

export default function Hero({ books }) {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);
  const filterBooks = useCallback((searchText) => {
    if (!searchText) {
      setFilteredBooks([]);
      return;
    }

    const searchLower = searchText.toLowerCase();
    const results = books.filter(
      (book) =>
        book.title.toLowerCase().includes(searchLower) ||
        book.author.toLowerCase().includes(searchLower)
    ).slice(0, 5); // Limit results to 5

    setFilteredBooks(results);
  }, [books]);

  // Debounced search effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterBooks(searchTerm);
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchTerm, filterBooks]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Extracted search results component for better organization
  const SearchResults = () => (
    <div className="absolute w-full mt-2 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50">
      {filteredBooks.length > 0 ? (
        <ul className="divide-y divide-gray-200">
          {filteredBooks.map((book) => (
            <SearchResultItem key={book._id} book={book} />
          ))}
          {filteredBooks.length >= 5 && (
            <ViewAllResults searchTerm={searchTerm} />
          )}
        </ul>
      ) : (
        searchTerm && (
          <div className="p-4 text-sm text-gray-500">
            No results found for {searchTerm}
          </div>
        )
      )}
    </div>
  );

  const SearchResultItem = ({ book }) => (
    <li>
      <Link href={`/books/${book._id}`}>
        <p className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-150">
          <div className="flex-shrink-0 h-12 w-12 relative">
            <Image
              src={book.image || "/Placeholder_book.svg"}
              alt={book.title}
              layout="fill"
              objectFit="cover"
              className="rounded"
              priority={false}
            />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-900">{book.title}</p>
            <p className="text-sm text-gray-500">by {book.author}</p>
          </div>
        </p>
      </Link>
    </li>
  );

  const ViewAllResults = ({ searchTerm }) => (
    <li className="p-4 bg-gray-50">
      <Link href={`/books?search=${encodeURIComponent(searchTerm)}`}>
        <p className="text-sm text-blue-600 hover:text-blue-800 font-medium">
          View all results
        </p>
      </Link>
    </li>
  );

  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
          Welcome to Your Library
        </h1>
        <p className="mt-6 text-xl max-w-3xl mx-auto">
          Discover thousands of books and embark on countless adventures through
          the pages of our vast collection.
        </p>
        
        <div className="mt-10 max-w-xl mx-auto relative" ref={searchRef}>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search for books, authors, or categories..."
              className="w-full pl-10 pr-4 py-3 text-black rounded-lg border-2 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
            />
          </div>

          {isSearchFocused && (searchTerm || filteredBooks.length > 0) && (
            <SearchResults />
          )}
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Button asChild>
            <Link href="/books">View books</Link>
          </Button>
          {session.user.role === "admin" && (
            <Button variant="secondary" asChild>
              <Link href="/books/add">Add book</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}