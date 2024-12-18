import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FiMail, FiLock, FiUser, FiGithub } from 'react-icons/fi';
import Image from 'next/image';
import { FaGoogle } from 'react-icons/fa';
import { signIn,useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
    const {data: session} = useSession();
    if(session){
router.push('/');
    }

  const handleSignInWithProvider = async (provider) => {
    setError('');
    setLoading(true);

    try {
      const result = await signIn(provider, { redirect: false });

      if (result?.error) {
        setError(result.error);
      }
    } catch (err) {
      setError('An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/auth/signin');
      } else {
        setError(data.message || 'An error occurred during registration');
      }
    } catch (err) {
      setError('An error occurred during registration');
      toast.error('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-md p-6">
        <div className="text-center mb-8">
          <div className="mb-6 flex justify-center">
            <Image src="/logo.png" alt="Logo" width={64} height={64} />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create an Account
          </h1>
          <p className="text-gray-600">Join our community of book lovers</p>
        </div>

        <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-xl ring-1 ring-gray-200">
          {error && (
            <div className="mb-6 p-4 text-sm text-red-700 bg-red-100 rounded-lg border border-red-200 flex items-center">
              <svg className="w-5 h-5 mr-2 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <div className="mt-1 relative">
                <FiUser size={15} className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your name"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <FiMail size={15} className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <FiLock size={15} className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => handleSignInWithProvider('google')}
              className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <FaGoogle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Google</span>
            </button>
            <button
              type="button"
              onClick={() => handleSignInWithProvider('github')}
              className="flex items-center justify-center py-2.5 px-4 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors duration-200"
            >
              <FiGithub className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </button>
          </div>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/auth/signin">
            Sign in
            </Link>
          </p>
        </div>
      </div> 
    </div>
  );
}