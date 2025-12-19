import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/auth.api';

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await register({ name, email, password });
      navigate('/login');
    } catch (err: any) {
      if (err.formErrors || err.fieldErrors) {
        setError('Please fix the form errors above');
      } else {
        setError(err.error || err.message || 'Registration failed');
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input 
          className="w-full p-3 border rounded mb-4" 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          className="w-full p-3 border rounded mb-4" 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
        />
        <input 
          className="w-full p-3 border rounded mb-6" 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          minLength={6}
          required 
        />
        <button 
          className="w-full p-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition" 
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
