// dbconfig/Models/Books.js
import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: String,
    date: String
});

// Check if the model already exists
const BookModel = mongoose.models.Book || mongoose.model("Book", bookSchema);

export default BookModel 