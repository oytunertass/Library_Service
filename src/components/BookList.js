import React from 'react';

const BookList = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div key={book._id} className="p-4 border rounded-lg shadow">
          <h2 className="text-lg font-bold">{book.title}</h2>
          <p className="text-gray-600">{book.author}</p>
          <p className="text-sm text-gray-500">{book.category}</p>
          <span className={`text-sm ${book.status ? 'text-green-500' : 'text-red-500'}`}>
            {book.status ? 'Available' : 'Borrowed'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default BookList;
