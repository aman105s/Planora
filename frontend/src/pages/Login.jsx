import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useLocation, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { parseJwt } from '../utils/auth';
import './Login.css';
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const roleFromUrl = queryParams.get('role');
  
  const [role, setRole] = useState(roleFromUrl === 'vendor' ? 'Vendor' : 'Couple');
  const [isLogin, setIsLogin] = useState(true);
  const [showForgot, setShowForgot] = useState(false);

  // Auth States
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setIsError(false);
    setIsLoading(true);

    if (showForgot) {
      try {
        const res = await fetch(`${API}/api/auth/check-email`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (!res.ok || !data.exists) {
          setIsError(true);
          setMessage('No account found with this email. Please create an account.');
        } else {
          setMessage(`Success! A password recovery link was dispatched to ${email}`);
          setEmail('');
        }
      } catch (err) {
        setIsError(true);
        setMessage('Network error. Please try again later.');
      } finally {
        setIsLoading(false);
      }
      return;
    }

    try {
      const endpoint = isLogin ? `${API}/api/auth/login` : `${API}/api/auth/register`;
      const parsedRolePayload = role === 'Vendor' ? 'admin' : 'user';
      const bodyPayload = isLogin 
        ? { username, password } 
        : { username, email, password, role: parsedRolePayload };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyPayload)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || 'Verification failed. Please try again.');
      }

      if (isLogin && data.accessToken) {
        localStorage.setItem('accessToken', data.accessToken);
        const decoded = parseJwt(data.accessToken);
        const portalRoute = (decoded.role === 'admin' || decoded.role === 'vendor') ? '/portal/vendor' : '/portal/couple';
        navigate(portalRoute);
      } else if (!isLogin && data.success) {
        // Successful Registration - Immediately fetch token natively
        const loginRes = await fetch(`${API}/api/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        const loginData = await loginRes.json();
        
        if (loginData.accessToken) {
          localStorage.setItem('accessToken', loginData.accessToken);
          // Route immediately to dedicated onboarding screens for profiles instead of homepage
          const onboardingRoute = role === 'Vendor' ? '/vendor-onboarding' : '/onboarding';
          navigate(onboardingRoute);
        } else {
          setIsLogin(true);
          setMessage('Account created! Please sign in.');
          setIsError(false);
          setPassword('');
        }
      }

    } catch (err) {
      setIsError(true);
      setMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setMessage('');
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await fetch(`${API}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: tokenResponse.access_token, role })
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Google Auth Failed');
        }
        
        localStorage.setItem('accessToken', data.accessToken);
        if (data.isNewUser) {
           const onboardingRoute = role === 'Vendor' ? '/vendor-onboarding' : '/onboarding';
           navigate(onboardingRoute);
        } else {
           const decoded = parseJwt(data.accessToken);
           const portalRoute = (decoded.role === 'admin' || decoded.role === 'vendor') ? '/portal/vendor' : '/portal/couple';
           navigate(portalRoute);
        }
      } catch (err) {
        setIsError(true);
        setMessage(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    onError: () => {
      setIsError(true);
      setMessage('Google Sign-In failed or was cancelled.');
    }
  });

  const isGoogleConfigured = !import.meta.env.VITE_GOOGLE_CLIENT_ID?.includes('mock') 
    && !!import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleAuth = async (e) => {
    e.preventDefault();
    if (!isGoogleConfigured) {
      // Development mode: Mock Google Login
      setMessage('');
      setIsError(false);
      setIsLoading(true);
      try {
        const res = await fetch(`${API}/api/auth/google`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken: 'dev_mock_token', role })
        });
        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.message || 'Google Auth Failed');
        }
        
        localStorage.setItem('accessToken', data.accessToken);
        if (data.isNewUser) {
           const onboardingRoute = role === 'Vendor' ? '/vendor-onboarding' : '/onboarding';
           navigate(onboardingRoute);
        } else {
           const decoded = parseJwt(data.accessToken);
           const portalRoute = (decoded.role === 'admin' || decoded.role === 'vendor') ? '/portal/vendor' : '/portal/couple';
           navigate(portalRoute);
        }
      } catch (err) {
        setIsError(true);
        setMessage(err.message);
      } finally {
        setIsLoading(false);
      }
      return;
    }
    loginWithGoogle();
  };

  return (
    <div className="login-page">
      <div className="login-nav">
        <button className="back-btn" onClick={() => navigate('/role-selection')}>
          ← Back to Selection
        </button>
      </div>

      <div className="login-container fade-in-up">
        <div className="login-box">
          <h2 className="login-title">{isLogin ? 'Sign In' : 'Create Account'}</h2>
          <p className="login-subtitle">{role} Portal</p>

          {message && (
            <div className={`p-3 mb-4 text-sm font-medium rounded-sm border ${isError ? 'bg-red-50 text-red-600 border-red-200' : 'bg-green-50 text-green-700 border-green-200'}`}>
              {message}
            </div>
          )}

          <form className="login-form" onSubmit={handleSubmit}>
            
            {showForgot ? (
              // FORGOT PASSWORD FLOW
              <>
                <div className="auth-input-group mb-6">
                  <input type="email" placeholder="Registered Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit" disabled={isLoading} className="btn-primary auth-submit-btn flex items-center justify-center">
                  {isLoading ? 'Processing...' : 'Send Rest Link'}
                </button>
              </>
            ) : (
              // STANDARD AUTH FLOW (Login / Create)
              <>
                <div className="auth-input-group">
                  <input type="text" placeholder="Username" required value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                
                {!isLogin && (
                  <div className="auth-input-group">
                    <input type="email" placeholder="Email Address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                )}
                
                <div className="auth-input-group">
                  <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                {isLogin && (
                  <div className="flex justify-end mb-4 mt-1 w-full px-2">
                    <span 
                      onClick={() => { setShowForgot(true); setMessage(''); setIsError(false); }} 
                      className="text-xs text-gray-500 cursor-pointer hover:text-wedding-gold transition uppercase tracking-wider font-semibold"
                    >
                      Forgot Password?
                    </span>
                  </div>
                )}

                <button type="submit" disabled={isLoading} className="btn-primary auth-submit-btn flex items-center justify-center">
                  {isLoading ? 'Processing...' : (isLogin ? 'Enter Portal' : 'Create Account')}
                </button>
              </>
            )}

          </form>

          {!showForgot && (
            <>
              <div className="auth-divider">
                <span>or</span>
              </div>

              <button 
                className="google-btn" 
                onClick={handleGoogleAuth}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
            </>
          )}

          <div className="auth-toggle">
            {showForgot ? (
                <button onClick={() => { setShowForgot(false); setMessage(''); setIsError(false); }} className="toggle-btn mt-6">
                  Wait, I remember my password! Return to Sign In
                </button>
            ) : (
                <button onClick={() => { setIsLogin(!isLogin); setMessage(''); setIsError(false); }} className="toggle-btn mt-2">
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
