import React, { useState, useEffect } from 'react';
import { getBooks, addRequest } from '../services/api';

function RequestBookForm({ currentUser, setCurrentPage }) {
  const [books, setBooks] = useState([]);
  const [selectedBookId, setSelectedBookId] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      // Filter out current user's books
      const availableBooks = data.filter(book => book.user.id !== currentUser.id);
      setBooks(availableBooks);
    } catch (err) {
      setError('Failed to load books');
    }
  };

  const handleBookSelect = (e) => {
    const bookId = e.target.value;
    setSelectedBookId(bookId);
    
    if (bookId) {
      const book = books.find(b => b.id === parseInt(bookId));
      setSelectedBook(book);
    } else {
      setSelectedBook(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!selectedBookId) {
      setError('Please select a book');
      return;
    }

    try {
      const request = {
        book: { id: parseInt(selectedBookId) },
        user: { id: currentUser.id },
        status: 'pending'
      };

      await addRequest(request);
      setMessage('Request sent successfully!');
      
      setTimeout(() => {
        setCurrentPage('my-requests');
      }, 2000);
    } catch (err) {
      setError('Failed to send request. Please try again.');
    }
  };

  return (
    <div>
      <h2>📤 Request a Book</h2>
      <p>Select a book you'd like to request</p>

      {error && <div className="error-message">{error}</div>}
      {message && <div className="success-message">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Select Book *</label>
          <select 
            value={selectedBookId} 
            onChange={handleBookSelect}
            required
          >
            <option value="">-- Choose a book --</option>
            {books.map(book => (
              <option key={book.id} value={book.id}>
                {book.title} by {book.author} ({book.type === 'donate' ? 'Free' : `₹${book.price}`})
              </option>
            ))}
          </select>
        </div>

        {selectedBook && (
          <div style={{
            background: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '10px', 
            marginTop: '20px'
          }}>
            <h3 style={{marginBottom: '10px', color: '#333'}}>Book Details</h3>
            <p><strong>Title:</strong> {selectedBook.title}</p>
            <p><strong>Author:</strong> {selectedBook.author}</p>
            <p><strong>Owner:</strong> {selectedBook.user.name}</p>
            <p><strong>Contact:</strong> {selectedBook.user.phoneNumber}</p>
            <p><strong>Type:</strong> {selectedBook.type === 'donate' ? '❤️ Free' : `💰 ₹${selectedBook.price}`}</p>
          </div>
        )}

        <button type="submit" className="btn btn-primary" style={{marginTop: '20px'}}>
          Send Request
        </button>
        <button 
          type="button" 
          className="btn btn-secondary"
          onClick={() => setCurrentPage('search')}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default RequestBookForm;