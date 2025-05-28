import { useEffect } from 'react';

const GoogleLogin = () => {
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
    console.log('User logged in:', data);
  };

  return <div id="google-signin"></div>;
};

export default GoogleLogin;
