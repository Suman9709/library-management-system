import express from 'express';
import { isAdmin, verifyJWT } from '../middleware/verifyJWT.js';
import { getUserIssuedBooks, issueBook, returnBook } from '../controller/bookIssue.controller.js';


const issueRouter = express.Router();

issueRouter.post('/issuebook', verifyJWT, isAdmin, issueBook)
issueRouter.post('/returnbook', verifyJWT, isAdmin, returnBook)
issueRouter.get('/getuserissuedbooks', verifyJWT, getUserIssuedBooks)


export default issueRouter;