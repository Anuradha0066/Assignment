import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth.api';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  try {
    const { user, token } = await login({ email, password });  // 🔥 token receive!
    
    // Backend cookie already set + frontend state
    setUser(user);
    navigate('/dashboard');
  } catch (err: any) {
    setError(err.error || 'Login failed');
  }
};


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input className="w-full p-3 border rounded mb-4" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="w-full p-3 text-gray-600 border rounded mb-6" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition" type="submit">Login</button>
        <p className="mt-4 text-sm text-gray-600 text-center">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register
        </Link>
      </p>
      </form>
    </div>
  );
};

export default Login;
