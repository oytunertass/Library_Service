import dbConnect from '../../../utils/db';
import Book from '../../../models/Book';

export default async function handler(req, res) {
  await dbConnect();
  const { method, query: { id } } = req;

  switch (method) {
    case 'PUT':
      const updatedBook = await Book.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({ success: true, data: updatedBook });
      break;
    case 'DELETE':
      await Book.findByIdAndDelete(id);
      res.status(204).json({ success: true });
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
