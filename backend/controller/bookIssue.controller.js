import Issue from "../models/issueModel.js";
import Book from "../models/bookModel.js";
import FinePayment from "../models/finePaymentModel.js";




export const issueBook = async (req, res) => {
    try {

        const { isbn } = req.body;
        const userId = req.user._id;

        const book = await Book.findOne({ isbn });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        if (book.availableCopies <= 0) {
            return res.status(400).json({
                message: "Book not available"
            });
        }

        const issuedCount = await Issue.countDocuments({
            user: userId,
            status: "issued"
        });

        if (issuedCount >= 3) {
            return res.status(400).json({
                message: "You cannot issue more than 3 books"
            });
        }
        const alreadyIssued = await Issue.findOne({
            user: userId,
            book: book._id,
            status: "issued"
        });

        if (alreadyIssued) {
            return res.status(400).json({
                message: "You already issued this book"
            });
        }


        const dueDate = new Date();
        dueDate.setDate(dueDate.getDate() + 7);

        const issue = await Issue.create({
            user: userId,
            book: book._id,
            dueDate
        });

        book.availableCopies -= 1;
        await book.save();

        res.status(201).json({
            success: true,
            message: "Book issued successfully",
            issue
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


export const getUserIssuedBooks = async (req, res) => {
    try {

        const userId = req.user._id;

        const issues = await Issue.find({
            user: userId
        }).populate("book");

        res.status(200).json({
            success: true,
            issues
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error"
        });

    }
};


export const totalIssuedBooks = async (req, res) => {
    try {
        const count = await Issue.countDocuments({ status: "issued" });
        res.status(200).json({
            success: true,
            count
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
};


export const returnBook = async (req, res) => {
    try {

        const { issueId } = req.body;

        const issue = await Issue.findById(issueId).populate("book");

        if (!issue) {
            return res.status(404).json({
                message: "Issue record not found"
            });
        }

        if (issue.status === "returned") {
            return res.status(400).json({
                message: "Book already returned"
            });
        }

        issue.returnDate = new Date();
        issue.status = "returned";

        await issue.save();

        const book = await Book.findById(issue.book._id);
        book.availableCopies += 1;
        await book.save();

        let fine = 0;

        if (issue.returnDate > issue.dueDate) {

            const diff = issue.returnDate - issue.dueDate;

            const lateDays = Math.ceil(
                diff / (1000 * 60 * 60 * 24)
            );

            fine = lateDays * 10;

            await FinePayment.create({
                user: issue.user,
                issue: issue._id,
                amount: fine
            });

        }

        res.status(200).json({
            success: true,
            message: "Book returned successfully",
            fine
        });

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};