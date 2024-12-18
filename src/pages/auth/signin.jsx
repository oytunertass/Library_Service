import { signIn,useSession } from "next-auth/react";
import { useState } from "react";
import { FiMail, FiLock, FiGithub } from "react-icons/fi";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import {toast} from 'react-hot-toast';

export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const {data: session} = useSession();

  if(session){
    window.location.href = "/";
  }

  const handleSignInWithProvider = async (provider) => {
    setError("");
    setLoading(true);

    try {
      const result = await signIn(provider, { redirect: false });

      if (result?.error) {
        setError(result.error);
      }else{
        toast.success("Sign in successful");
        window.location.href = "/";
      }

    } catch (err) {
      setError("An error occurred during sign in");
      toast.error("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const email = e.target.email.value;
      const password = e.target.password.value;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error);
      }else{
        window.location.href = "/";
      }

    } catch (err) {
      setError("An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
        <div className="mb-6 flex justify-center">
        <Link href="/">
              <Image
                src="/logo.png"
                alt="Logo"
                width={64}
                height={64}
                priority
              />
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="mt-1 relative">
                <FiMail className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <FiLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleSignInWithProvider("google")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FaGoogle className="mr-2" /> Google
              </button>
              <button
                onClick={() => handleSignInWithProvider("github")}
                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                <FiGithub className="mr-2" /> GitHub
              </button>
            </div>
            <p className="text-center text-sm text-gray-600 mt-6">
              Don t have an account?{" "}
              <Link href="/auth/register">
                  Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}