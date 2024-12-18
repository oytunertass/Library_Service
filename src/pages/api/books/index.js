import dbConnect from '../../../utils/db';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  await dbConnect();
  const { method } = req;

  switch (method) {
    case 'POST':
      const book = await Book.create(req.body);
      res.status(201).json({ success: true, data: book });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
