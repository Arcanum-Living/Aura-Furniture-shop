"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, DURATION, EASE_OUT } from "@/components/motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User as UserIcon,
  ArrowRight,
  ShieldCheck,
  X,
} from "lucide-react";

import { useShop } from "@/context/ShopContext";
import { CometSpinner } from "@/components/ui/comet-spinner";

interface AuthPageProps {
  initialMode?: "login" | "signup";
}

export const AuthPage: React.FC<AuthPageProps> = ({
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);

  const [showPassword, setShowPassword] = useState(false);

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSubmitted, setForgotSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { loginUser, user, showNotification } = useShop();

  const router = useRouter();

  /**
   * Redirect UI if user is already authenticated
   */
  if (user) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white border border-[#E5E0D8] p-8 text-center shadow-sm">
          <h2 className="font-serif text-2xl text-[#1A1A18] mb-3">
            You are already signed in
          </h2>

          <p className="text-sm text-[#8C8279] mb-6">
            Logged in as {user.email}.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => router.push("/")}
              className="flex-1 bg-[#1A1A18] text-white py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#333230] transition-colors"
            >
              Continue Shopping
            </button>

            <Link
              href="/"
              className="flex-1 border border-[#E5E0D8] text-[#1A1A18] py-3 text-xs uppercase tracking-widest font-semibold hover:bg-[#F9F8F6] transition-colors flex items-center justify-center"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Login / Signup submit
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your full name.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    setLoading(true);

    setTimeout(() => {
      loginUser(email, mode === "signup" ? name : undefined);
      setLoading(false);
      router.push("/");
    }, 600);
  };

  /**
   * Social login
   */
  const handleSocialLogin = (provider: string) => {
    loginUser(
      `${provider.toLowerCase()}user@auradesign.com`,
      `${provider} User`,
    );

    router.push("/");
  };

  /**
   * Forgot password
   */
  const handleForgotSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      return;
    }

    setForgotSubmitted(true);

    showNotification(`Reset instructions sent to ${forgotEmail}`);
  };

  /**
   * Change auth mode
   */
  const changeMode = (newMode: "login" | "signup") => {
    setMode(newMode);
    setError("");
  };

  return (
    <main className="min-h-screen bg-[#F3F1ED] flex items-center justify-center px-4 py-6 sm:px-6 lg:px-8">
      {/* MAIN AUTH CONTAINER */}
      <div className="w-full max-w-6xl overflow-hidden bg-white border border-[#DED9D0] shadow-[0_20px_70px_rgba(26,26,24,0.10)] rounded-2xl">
        <div className="grid min-h-[680px] lg:grid-cols-2">

          {/* LEFT SIDE - IMAGE */}
          <section className="relative hidden lg:block min-h-[680px] overflow-hidden bg-[#1A1A18]">
            <motion.img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=85&w=1400"
              alt="AURA luxury interior"
              initial={{ opacity: 0, scale: 1.08 }}
              animate={{ opacity: 1, scale: 1.03 }}
              transition={{ duration: DURATION.image, ease: EASE_OUT }}
              className="absolute inset-0 h-full w-full object-cover"
            />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: DURATION.slow, ease: EASE_OUT }}
              className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/35 to-[#1A1A18]/90"
            />

            <div className="relative z-10 flex h-full flex-col justify-between p-8 xl:p-12 text-white">

              {/* Brand */}
              <div className="flex items-center justify-between">
                <Link
                  href="/"
                  className="font-serif italic text-3xl tracking-[0.12em] hover:opacity-80 transition-opacity"
                >
                  AURA
                </Link>
              </div>

              {/* Center content */}
              <div className="max-w-lg">
                <span className="mb-5 block text-[10px] font-semibold uppercase tracking-[0.35em] text-[#D4AF37]">
                  Curated Living
                </span>

                <blockquote className="font-serif text-3xl xl:text-4xl leading-tight italic text-white">
                  &ldquo;Simplicity is about subtracting the obvious and adding
                  the meaningful.&rdquo;
                </blockquote>

                <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4 text-[10px] uppercase tracking-wider text-white/60">
                  <span className="text-[#D4AF37]">
                    AURA Atelier
                  </span>
                </div>
              </div>

              {/* Security */}
              <div className="flex max-w-md items-center gap-3 rounded-xl border border-white/10 bg-black/25 p-4 backdrop-blur-md">
                <ShieldCheck className="h-5 w-5 shrink-0 text-[#D4AF37]" />

                <span className="text-xs leading-relaxed text-white/75">
                  Encrypted authentication & seamless order tracking across all
                  device sessions.
                </span>
              </div>
            </div>
          </section>

          {/* RIGHT SIDE - LOGIN / SIGNUP */}
          <section className="flex items-center justify-center bg-[#F9F8F6] p-5 sm:p-8 lg:p-10 xl:p-12">
            <div className="w-full max-w-md">

              {/* Mobile Brand */}
              <div className="mb-8 text-center lg:hidden">
                <Link
                  href="/"
                  className="font-serif italic text-3xl tracking-[0.12em] text-[#1A1A18]"
                >
                  AURA
                </Link>
              </div>

              {/* Header */}
              <Reveal onMount className="mb-7 space-y-2">
                <h1 className="font-serif text-3xl font-normal tracking-tight text-[#1A1A18]">
                  {mode === "login"
                    ? "Sign in to your account"
                    : "Create an AURA account"}
                </h1>

                <p className="text-sm leading-relaxed text-[#8C8279]">
                  {mode === "login"
                    ? "Enter your credentials below to access your saved items and orders."
                    : "Join AURA to receive bespoke consultations, wishlist sync & early releases."}
                </p>
              </Reveal>

              {/* Login / Signup tabs */}
              <Reveal onMount delay={0.08} className="mb-6 grid grid-cols-2 rounded-lg border border-[#E5E0D8] bg-[#ECE8E1] p-1">
                <button
                  type="button"
                  onClick={() => changeMode("login")}
                  className={`rounded-md py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                    mode === "login"
                      ? "bg-white text-[#1A1A18] shadow-sm"
                      : "text-[#8C8279] hover:text-[#1A1A18]"
                  }`}
                >
                  Sign In
                </button>

                <button
                  type="button"
                  onClick={() => changeMode("signup")}
                  className={`rounded-md py-2.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                    mode === "signup"
                      ? "bg-white text-[#1A1A18] shadow-sm"
                      : "text-[#8C8279] hover:text-[#1A1A18]"
                  }`}
                >
                  Register
                </button>
              </Reveal>

              {/* Divider */}
              <div className="relative mb-6 flex items-center justify-center">
                <div className="w-full border-t border-[#E5E0D8]" />

                <span className="absolute bg-[#F9F8F6] px-3 text-[9px] uppercase tracking-[0.2em] text-[#8C8279]">
                  or continue with
                </span>
              </div>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="mb-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Main form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={mode}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-4"
                  >
                    {/* Full Name */}
                    {mode === "signup" && (
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A18]"
                        >
                          Full Name
                        </label>

                        <div className="relative">
                          <UserIcon className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8279]" />

                          <input
                            id="name"
                            type="text"
                            required
                            placeholder="Victoria Sterling"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-[#E5E0D8] bg-white py-3 pl-10 pr-4 text-sm text-[#1A1A18] outline-none transition-colors placeholder:text-[#8C8279]/60 focus:border-[#1A1A18]"
                          />
                        </div>
                      </div>
                    )}

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A18]"
                      >
                        Email Address
                      </label>

                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8279]" />

                        <input
                          id="email"
                          type="email"
                          required
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full rounded-lg border border-[#E5E0D8] bg-white py-3 pl-10 pr-4 text-sm text-[#1A1A18] outline-none transition-colors placeholder:text-[#8C8279]/60 focus:border-[#1A1A18]"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A18]"
                        >
                          Password
                        </label>

                        {mode === "login" && (
                          <button
                            type="button"
                            onClick={() => setIsForgotModalOpen(true)}
                            className="text-[11px] font-medium text-[#8C8279] hover:text-[#1A1A18] hover:underline"
                          >
                            Forgot password?
                          </button>
                        )}
                      </div>

                      <div className="relative">
                        <Lock className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8C8279]" />

                        <input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          required
                          placeholder="â€¢â€¢â€¢â€¢â€¢â€¢â€¢â€¢"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="w-full rounded-lg border border-[#E5E0D8] bg-white py-3 pl-10 pr-10 text-sm text-[#1A1A18] outline-none transition-colors placeholder:text-[#8C8279]/60 focus:border-[#1A1A18]"
                        />

                        <button
                          type="button"
                          onClick={() =>
                            setShowPassword((value) => !value)
                          }
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8C8279] hover:text-[#1A1A18]"
                          aria-label={
                            showPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Remember Me */}
                    {mode === "login" && (
                      <div className="flex items-center gap-2 pt-1">
                        <input
                          id="remember"
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) =>
                            setRememberMe(e.target.checked)
                          }
                          className="h-4 w-4 cursor-pointer rounded border-[#E5E0D8]"
                        />

                        <label
                          htmlFor="remember"
                          className="cursor-pointer text-xs text-[#8C8279]"
                        >
                          Remember me on this browser
                        </label>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileTap={loading ? undefined : { scale: 0.99 }}
                  transition={{ duration: 0.15, ease: EASE_OUT }}
                  className="group mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1A1A18] px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-[background-color,opacity] duration-300 hover:bg-[#333230] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {loading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                        className="flex items-center gap-2"
                      >
                        <CometSpinner />
                        <span>Authenticating...</span>
                      </motion.div>
                    ) : (
                      <motion.span
                        key="idle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2, ease: EASE_OUT }}
                        className="flex items-center gap-2"
                      >
                        <span>
                          {mode === "login"
                            ? "Sign In to Account"
                            : "Create AURA Account"}
                        </span>

                        <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </form>

              {/* Terms */}
              <p className="mt-6 text-center text-[10px] leading-relaxed text-[#8C8279]">
                By continuing, you agree to AURA&apos;s{" "}
                <a
                  href="#"
                  className="underline hover:text-[#1A1A18]"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="underline hover:text-[#1A1A18]"
                >
                  Privacy Policy
                </a>
                .
              </p>
            </div>
          </section>
        </div>
      </div>

      {/* FORGOT PASSWORD MODAL */}
      <AnimatePresence>
        {isForgotModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-sm space-y-5 rounded-xl border border-[#E5E0D8] bg-white p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => {
                  setIsForgotModalOpen(false);
                  setForgotSubmitted(false);
                }}
                className="absolute right-4 top-4 text-[#8C8279] transition-colors hover:text-[#1A1A18]"
                aria-label="Close dialog"
              >
                <X className="h-4 w-4" />
              </button>

              <div>
                <h3 className="font-serif text-2xl text-[#1A1A18]">
                  Reset Password
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#8C8279]">
                  Enter your account email address below and we will send a
                  password reset link.
                </p>
              </div>

              {forgotSubmitted ? (
                <div className="space-y-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-800">
                  <div className="font-bold">
                    Instructions Sent!
                  </div>

                  <p>
                    Check your inbox at{" "}
                    <strong>{forgotEmail}</strong> to reset your password.
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotModalOpen(false);
                      setForgotSubmitted(false);
                    }}
                    className="mt-2 w-full rounded-lg bg-emerald-700 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-emerald-800"
                  >
                    Done
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleForgotSubmit}
                  className="space-y-4"
                >
                  <div className="space-y-1.5">
                    <label
                      htmlFor="forgotEmail"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#1A1A18]"
                    >
                      Email Address
                    </label>

                    <input
                      id="forgotEmail"
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={forgotEmail}
                      onChange={(e) =>
                        setForgotEmail(e.target.value)
                      }
                      className="w-full rounded-lg border border-[#E5E0D8] px-3 py-3 text-sm outline-none transition-colors focus:border-[#1A1A18]"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() =>
                        setIsForgotModalOpen(false)
                      }
                      className="px-4 py-2 text-xs font-medium text-[#8C8279] hover:text-[#1A1A18]"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="rounded-lg bg-[#1A1A18] px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#333230]"
                    >
                      Send Reset Link
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default AuthPage;
