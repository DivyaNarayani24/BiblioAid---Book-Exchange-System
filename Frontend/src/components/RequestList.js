import React, { useState, useEffect } from 'react';
import { getRequestsByUser } from '../services/api';

function RequestList({ currentUser, setCurrentPage }) {
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState('all');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const data = await getRequestsByUser(currentUser.id);
      setRequests(data);
      setError('');
    } catch (err) {
      setError('Failed to load requests');
    }
  };

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true;
    return request.status === filter;
  });

  return (
    <div>
      <h2>📋 My Book Requests</h2>
      <p>Track your book requests</p>

      {error && <div className="error-message">{error}</div>}

      <div className="filter-buttons">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All ({requests.length})
        </button>
        <button 
          className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending ({requests.filter(r => r.status === 'pending').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'approved' ? 'active' : ''}`}
          onClick={() => setFilter('approved')}
        >
          Approved ({requests.filter(r => r.status === 'approved').length})
        </button>
        <button 
          className={`filter-btn ${filter === 'rejected' ? 'active' : ''}`}
          onClick={() => setFilter('rejected')}
        >
          Rejected ({requests.filter(r => r.status === 'rejected').length})
        </button>
      </div>

      {filteredRequests.length === 0 ? (
        <div style={{textAlign: 'center', padding: '40px', color: '#666'}}>
          <p>No {filter !== 'all' ? filter : ''} requests found</p>
          <button 
            className="btn btn-primary" 
            style={{marginTop: '20px'}}
            onClick={() => setCurrentPage('search')}
          >
            Browse Books
          </button>
        </div>
      ) : (
        <div>
          {filteredRequests.map(request => (
            <div key={request.id} className="request-card">
              <h3>{request.book.title}</h3>
              <p><strong>Author:</strong> {request.book.author}</p>
              <p><strong>Owner:</strong> {request.book.user.name}</p>
              <p><strong>Contact:</strong> {request.book.user.phoneNumber}</p>
              <p><strong>Type:</strong> {request.book.type === 'donate' ? '❤️ Free' : `💰 ₹${request.book.price}`}</p>
              <span className={`request-status ${request.status}`}>
                {request.status.toUpperCase()}
              </span>
              
              {request.status === 'approved' && (
                <div style={{
                  marginTop: '15px', 
                  padding: '12px', 
                  background: '#d4edda', 
                  borderRadius: '8px',
                  color: '#155724'
                }}>
                  ✅ Request approved! Contact the owner to arrange pickup/delivery.
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RequestList;