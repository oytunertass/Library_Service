import dbConnect from '@/utils/db';
import BookModel from '@/models/Book';
import User from '@/models/User';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { bookId } = req.body;
    if (!bookId || !mongoose.Types.ObjectId.isValid(bookId)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    await dbConnect();

    const book = await BookModel.findById(bookId).populate('borrowedBy');

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.isAvailable) {
      return res.status(400).json({ message: 'Book is not currently borrowed' });
    }
    const userId = book.borrowedBy;

    // Update book and user atomically
    await Promise.all([
      BookModel.findByIdAndUpdate(
        bookId,
        {
          isAvailable: true,
          borrowedBy: null,
          returnDate:  null
        }
      ),
      User.findByIdAndUpdate(
        userId,
        {
          $pull: { borrowedBooks: bookId },
          $push: { returnedBooks: bookId },
          $inc: { borrowedBooksCount: -1 }
        }
      )
    ]);

    return res.status(200).json({ message: 'Book returned successfully' });

  } catch (error) {
    console.error('Return book error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}