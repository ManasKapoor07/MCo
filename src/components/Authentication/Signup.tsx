import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { FaApple, FaGoogle } from "react-icons/fa";
import image from "../../assets/PremiumShowcase.png";
import logo from "../../assets/logoP2.svg";
import { useSignUpMutation } from "@/redux/api/api";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";

const SOCIAL_PROVIDERS = [
  {
    name: "Apple",
    icon: FaApple,
    bg: "bg-white",
    border: "border border-blue-100",
    text: "text-gray-700",
  },
  {
    name: "Google",
    icon: FaGoogle,
    bg: "bg-white",
    border: "border border-blue-100",
    text: "text-gray-700",
  },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.28 } },
};

const Signup = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
    termsAccepted: false,
  });

  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [signup, { data, isLoading }] = useSignUpMutation();

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim())
      newErrors.first_name = "First name is required";
    if (!formData.last_name.trim())
      newErrors.last_name = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    )
      newErrors.email = "Invalid email address";
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.password2)
      newErrors.password2 = "Passwords do not match";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";

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
          navigate('/login')
        } else {
          toast.error("Account creation failed");
        }
      });
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Social signup with ${provider}.`);
    // OAuth implementation here
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <motion.div
          className="mx-auto max-w-xs md:max-w-sm w-full rounded-2xl shadow-lg border border-blue-100 bg-white p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 shadow-sm">
              <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
            </span>
          </motion.div>
          <motion.h1
            className="text-xl font-semibold text-gray-800 mb-4 text-center"
            variants={itemVariants}
          >
            Create your account
          </motion.h1>
          <motion.div
            className="flex justify-center gap-2 mb-4"
            variants={itemVariants}
          >
            {SOCIAL_PROVIDERS.map(({ name, icon: Icon, bg, border, text }) => (
              <button
                key={name}
                type="button"
                onClick={() => handleSocialLogin(name)}
                className={`w-9 h-9 ${bg} ${border} ${text} flex items-center justify-center rounded-md shadow-sm hover:shadow transition`}
                aria-label={`Sign up with ${name}`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </motion.div>
          <motion.div className="relative mb-4" variants={itemVariants}>
            <span className="absolute inset-x-0 top-2 border-t border-blue-100"></span>
            <span className="relative bg-white px-2 text-xs text-blue-400 block w-fit mx-auto -mt-2">
              OR
            </span>
          </motion.div>
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3"
            variants={itemVariants}
          >
            {/* Name fields */}
            <motion.div className="flex gap-4" variants={itemVariants}>
              <div className="flex-1">
                <input
                  id="first_name"
                  name="first_name"
                  type="text"
                  value={formData.first_name}
                  onChange={handleChange}
                  placeholder="First name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-blue-50/40 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition ${
                    errors.first_name ? "border-red-400" : "border-blue-100"
                  }`}
                />
                {errors.first_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.first_name}
                  </p>
                )}
              </div>
              <div className="flex-1">
                <input
                  id="last_name"
                  name="last_name"
                  type="text"
                  value={formData.last_name}
                  onChange={handleChange}
                  placeholder="Last name"
                  className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-blue-50/40 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition ${
                    errors.last_name ? "border-red-400" : "border-blue-100"
                  }`}
                />
                {errors.last_name && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.last_name}
                  </p>
                )}
              </div>
            </motion.div>
            {/* Email */}
            <motion.div variants={itemVariants}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-blue-50/40 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition ${
                  errors.email ? "border-red-400" : "border-blue-100"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </motion.div>
            {/* Username */}
            <motion.div variants={itemVariants}>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                placeholder="Username"
                className={`w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 bg-blue-50/40 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition ${
                  errors.username ? "border-red-400" : "border-blue-100"
                }`}
              />
              {errors.username && (
                <p className="text-xs text-red-500 mt-1">{errors.username}</p>
              )}
            </motion.div>
            {/* Password */}
            <motion.div className="relative" variants={itemVariants}>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 bg-blue-50/40 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition ${
                  errors.password ? "border-red-400" : "border-blue-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2 text-gray-400 hover:text-blue-500"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </motion.div>
            {/* Confirm Password */}
            <motion.div className="relative" variants={itemVariants}>
              <input
                id="password2"
                name="password2"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.password2}
                onChange={handleChange}
                placeholder="Confirm Password"
                className={`w-full rounded-lg border px-3 py-2 pr-10 text-sm text-gray-900 placeholder-gray-400 bg-blue-50/40 focus:outline-none focus:ring-1 focus:ring-blue-300 focus:border-blue-300 transition ${
                  errors.password2 ? "border-red-400" : "border-blue-100"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2 text-gray-400 hover:text-blue-500"
                tabIndex={-1}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
              {errors.password2 && (
                <p className="text-xs text-red-500 mt-1">{errors.password2}</p>
              )}
            </motion.div>
            {/* Terms */}
            <motion.div
              className="flex items-center gap-2 mt-1"
              variants={itemVariants}
            >
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-4 w-4 rounded border-blue-100 text-blue-500 focus:ring-blue-300"
              />
              <label htmlFor="termsAccepted" className="text-xs text-gray-600">
                I agree to{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms & conditions
                </a>
              </label>
              {errors.termsAccepted && (
                <p className="text-xs text-red-500 ml-2">
                  {errors.termsAccepted}
                </p>
              )}
            </motion.div>
            {/* Submit button */}
            <motion.button
              type="submit"
              disabled={isLoading}
              className={`w-full mt-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 
    ${
      isLoading
        ? "opacity-60 cursor-not-allowed"
        : "hover:from-blue-500 hover:via-blue-600 hover:scale-[1.03]"
    } 
    text-white font-medium py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform text-sm`}
              variants={itemVariants}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-label="loading"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Creating...
                </div>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </motion.form>
          <motion.div className="mt-5 text-center" variants={itemVariants}>
            <span className="text-xs text-gray-500">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-blue-500 font-medium hover:underline"
              >
                Login
              </a>
            </span>
          </motion.div>
        </motion.div>
      </div>
      <div className="hidden md:flex w-full md:w-1/2 items-center justify-center bg-transparent">
        <img
          src={image}
          alt=""
          className="w-full h-screen object-cover rounded-r-2xl"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Signup;
