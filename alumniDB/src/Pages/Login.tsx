import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { authService } from "../services/auth";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userType, setUserType] = useState<'student' | 'alumni'>('student');
  const [rollNumber, setRollNumber] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Detect query param to set default login type
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const role = params.get("role");
    if (role === "admin") {
      setUserType('alumni');
    }
  }, [location.search]);

  // ✅ Supabase authentication
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { user, error } = await authService.signIn(rollNumber, password);

      if (error) {
        setError("Invalid credentials. Please check your roll number and password.");
        return;
      }

      if (user) {
        // Store user type in session
        if (rememberMe) {
          localStorage.setItem('userType', userType);
          localStorage.setItem('userData', JSON.stringify(user));
        }
        
        // Navigate based on user type
        if (userType === 'student') {
          navigate("/student-dashboard");
        } else {
          navigate("/alumni-dashboard");
        }
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-700 text-lg mb-2">Hello!</h1>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Good Morning
          </h2>
          <p className="text-purple-800 text-sm">Login Your Account</p>
        </div>

        {/* User Type Toggle */}
        <div className="mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setUserType('student')}
              className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all duration-200 ${
                userType === 'student'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              STUDENT
            </button>
            <button
              onClick={() => setUserType('alumni')}
              className={`flex-1 py-2 px-4 rounded-md font-semibold text-sm transition-all duration-200 ${
                userType === 'alumni'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ALUMNI
            </button>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Roll Number Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Roll Number
            </label>
            <div className="relative">
              <input
                type="text"
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter your roll number"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-sm">Remember</span>
            </label>
            <button
              type="button"
              className="text-gray-700 text-sm hover:text-blue-600 transition-colors"
            >
              Forgot Password ?
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'SUBMITTING...' : 'SUBMIT'}
          </button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <span className="text-gray-700 text-sm">Create Account? </span>
          <Link
            to="/signup"
            className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Sign up
          </Link>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-gray-500 text-sm hover:text-gray-700 transition-colors"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
