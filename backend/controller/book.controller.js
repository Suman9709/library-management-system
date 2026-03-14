import Book from "../models/bookModel.js";

export const addBook = async (req, res) => {
    try {
        const { title, author, isbn, category, totalCopies, availableCopies } = req.body;

        if (!title || !author || !isbn || !totalCopies) {
            return res.status(400).json({
                message: "Required fields missing"
            });
        }

        const existingBook = await Book.findOne({ isbn });
        if (existingBook) {
            return res.status(400).json({
                message: "Book with this ISBN already exists"
            });
        }

        const newBook = new Book({
            title,
            author,
            isbn,
            category,
            totalCopies,
            availableCopies
        });

        await newBook.save();
        res.status(201).json({
            message: "Book added successfully",
            book: newBook
        });
    } catch (error) {
        console.error("Error adding book:", error);
        res.status(500).json({
            message: "Server error while adding book"
        });
    }
}


export const getBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({
            message: "Books retrieved successfully",
            books
        });
    } catch (error) {
        console.error("Error retrieving books:", error);
        res.status(500).json({
            message: "Server error while retrieving books"
        });
    }
}


export const getBookById = async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOne({ isbn: isbn });
        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }
        res.status(200).json({
            message: "Book retrieved successfully",
            book
        });
    }
    catch (error) {
        console.error("Error retrieving book:", error);
        res.status(500).json({
            message: "Server error while retrieving book"
        });
    }
}


export const deleteBook = async (req, res) => {
    try {
        const { isbn } = req.params;
        const book = await Book.findOne({ isbn: isbn });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        await book.deleteOne();

        res.status(200).json({
            success: true,
            message: "Book deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({
            message: "Server error while deleting book"
        });
    }
}


export const fetchBooksByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const books = await Book.find({ category: category });

        res.status(200).json({
            success: true,
            books
        });
    } catch (error) {
        console.error("Error fetching books by category:", error);
        res.status(500).json({
            message: "Server error while fetching books by category"
        });
    }

}


export const totalBook = async (req, res) => {
    try {
        const totalBooks = await Book.countDocuments();
        res.status(200).json({
            success: true,
            data: totalBooks,
            message: "Total book count fetched successfully"
        });
    } catch (error) {
        console.error("Error fetching total book count:", error);
        res.status(500).json({
            message: "Server error while fetching total book count"
        });
    }
}

