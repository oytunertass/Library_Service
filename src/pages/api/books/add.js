import dbConnect from '@/utils/db';
import Book from '@/models/Book';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const session = await getServerSession(req, res, authOptions);
    if (!session) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    await dbConnect();

    const newBook = new Book({
      ...req.body,
      isAvailable: true,
      borrowedBy: null,
      status: true
    });

    await newBook.save();
    
    res.status(201).json({ message: 'Book added successfully' });
  } catch (error) {
    console.error('Add book error:', error);
    res.status(500).json({ message: 'Failed to add book' });
  }
}