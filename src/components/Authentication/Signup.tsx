import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { FaApple, FaGoogle } from "react-icons/fa";
import image from '../../assets/PremiumShowcase.png'

const SOCIAL_PROVIDERS = [
  {
    name: "Google",
    bg: "bg-white border border-blue-600",
    text: "text-blue-600",
    icon: FaGoogle,
  },
  { name: "Apple", bg: "bg-blue-600", text: "text-white", icon: FaApple },
];

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    )
      newErrors.email = "Invalid email address";
    if (!formData.password || formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Data Submitted:", formData);
      alert("Signup successful! Check console for form data.");
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Social login with ${provider} clicked. Integrate OAuth flow.`);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row w-full bg-white">
      {/* Left side: Signup form */}
      <div className="w-full md:w-1/2  flex items-center justify-center">
        <motion.div
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full border border-blue-100"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-2xl font-bold text-gray-800 mb-8 text-center"
            variants={itemVariants}
          >
            Create Your Account
          </motion.h1>

          <motion.div
            className="flex justify-center gap-4 mb-4"
            role="group"
            variants={itemVariants}
          >
            {SOCIAL_PROVIDERS.map(({ name, bg, text, icon: Icon }) => (
              <button
                key={name}
                onClick={() => handleSocialLogin(name)}
                className={`${bg} ${text} flex items-center gap-2 px-4 py-2 rounded-md shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 font-medium select-none`}
                type="button"
                aria-label={`Sign up with ${name}`}
              >
                <Icon className="w-5 h-5" />
                <span>{name}</span>
              </button>
            ))}
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-4"
            variants={itemVariants}
          >
            {/* Full Name */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className={`w-full rounded-lg border px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
              )}
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full rounded-lg border px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email}</p>
              )}
            </motion.div>

            {/* Password */}
            <motion.div className="relative" variants={itemVariants}>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-lg border px-4 py-2 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-10 text-gray-400 hover:text-blue-500"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </motion.div>

            {/* Confirm Password */}
            <motion.div className="relative" variants={itemVariants}>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••••"
                className={`w-full rounded-lg border px-4 py-2 pr-12 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-10 text-gray-400 hover:text-blue-500"
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </motion.div>

            {/* Terms */}
            <motion.div
              className="flex items-center space-x-3"
              variants={itemVariants}
            >
              <input
                type="checkbox"
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-400"
              />
              <label htmlFor="termsAccepted" className="text-sm text-gray-600">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </a>
              </label>
            </motion.div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition-transform transform hover:scale-[1.02]"
              variants={itemVariants}
            >
              Create Account
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
      {/* Right side: Image or Illustration */}
      <div className="hidden md:block w-1/2">
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="w-full h-screen object-cover rounded-r-2xl"
        />
      </div>{" "}
    </div>
  );
};

export default Signup;
