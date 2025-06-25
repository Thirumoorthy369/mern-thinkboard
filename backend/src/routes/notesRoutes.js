import express from 'express';
import { createNote, deleteNote, getAllNotes, getNoteById,updateNote } from '../controllers/notesController.js';

const router = express.Router();

router.get("/",getAllNotes);
router.get("/:id",getNoteById);
router.post("/",createNote );
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;

//This is the notes router
//This router handles all the requests related to notes
//This is a middleware
//This will handle the api/notes routing in the server
