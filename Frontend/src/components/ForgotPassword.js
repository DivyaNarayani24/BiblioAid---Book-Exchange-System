import React, { useState } from 'react';

function ForgotPassword({ onBackToLogin }) {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      const res = await fetch('http://localhost:2222/api/users/reset-password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: formData.email,
          newPassword: formData.newPassword
        })
      });

      if (res.ok) {
        setSuccess('Password reset successful! You can now login.');
        setTimeout(() => {
          onBackToLogin();
        }, 2000);
      } else {
        setError('Email not found. Please check and try again.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div>
      <h2>🔑 Reset Password</h2>
      <p>Enter your email and set a new password</p>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Registered Email</label>
          <input
            type="email"
            placeholder="Enter your registered email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            placeholder="Enter new password (min 6 characters)"
            value={formData.newPassword}
            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm New Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onBackToLogin}
        >
          Back to Login
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;