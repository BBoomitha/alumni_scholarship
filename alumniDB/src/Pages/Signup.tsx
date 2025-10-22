import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { authService } from "../services/auth";

const Signup: React.FC = () => {
  const navigate = useNavigate();

  const [userType, setUserType] = useState<'student' | 'alumni'>('student');
  const [formData, setFormData] = useState({
    fullName: "",
    rollNumber: "",
    email: "",
    phone: "",
    department: "",
    yearOfPassing: "",
    password: "",
    confirmPassword: "",
    company: "",
    role: "",
    linkedin: "",
    whatsapp: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      setError("Full name is required");
      return false;
    }
    if (!formData.rollNumber.trim()) {
      setError("Roll number is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    if (!formData.department.trim()) {
      setError("Department is required");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const userData = {
        fullName: formData.fullName,
        rollNumber: formData.rollNumber,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        yearOfPassing: formData.yearOfPassing,
        company: formData.company,
        role: formData.role,
        linkedin: formData.linkedin,
        whatsapp: formData.whatsapp,
        userType: userType
      };

      const { user, error } = await authService.signUp(formData.email, formData.password, userData);

      if (error) {
        setError(error);
        return;
      }

      if (user) {
        setSuccess("Account created successfully! Please check your email to verify your account.");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Signup failed. Please try again.");
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-gray-700 text-lg mb-2">Welcome!</h1>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Create Account
          </h2>
          <p className="text-purple-800 text-sm">Join our alumni community</p>
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

        {/* Signup Form */}
        <form onSubmit={handleSignup} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Roll Number */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Roll Number *
              </label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter your roll number"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter your phone number"
                required
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Department *
              </label>
              <select
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700 bg-transparent"
                required
              >
                <option value="">Select Department</option>
                <option value="CSE">Computer Science Engineering</option>
                <option value="ECE">Electronics & Communication Engineering</option>
                <option value="IT">Information Technology</option>
                <option value="EEE">Electrical & Electronics Engineering</option>
                <option value="MECH">Mechanical Engineering</option>
                <option value="CIVIL">Civil Engineering</option>
                <option value="CHEM">Chemical Engineering</option>
                <option value="AERO">Aerospace Engineering</option>
              </select>
            </div>

            {/* Year of Passing */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Year of Passing
              </label>
              <input
                type="text"
                name="yearOfPassing"
                value={formData.yearOfPassing}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="e.g., 2023"
              />
            </div>

            {/* Company (for alumni) */}
            {userType === 'alumni' && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                  placeholder="Enter your company name"
                />
              </div>
            )}

            {/* Role (for alumni) */}
            {userType === 'alumni' && (
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Role/Position
                </label>
                <input
                  type="text"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                  className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                  placeholder="Enter your current role"
                />
              </div>
            )}

            {/* LinkedIn */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                LinkedIn Profile
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="https://linkedin.com/in/yourprofile"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                WhatsApp Number
              </label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Enter WhatsApp number"
              />
            </div>
          </div>

          {/* Password Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Create a password"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className="w-full border-0 border-b-2 border-blue-200 focus:border-blue-500 focus:outline-none py-2 text-gray-700"
                placeholder="Confirm your password"
                required
              />
            </div>
          </div>

          {/* Error/Success Messages */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
              {success}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'CREATING ACCOUNT...' : 'CREATE ACCOUNT'}
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <span className="text-gray-700 text-sm">Already have an account? </span>
          <Link
            to="/login"
            className="text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
          >
            Sign in
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

export default Signup;
