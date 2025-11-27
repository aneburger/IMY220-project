/* Ane' Burger 24565068, 33 */

import express from 'express';
import path from "path";
import { getBooks, getUsers, getUser, searchTitle, addBook, deleteBook, updateBook, checkOutBook, checkInBook, checkedOutList } from './library.js';
import { ObjectId } from 'mongodb';

const app = express();
const port = 3000;

app.use(express.static(path.join("frontend/public")));
app.use(express.json());

app.get("/api/books", async (req, res) => {
   const books = await getBooks();
   res.json(books);
});

app.get("/api/users", async (req, res) => {
   const users = await getUsers();
   res.json(users);
});

app.get("/api/book", async (req, res) => {
   const { title } = req.query;
   if(!title) {
      return res.status(400).json({error: "Title required."});
   }
   try {
      const book = await searchTitle(title);
      res.json(book);
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.get("/api/books/checkedout", async (req, res) => {
  const books = await checkedOutList();
   res.json(books);
});

app.post("/api/login", async (req, res) => {
   const { username, password } = req.body;
   try {
      const user = await getUser(username);
      if(!user) {
         return res.status(401).json({ success: false, message: "User not found" });
      }

      if(user.password !== password){
         return res.status(401).json({ success: false, message: "Invalid password" });
      }

      const userRet = { userId: user.userId, username: user.username, role: user.role };

      res.json({ success: true, message: "Login successful", user: userRet });
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.post("/api/book/:id/checkout", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const result = await checkOutBook(id, userId);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/api/book/:id/checkin", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    const result = await checkInBook(id, userId);
    res.json({ success: true, result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

app.post("/api/bookA", async (req, res) => {
   const { title, author, year, genre, checkedOutBy } = req.body;
   try {
      const result = await addBook(title, author, year, genre, checkedOutBy); 
      res.json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.delete("/api/book/:id", async (req, res) => {
   const { id } = req.params;
   try {
      const result = await deleteBook(id);
      res.json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.put("/api/book/:id", async (req, res) => {
   const { id } = req.params;
   const { title, author, genre } = req.body;
   if (!ObjectId.isValid(id)) {
     return res.status(400).json({ success: false, message: "Invalid book id" });
   }
   try {
      await updateBook(id, { title, author, genre });
      const updatedBook = await bookCollection.findOne({ _id: new ObjectId(id) });
      res.json(updatedBook);
   } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
});

app.listen(port, async () => {
   console.log(`Listening on http://localhost:${port}`);
});
