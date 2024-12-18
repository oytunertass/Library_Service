import dbConnect from '@/utils/db';
import Book from '@/models/Book';
import User from '@/models/User';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    const { bookId, userid } = req.body;

    if (!mongoose.Types.ObjectId.isValid(bookId) || !mongoose.Types.ObjectId.isValid(userid)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    await dbConnect();

    const user = await User.findById(userid);
    const book = await Book.findById(bookId);

    if (!book || !user) {
      return res.status(404).json({ message: 'Book or user not found' });
    }

    if (!book.isAvailable) {
      return res.status(400).json({ message: 'Book is not available' });
    }

    // Calculate return date
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + 14);

    // Update book
    book.isAvailable = false;
    book.borrowedBy = new mongoose.Types.ObjectId(userid);
    book.returnDate = returnDate;
    await book.save();


await User.findByIdAndUpdate(
      userid,
      {
        $push: { borrowedBooks: bookId },
        $inc: { borrowedBooksCount: 1 }
      }
    );
    
    return res.status(200).json({ 
      message: 'Book borrowed successfully',
      returnDate
    });

  } catch (error) {
    console.error('Borrow error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}