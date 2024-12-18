import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  role: { type: String, enum: ['member', 'admin'], default: 'member' },
  borrowedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    borrowedBooksCount: { type: Number, default: 0 },
    returnedBooks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
