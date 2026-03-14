import express from 'express';
import { isAdmin, verifyJWT } from '../middleware/verifyJWT.js';
import { addBook, deleteBook, getBookById, getBooks } from '../controller/book.controller.js';

const bookRouter  = express.Router();

bookRouter.post('/addbook',  verifyJWT,isAdmin, addBook)
bookRouter.post('/getbooks', verifyJWT, getBooks)
bookRouter.get('/getbook/:id', verifyJWT, getBookById)
bookRouter.delete('/deletebook/:id', verifyJWT, isAdmin, deleteBook)


export default bookRouter;