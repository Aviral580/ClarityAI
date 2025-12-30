import React, { useState } from "react"; // Added useState
import { motion, AnimatePresence } from "framer-motion"; // Added AnimatePresence
import { Mail, Lock, ArrowRight, Github, Loader2 } from "lucide-react"; // Added Loader2
import { Link, useNavigate } from "react-router-dom"; // Added useNavigate
import { useTheme } from "../components/ThemeContext";

export default function Login() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", msg: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setFeedback({ type: "", msg: "" });

    // Construct data matching your backend loginUser requirements
    const formData = {
      identifier: e.target.identifier.value,
      password: e.target.password.value,
    };

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setFeedback({
          type: "success",
          msg: result.message || "Login Successful!",
        });

        // Wait 3 seconds then redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        setFeedback({
          type: "error",
          msg: result.message || "Invalid credentials",
        });
      }
    } catch (error) {
      setFeedback({ type: "error", msg: "Connection to server failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-500 ${
        isDark ? "bg-slate-950" : "bg-slate-50"
      }`}
    >
      {/* Background Decorative Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-1/4 -left-20 w-80 h-80 rounded-full blur-[120px] opacity-20 bg-indigo-600`}
        />
        <div
          className={`absolute bottom-1/4 -right-20 w-80 h-80 rounded-full blur-[120px] opacity-20 bg-purple-600`}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-md p-8 rounded-3xl border shadow-2xl backdrop-blur-sm ${
          isDark
            ? "bg-slate-900/50 border-white/10"
            : "bg-white border-slate-200"
        }`}
      >
        <div className="text-center mb-8">
          <h1
            className={`text-3xl font-bold mb-2 ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Welcome Back
          </h1>
          <p className={isDark ? "text-slate-400" : "text-slate-500"}>
            Enter your credentials to access your account
          </p>
        </div>

        {/* Feedback Alert - Shows backend response */}
        <AnimatePresence>
          {feedback.msg && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className={`mb-6 p-4 rounded-xl text-center text-sm font-bold border ${
                feedback.type === "success"
                  ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-500"
                  : "bg-rose-500/10 border-rose-500/20 text-rose-500"
              }`}
            >
              {feedback.msg} {feedback.type === "success" && "Redirecting..."}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className={`block text-sm font-medium mb-2 ${
                isDark ? "text-slate-300" : "text-slate-700"
              }`}
            >
              Email Address or Username
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                name="identifier" // Matches 'identifier' in your backend code
                required
                type="text"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700 focus:border-indigo-500 text-white"
                    : "bg-slate-50 border-slate-200 focus:border-indigo-500"
                }`}
                placeholder="name@company.com"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-2">
              <label
                className={`text-sm font-medium ${
                  isDark ? "text-slate-300" : "text-slate-700"
                }`}
              >
                Password
              </label>
              <Link to="#" className="text-sm text-indigo-500 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                name="password" // Matches 'password' in your backend code
                required
                type="password"
                className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none transition-all ${
                  isDark
                    ? "bg-slate-800/50 border-slate-700 focus:border-indigo-500 text-white"
                    : "bg-slate-50 border-slate-200 focus:border-indigo-500"
                }`}
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative flex items-center justify-center mb-6">
            <div
              className={`w-full border-t ${
                isDark ? "border-slate-700" : "border-slate-200"
              }`}
            />
            <span
              className={`absolute px-4 text-sm ${
                isDark
                  ? "bg-slate-900 text-slate-500"
                  : "bg-white text-slate-400"
              }`}
            >
              Or continue with
            </span>
          </div>

          <button
            className={`w-full py-3 rounded-xl border flex items-center justify-center gap-3 font-medium transition-colors ${
              isDark
                ? "border-slate-700 text-white hover:bg-slate-800"
                : "border-slate-200 text-slate-700 hover:bg-slate-50"
            }`}
          >
            <Github className="w-5 h-5" />
            GitHub
          </button>
        </div>

        <p
          className={`mt-8 text-center text-sm ${
            isDark ? "text-slate-400" : "text-slate-600"
          }`}
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-500 font-bold hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
