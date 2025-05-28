import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

const GoogleLogin:React.FC = () => {

    const navigate = useNavigate();
    // const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();



  const handleLogin = (data) => {
    console.log('handleLogin:', data);
    dispatch(login({ id: '1', name: 'John Doe', email: 'john@example.com' }));
    navigate('/');
  };

  useEffect(() => {
    /* global google */
    window.google.accounts.id.initialize({
      client_id: '424480582826-ficfr7p22ccbpo7k46ac49b5eu81039q.apps.googleusercontent.com',
      callback: handleCallback,
    });

    window.google.accounts.id.renderButton(
      document.getElementById('google-signin'),
      { theme: 'outline', size: 'large' }
    );
  }, []);

  const handleCallback = async (response) => {
    const { credential } = response; // JWT token from Google
    const res = await fetch('http://localhost:5000/auth/google-login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: credential }),
    });

    const data = await res.json();
        handleLogin(data);

    // 
    console.log('User logged in:', data);
  };

  return <div id="google-signin"></div>;
};

export default GoogleLogin;
