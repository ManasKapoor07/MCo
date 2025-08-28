import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import { FaApple, FaGoogle } from "react-icons/fa";
import image from "../../assets/PremiumShowcase.png";
import logo from "../../assets/logoP2.svg";
import { useLoginMutation } from "@/redux/api/api";
import { toast } from "sonner";
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

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });
  const [login, { isLoading }] = useLoginMutation();
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) newErrors.password = "Password is required";

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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      login(formData).then((res) => {
        if (res.data) {
          console.log(res.data);
          localStorage.setItem("access", res.data.access);
          toast.success("Login successful!");

          navigate("/", {
            replace: true,
          });
        }
      });
      // Implement login logic here
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`Social login with ${provider}.`);
    // Implement OAuth flow here
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Left side: Login box */}
      <div className="w-full md:w-1/2 flex items-center justify-center">
        <motion.div
          className="mx-auto max-w-xs md:max-w-sm w-full rounded-2xl shadow-lg border border-blue-100 bg-white p-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Logo */}
          <motion.div
            className="flex justify-center mb-4"
            variants={itemVariants}
          >
            <span className="w-14 h-14 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300 shadow-sm">
              <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
            </span>
          </motion.div>
          {/* Title */}
          <motion.h1
            className="text-xl font-semibold text-gray-800 mb-4 text-center"
            variants={itemVariants}
          >
            Login to your account
          </motion.h1>
          {/* Social login buttons */}
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
                aria-label={`Login with ${name}`}
              >
                <Icon className="w-5 h-5" />
              </button>
            ))}
          </motion.div>
          {/* OR Divider */}
          <motion.div className="relative mb-4" variants={itemVariants}>
            <span className="absolute inset-x-0 top-2 border-t border-blue-100"></span>
            <span className="relative bg-white px-2 text-xs text-blue-400 block w-fit mx-auto -mt-2">
              OR
            </span>
          </motion.div>
          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-3"
            variants={itemVariants}
          >
            {/* Username */}
            <motion.div variants={itemVariants}>
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
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
            {/* Remember Me & Forgot Password */}
            <motion.div
              className="flex items-center justify-between text-xs text-gray-600"
              variants={itemVariants}
            >
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-blue-100 text-blue-500 focus:ring-blue-300"
                />
                Keep me logged in
              </label>
              <a href="/forgot-password" className="hover:underline">
                Forgot password?
              </a>
            </motion.div>
            {/* Submit button */}
            <motion.button
              type="submit"
              className="w-full mt-3 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-400 hover:from-blue-500 hover:via-blue-600 text-white font-medium py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 transition-transform hover:scale-[1.03] text-sm"
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
                  Please wait..
                </div>
              ) : (
                "Login"
              )}
            </motion.button>
          </motion.form>
          {/* Signup link */}
          <motion.div className="mt-5 text-center" variants={itemVariants}>
            <span className="text-xs text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="/register"
                className="text-blue-500 font-medium hover:underline"
              >
                Signup
              </a>
            </span>
          </motion.div>
        </motion.div>
      </div>
      {/* Right side: Illustration */}
      <div className="hidden md:flex w-1/2 items-center justify-center bg-transparent">
        <img
          src={image}
          alt="login illustration"
          className="w-full h-screen object-cover rounded-r-2xl"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Login;
