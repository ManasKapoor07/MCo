import React, { useState } from "react";
import { FaApple } from "react-icons/fa";
import image from "../../assets/auth.svg";
import logo from "../../assets/mcBlue.svg";
import { useSignUpMutation } from "@/redux/api/api";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import google from "../../assets/google.svg";
import { Eye, EyeOff } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignUpMutation();

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim())
      newErrors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    )
      newErrors.email = "Invalid email address";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.password2)
      newErrors.password2 = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      signup(formData).then((res) => {
        if (res.data) {
          toast.success("Account Created");
          navigate("/login");
        } else {
          toast.error("Account creation failed");
        }
      });
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Social signup with ${provider}.`);
    // Replace with OAuth logic
  };

  return (
    <div className="h-full  w-full flex bg-white">
      {/* Left Side Image */}
      <div className="hidden md:flex w-1/2 items-center justify-center">
        <img
          src={image}
          alt="Signup illustration"
          className="w-full h-screen rounded-sm object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <div className="w-[80%] rounded-lg pt-8 mb-4 flex flex-col">
          <div className="flex justify-center mb-6">
            <img src={logo} alt="Logo" className="h-10" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-2xl font-bold text-gray-800 mb-1 tracking-tight">
              Sign Up
            </h2>
            <p className="text-sm text-gray-500 mb-2">
              New to our platform? Sign up now! It only takes a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="flex gap-3 mb-3">
              <div className="w-1/2">
                <label className="text-sm font-normal text-[#21272A]/70 mb-2">
                  First Name
                </label>
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  autoComplete="given-name"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="John"
                  className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 transition ${
                    errors.first_name ? "border-red-400" : "border-blue-100"
                  }`}
                />
                {errors.first_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="w-1/2">
                <label className="text-sm font-normal text-[#21272A]/70 mb-2">
                  Last Name
                </label>
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  autoComplete="family-name"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Doe"
                  className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 transition ${
                    errors.last_name ? "border-red-400" : "border-blue-100"
                  }`}
                />
                {errors.last_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-2">
              <label className="text-sm font-normal text-[#21272A]/70 mb-2">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full rounded-md border px-3 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 transition ${
                  errors.email ? "border-red-400" : "border-blue-100"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </div>
            <div className="mb-2 relative">
              <label className="text-sm font-normal text-[#21272A]/70 mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter Your Password"
                className={`w-full rounded-md border px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 transition ${
                  errors.password ? "border-red-400" : "border-blue-100"
                }`}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-8 text-gray-400 hover:text-blue-400 focus:outline-none"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
              {/* Helper below password */}
              <p className="text-xs text-gray-400 mt-1">
                Enter a password of minimum 8 characters.
              </p>
            </div>
            <div className="mb-2 relative">
              <label className="text-sm font-normal text-[#21272A]/70 mb-2">
                Confirm Password
              </label>
              <input
                id="password2"
                name="password2"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Your Password"
                className={`w-full rounded-md border px-3 py-2 pr-10 text-sm text-gray-800 placeholder-gray-400 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300 transition ${
                  errors.password2 ? "border-red-400" : "border-blue-100"
                }`}
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowConfirmPassword((s) => !s)}
                className="absolute right-3 top-8 text-gray-400 hover:text-blue-400 focus:outline-none"
              >
                {showConfirmPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
              {errors.password2 && (
                <p className="text-xs text-red-500 mt-1">{errors.password2}</p>
              )}
            </div>
            {/* Remember Me */}
            <div className="flex items-center mb-5">
              <input
                type="checkbox"
                id="remember"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                className="h-4 w-4 rounded border-blue-100 text-blue-500 focus:ring-blue-300 transition"
              />
              <label htmlFor="remember" className="ml-2 text-xs text-gray-600">
                Remember me
              </label>
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm ${
                isLoading ? "opacity-60 cursor-not-allowed" : ""
              }`}
            >
              Sign Up
            </button>
          </form>
          {/* Social Buttons */}
          <div className="mt-4 flex gap-2">
            <button
              type="button"
              className="flex items-center justify-center text-sm gap-2 w-1/2 py-1 bg-white border border-blue-100 text-gray-700 rounded-md shadow-sm hover:bg-blue-50 transition font-medium"
              onClick={() => handleSocialLogin("Google")}
            >
              <img src={google} className="w-8 h-8" alt="Google Icon" /> Sign up with Google
            </button>
            <button
              type="button"
              className="flex items-center justify-center gap-2 text-sm w-1/2 py-2 bg-white border border-blue-100 text-gray-700 rounded-md shadow-sm hover:bg-blue-50 transition font-medium"
              onClick={() => handleSocialLogin("Apple")}
            >
              <FaApple className="w-5 h-5" /> Sign up with Apple
            </button>
          </div>
          {/* Login Link */}
          <div className="mt-5 text-center">
            <span className="text-xs text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Login
              </a>
            </span>
          </div>
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default Signup;
