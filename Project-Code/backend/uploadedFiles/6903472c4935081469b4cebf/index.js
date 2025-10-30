const { useState, useEffect, useRef } = React;

// Ane' Burger 24565068

const initialBooks = [];

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setError] = useState("");

  const handleLogin = () => {
    fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ username, password }),
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        setError("");
        onLogin(data.user);
      } else {
        setError(data.message);
      }
    })
    .catch(err => {
      console.error(err);

    })
  }

  return (
    <div id="loginDiv">
      <h1>Login</h1>
      <input type="text"
             id="username"
             placeholder="Enter Username..."
             value={username}
             onChange={(e) => setUsername(e.target.value)}
      />

      <input type="password"
             id="password"
             placeholder="Enter Password..."
             value={password}
             onChange={(e) => setPassword(e.target.value)}
      />

      <button id="loginB" onClick={handleLogin}>Login</button>
      {errorMsg && <p className="errorMessage">{errorMsg}</p>}
    </div>
  );
}


const CheckedOutBooks = ({ books, users }) => {
  const getUsername = (userId) => {
    const user = users.find(u => u.userId === userId);
    return user ? user.username : userId;
  };
  
  return (
    <div id="checkedOutCard">
      <h2>Checked Out Books</h2>
      {books.length === 0 ? (
        <p>No books are currently checked out.</p>
      ) : (
        books.map((book) => (
          <div key={book._id}>
            <p className="checkTitle">{book.title}</p>
            <p>Checked out by: {getUsername(book.checkedOutBy)}</p>
          </div>
        ))
      )}
    </div>
  );
}


const Book = ({book, onDelete, onChangeStatus, onSave, user, onCheckout, onCheckin, users}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [genre, setGenre] = useState(book.genre);

    const handleSave = () => {
        onSave(book.id, { title, author, genre });
        setIsEditing(false);
    };

    const getUsername = (userId) => {
      const user = users.find(u => u.userId === userId);
      return user ? user.username : userId;
    };

    return ( 
        <div id="bookCard">
      {!isEditing ? (
        <>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.genre}</p>
          <p>Status: {book.status}</p>

          {!book.checkedOutBy ? (
            <button onClick={() => onCheckout(book._id)}>Check Out</button>
          ) : book.checkedOutBy === user.userId ? (
            <button onClick={() => onCheckin(book._id)}>Check In</button>
          ) : (
            <p>Checked out by {getUsername(book.checkedOutBy)}</p>
          )}

          {user.role === "admin" && (
            <>
              <button onClick={onChangeStatus}>Change Status</button>
              <button onClick={() => setIsEditing(true)}>Edit</button>
              <button onClick={onDelete}>Delete</button>
            </>
          )}
        </>
        ):(
        <>
          <input id="titleB" value={title} onChange={(e) => setTitle(e.target.value)} />
          <input id="authorB" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <input id="genreB" value={genre} onChange={(e) => setGenre(e.target.value)} />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      )}
    </div>
    );
}


const BookList = ({ books, onSave, onDelete, onChangeStatus, user, onCheckout, onCheckin, users }) => {
  return (
    <div>
      {books.map((book) =>
        !book.title && !book.author && !book.genre ? (
          <NewBook
            key={book.id}
            status={book.status}
            onSave={(updatedBook) => onSave(book.id, updatedBook)}
            onDelete={() => onDelete(book.id)}
            onChangeStatus={() => onChangeStatus(book.id)}
            user={user}
          />): 
          (
          <Book
            key={book.id}
            book={book}
            onSave={(updatedBook) => onSave(book.id, updatedBook)}
            onDelete={() => onDelete(book.id)}
            onChangeStatus={() => onChangeStatus(book.id)}
            user={user}
            onCheckout={onCheckout}
            onCheckin={onCheckin}
            users={users}
          />
        )
      )}
    </div>
  );
};


const SearchBook = ({searchTitle, onSearchChange, onSearch}) => {

    const handleSearch = (title) => {
      if (!title) {
         fetch("http://localhost:3000/api/books")
        .then(res => res.json())
        .then(data => {
          onSearch(data);
        })
        .catch(err => console.error(err));
        return;
      }

      fetch(`http://localhost:3000/api/book?title=${encodeURIComponent(title)}`)
        .then(res => res.json())
        .then(data => {
          onSearch(data);
        })
        .catch(err => {
          console.error(err);
        })
    }

    return (
        <div id="searchDiv">
            <label htmlFor="search">Search</label>
            <input
                id="search"
                type="text"
                placeholder="Search something..."
                value={searchTitle}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            <button id="searchB" onClick={() => handleSearch(searchTitle)}>Search</button>                     
        </div>
    );
}


const NewBook = ({ onSave, onDelete, onChangeStatus, status }) => {
  const [showEditComponent, setShowEditComponent] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  const handleSave = () => {
    onSave({ title, author, genre, status });
    setShowEditComponent(false);
  };

  return (
    <div id="newBook">
      {!showEditComponent ? (
        <>
          <p>Status: {status}</p>
          <button onClick={onChangeStatus}>Change Status</button>
          <button onClick={() => setShowEditComponent(true)}>Edit</button>
          <button onClick={onDelete}>Delete</button>
        </>):
        (
        <>
          <input
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            id="author"
            placeholder="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <input
            id="genre"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
          <button onClick={handleSave}>Done</button>
          <button onClick={() => setShowEditComponent(false)}>Cancel</button>
        </>
      )}
    </div>
  );
};


const App = () => {
  const bookId = useRef(initialBooks.length + 1); 
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/books")
      .then(res => res.json())
      .then(data => {
        console.log("Books from API:", data);
        setBooks(data.map((b, i) => ({ ...b, id: i + 1, _id: b._id, status: "Want to Read" })));
        bookId.current = data.length + 1;
      })
      .catch(err => console.error(err));

      fetch("http://localhost:3000/api/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));
  }, []);

  if (!user) {
    return <Login onLogin={setUser} />; 
  }

  const sortedBooks = [...books].sort((a, b) => a.title.localeCompare(b.title));

  const handleAddEmptyBook = () => {
    setBooks(prevBooks => [
      { id: bookId.current++, title: "", author: "", genre: "", status: "Want to Read" },
      ...prevBooks
    ]);
  };

  const handleSaveBook = (id, updatedBook) => {
    const bookToUpdate = books.find(b => b.id === id);
      if (!bookToUpdate._id) {
        fetch("http://localhost:3000/api/bookA", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        })
        .then(res => res.json())
        .then(() => {
          return fetch("http://localhost:3000/api/books"); 
        })
        .then(res => res.json())
        .then(data => {
          setBooks(data.map((b, i) => ({ ...b, id: i + 1, _id: b._id, status: "Want to Read" })));
        })
        .catch(err => console.error(err));
      } else {
        fetch(`http://localhost:3000/api/book/${bookToUpdate._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        })
        .then(res => res.json())
        .then(() => fetch("http://localhost:3000/api/books"))
        .then(res => res.json())
        .then(data => {
          setBooks(data.map((b, i) => ({ ...b, id: i + 1, _id: b._id, status: "Want to Read" })));
        })
        .catch(err => console.error(err));
      }
  };

  const handleDeleteBook = (id) => {
      const bookToDelete = books.find(b => b.id === id);
      if (!bookToDelete || !bookToDelete._id) {
        console.error("Book not found or missing _id");
        return;
      }

      fetch(`http://localhost:3000/api/book/${bookToDelete._id}`, {
        method: "DELETE"
      })
      .then(res => res.json())
      .then(() => {
        setBooks(prevBooks => prevBooks.filter(b => b.id !== id));
      })
      .catch(err => console.error(err));
  };

  const handleChangeStatus = (id) => {
    const statuses = ["Want to Read", "Busy Reading", "Read"];
    setBooks(prevBooks =>
      prevBooks.map(book =>
        book.id === id ? { ...book, status: statuses[(statuses.indexOf(book.status) + 1) % statuses.length] } : book)
    );
  };

  const handleCheckoutBook = (bookId) => {
    fetch(`http://localhost:3000/api/book/${bookId}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.userId }) 
    })
      .then(res => res.json().then(data => ({ status: res.status, data })))
      .then(({ status, data }) => {
        if (status !== 200 || !data.success) {
          window.alert(data.message || "Cannot check out more than 3 books.");
          return;
        }
        return fetch("http://localhost:3000/api/books")
          .then(res => res.json())
          .then(data => {
            setBooks(data.map((b, i) => ({
              ...b,
              id: i + 1,
              _id: b._id,
              status: "Want to Read"
            })));
          });
      })
      .catch(err => console.error(err));
  };

  const handleCheckinBook = (bookId) => {
    fetch(`http://localhost:3000/api/book/${bookId}/checkin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.userId })
    })
      .then(res => res.json())
      .then(() => fetch("http://localhost:3000/api/books"))
      .then(res => res.json())
      .then(data => {
        setBooks(data.map((b, i) => ({
          ...b,
          id: i + 1,
          _id: b._id,
          status: "Want to Read"
        })));
      })
      .catch(err => console.error(err));
  };

  return (
    <div id="mainDiv">
      <h1>{user.username}'s Library</h1>
      <button onClick={() => setUser(null)}>Logout</button>
      <SearchBook searchTitle={searchTerm} onSearchChange={setSearchTerm} onSearch={(filteredBooks) => setBooks(filteredBooks.map((b, i) => ({ ...b, id: i + 1, _id: b._id, status: "Want to Read" })))}/>
      
      <CheckedOutBooks books={books.filter(b => b.checkedOutBy)} users={users}/>

      {user.role === "admin" && (
        <div id="addB">
          <button onClick={handleAddEmptyBook} id="addBook">Add Book</button>
        </div>
      )}

      <BookList
        books={sortedBooks}
        onSave={handleSaveBook}
        onDelete={handleDeleteBook}
        onChangeStatus={handleChangeStatus} 
        onCheckout={handleCheckoutBook}  
        onCheckin={handleCheckinBook}
        user={user}
        users={users} />
    </div>
  );
};


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
