import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBook from './components/SearchBook';
import AddBookForm from './components/AddBookForm';
import RequestBookForm from './components/RequestBookForm';
import RequestList from './components/RequestList';
import AddUserForm from './components/AddUserForm';
import { loginUser } from './services/api';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setCurrentPage('search');
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const user = await loginUser(loginData.email, loginData.password);
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
      setCurrentPage('search');
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCurrentPage('login');
    setLoginData({ email: '', password: '' });
  };

  const handleSignupSuccess = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setCurrentPage('search');
  };

  if (!currentUser) {
    return (
      <div className="app">
        <div className="login-container">
          <div className="login-box">
            {!isSignup ? (
              <>
                <h2>📚 BiblioAid Login</h2>
                <p>Welcome back! Login to continue</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleLogin}>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={loginData.email}
                      onChange={(e) => setLoginData({...loginData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({...loginData, password: e.target.value})}
                      required
                    />
                  </div>
                  
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
                
                <div className="switch-form">
                  Don't have an account?
                  <button onClick={() => setIsSignup(true)}>Sign Up</button>
                </div>
              </>
            ) : (
              <AddUserForm 
                setCurrentPage={setCurrentPage} 
                onSignupSuccess={handleSignupSuccess}
                onBackToLogin={() => setIsSignup(false)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="main-container">
        <div className="header">
          <h1>📚 BiblioAid - Book Exchange</h1>
          <div className="user-info">
            <span className="user-name">Hello, {currentUser.name}!</span>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>

        <div className="nav-buttons">
          <button 
            className={`nav-btn ${currentPage === 'search' ? 'active' : ''}`}
            onClick={() => setCurrentPage('search')}
          >
            🔍 Search Books
          </button>
          <button 
            className={`nav-btn ${currentPage === 'donate' ? 'active' : ''}`}
            onClick={() => setCurrentPage('donate')}
          >
            ❤️ Donate Book
          </button>
          <button 
            className={`nav-btn ${currentPage === 'sell' ? 'active' : ''}`}
            onClick={() => setCurrentPage('sell')}
          >
            💰 Sell Book
          </button>
          <button 
            className={`nav-btn ${currentPage === 'request' ? 'active' : ''}`}
            onClick={() => setCurrentPage('request')}
          >
            📤 Request Book
          </button>
          <button 
            className={`nav-btn ${currentPage === 'my-requests' ? 'active' : ''}`}
            onClick={() => setCurrentPage('my-requests')}
          >
            📋 My Requests
          </button>
        </div>

        <div className="content-card">
          {currentPage === 'search' && <SearchBook currentUser={currentUser} />}
          {currentPage === 'donate' && <AddBookForm type="donate" currentUser={currentUser} setCurrentPage={setCurrentPage} />}
          {currentPage === 'sell' && <AddBookForm type="sell" currentUser={currentUser} setCurrentPage={setCurrentPage} />}
          {currentPage === 'request' && <RequestBookForm currentUser={currentUser} setCurrentPage={setCurrentPage} />}
          {currentPage === 'my-requests' && <RequestList currentUser={currentUser} setCurrentPage={setCurrentPage} />}
        </div>
      </div>
    </div>
  );
}

export default App;