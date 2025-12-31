import React, { useState } from 'react';
import { addBook } from '../services/api';

function AddBookForm({ type, currentUser, setCurrentPage }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: type === 'sell' ? '' : 0
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validation
    if (type === 'sell' && (!formData.price || formData.price <= 0)) {
      setError('Please enter a valid price');
      return;
    }

    try {
      const bookData = {
        title: formData.title,
        author: formData.author,
        type: type,
        price: type === 'sell' ? parseFloat(formData.price) : 0,
        user: { id: currentUser.id }
      };

      await addBook(bookData);
      setSuccess(`Book ${type === 'donate' ? 'donated' : 'listed for sale'} successfully!`);
      
      setTimeout(() => {
        setFormData({
          title: '',
          author: '',
          price: type === 'sell' ? '' : 0
        });
        setSuccess('');
        setCurrentPage('search');
      }, 2000);
    } catch (err) {
      setError('Failed to add book. Please try again.');
    }
  };

  return (
    <div>
      <h2>{type === 'donate' ? '❤️ Donate a Book' : '💰 Sell a Book'}</h2>
      <p>Share your books with the community</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Book Title *</label>
            <input
              type="text"
              placeholder="Enter book title"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Author *</label>
            <input
              type="text"
              placeholder="Enter author name"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
            />
          </div>

          {type === 'sell' && (
            <div className="form-group">
              <label>Price (₹) *</label>
              <input
                type="number"
                placeholder="Enter price"
                value={formData.price}
                onChange={(e) => setFormData({...formData, price: e.target.value})}
                min="1"
                required
              />
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          {type === 'donate' ? 'Donate Book' : 'List for Sale'}
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

export default AddBookForm;