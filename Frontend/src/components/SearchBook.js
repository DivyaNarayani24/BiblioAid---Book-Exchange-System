import React, { useState, useEffect } from 'react';
import { getBooks, searchBooks, addRequest } from '../services/api';

function SearchBook({ currentUser }) {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    fetchAllBooks();
  }, []);

  const fetchAllBooks = async () => {
    try {
      const data = await getBooks();
      // Filter out current user's books
      const filteredBooks = data.filter(book => book.user.id !== currentUser.id);
      setBooks(filteredBooks);
      setError('');
    } catch (err) {
      setError('Failed to load books');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setError('');
    
    try {
      if (searchQuery.trim() === '') {
        fetchAllBooks();
      } else {
        const data = await searchBooks(searchQuery);
        // Filter out current user's books
        const filteredBooks = data.filter(book => book.user.id !== currentUser.id);
        setBooks(filteredBooks);
      }
    } catch (err) {
      setError('Search failed. Please try again.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleRequest = async (book) => {
    try {
      const request = {
        book: { id: book.id },
        user: { id: currentUser.id },
        status: 'pending'
      };
      
      await addRequest(request);
      setRequestMessage(`Request sent for "${book.title}"!`);
      
      setTimeout(() => {
        setRequestMessage('');
      }, 3000);
    } catch (err) {
      setError('Failed to send request. Please try again.');
    }
  };

  return (
    <div>
      <h2>🔍 Search Books</h2>
      
      <div className="search-container">
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="text"
            placeholder="Search by title, author..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="btn-search" disabled={isSearching}>
            {isSearching ? 'Searching...' : 'Search'}
          </button>
        </form>
      </div>

      {error && <div className="error-message">{error}</div>}
      {requestMessage && <div className="success-message">{requestMessage}</div>}

      {books.length === 0 ? (
        <p style={{textAlign: 'center', color: '#666', marginTop: '40px'}}>
          No books available at the moment
        </p>
      ) : (
        <div className="books-grid">
          {books.map(book => (
            <div key={book.id} className="book-card">
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Owner:</strong> {book.user.name}</p>
              <p><strong>Contact:</strong> {book.user.phoneNumber}</p>
              {book.type === 'sell' && book.price && (
                <p><strong>Price:</strong> ₹{book.price}</p>
              )}
              <span className={`book-type ${book.type}`}>
                {book.type === 'donate' ? '❤️ Free' : '💰 For Sale'}
              </span>
              <button 
                className="btn-request"
                onClick={() => handleRequest(book)}
              >
                Request Book
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBook;