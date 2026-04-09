import React, { useState, useEffect } from 'react';
import { getBooksByUser, getRequests } from '../services/api';

function MyBooks({ currentUser, setCurrentPage }) {
  const [myBooks, setMyBooks] = useState([]);
  const [requestsForMyBooks, setRequestsForMyBooks] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchMyBooks();
    fetchRequestsForMyBooks();
  }, []);

  const fetchMyBooks = async () => {
    try {
      const data = await getBooksByUser(currentUser.id);
      setMyBooks(data);
    } catch (err) {
      setError('Failed to load your books');
    }
  };

  const fetchRequestsForMyBooks = async () => {
    try {
      const res = await fetch(`http://localhost:2222/api/requests/owner/${currentUser.id}`);
      const data = await res.json();
      setRequestsForMyBooks(data);
    } catch (err) {
      setError('Failed to load requests');
    }
  };

  const handleStatusUpdate = async (requestId, status) => {
    try {
      await fetch(`http://localhost:2222/api/requests/${requestId}/status?status=${status}`, {
        method: 'PUT'
      });
      setSuccessMessage(`Request ${status} successfully!`);
      fetchRequestsForMyBooks();
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('Failed to update request status');
    }
  };

  return (
    <div>
      <h2>📚 My Listed Books</h2>
      <p>Manage your books and incoming requests</p>

      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {myBooks.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <p>You haven't listed any books yet</p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '20px' }}
            onClick={() => setCurrentPage('donate')}
          >
            List a Book
          </button>
        </div>
      ) : (
        myBooks.map(book => {
          const bookRequests = requestsForMyBooks.filter(r => r.book.id === book.id);

          return (
            <div key={book.id} className="book-card" style={{ marginBottom: '30px' }}>
              <h3>{book.title}</h3>
              <p><strong>Author:</strong> {book.author}</p>
              <p><strong>Type:</strong> {book.type === 'donate' ? '❤️ Free' : `💰 ₹${book.price}`}</p>

              <h4 style={{ marginTop: '15px', color: '#555' }}>
                Requests ({bookRequests.length})
              </h4>

              {bookRequests.length === 0 ? (
                <p style={{ color: '#999', fontSize: '14px' }}>No requests yet</p>
              ) : (
                bookRequests.map(request => (
                  <div key={request.id} style={{
                    background: '#f8f9fa',
                    padding: '15px',
                    borderRadius: '10px',
                    marginTop: '10px'
                  }}>
                    <p><strong>Requested by:</strong> {request.user.name}</p>
                    <p><strong>Email:</strong> {request.user.email}</p>
                    <p><strong>Phone:</strong> {request.user.phoneNumber}</p>
                    <span className={`request-status ${request.status}`}>
                      {request.status.toUpperCase()}
                    </span>

                    {request.status === 'pending' && (
                      <div style={{ marginTop: '10px', display: 'flex', gap: '10px' }}>
                        <button
                          className="btn btn-primary"
                          onClick={() => handleStatusUpdate(request.id, 'approved')}
                        >
                          ✅ Approve
                        </button>
                        <button
                          className="btn btn-secondary"
                          onClick={() => handleStatusUpdate(request.id, 'rejected')}
                        >
                          ❌ Reject
                        </button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyBooks;