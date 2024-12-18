import mongoose from 'mongoose';
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, default: true }, // Mevcut mu?
  image: { type: String }, // Kitap kapağı için URL
  isbn: { type: String, required: true },
  description: { type: String },
  publishedYear: { type: Number, required: true },
  borrowedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  returnDate: { type: Date, default: null },
  isAvailable : { type: Boolean, default: true }
}, { timestamps: true });


export default mongoose.models.Book || mongoose.model('Book', BookSchema);
