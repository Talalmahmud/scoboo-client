"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { userLogin } from "@/lib/action";
import api from "@/utils/axios";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  address: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpSchema = z.object({
  otp: z.string().length(6, "OTP must be 6 digits"),
});

type LoginData = z.infer<typeof loginSchema>;
type RegisterData = z.infer<typeof registerSchema>;
type OTPData = z.infer<typeof otpSchema>;

export function AuthDialog() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<"login" | "register" | "otp">("login");
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [otpSent, setOtpSent] = React.useState<string | null>(null);

  const loginForm = useForm<LoginData>({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
  });
  const otpForm = useForm<OTPData>({ resolver: zodResolver(otpSchema) });

  // --- Login ---
  const onLogin = async (data: LoginData) => {
    setEmail(data.email);
    const resLogin = await userLogin(data);
    if (resLogin) {
      setOpen(false);
    } else setMessage("❌ Invalid credentials");
  };

  // --- Register ---
  const onRegister = async (data: RegisterData) => {
    const res = await api.post(
      process.env.NEXT_PUBLIC_BASE_URL + "/users",
      data
    );
    if (res.status === 201) {
      // Simulate OTp
      setMode("otp");
      setMessage("📩 OTP sent to your email.");
    } else setMessage("⚠️ Email already exists");
  };

  // --- Verify OTP ---
  const onVerifyOTP = (data: OTPData) => {
    if (data.otp === otpSent) {
      setMessage("✅ Verification successful!");
      setTimeout(() => {
        setOpen(false);
        setMode("login");
        setMessage("");
        otpForm.reset();
      }, 1500);
    } else {
      setMessage("❌ Invalid OTP. Try again.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-full px-6 py-2 font-medium shadow-md hover:shadow-lg transition-all">
          {mode === "login" ? "Login" : "Register"}
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl p-6 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold mb-2">
            {mode === "login"
              ? "Welcome Back 👋"
              : mode === "register"
              ? "Create an Account 🎉"
              : "Verify OTP 🔐"}
          </DialogTitle>
          <p className="text-center text-sm text-muted-foreground mb-4">
            {mode === "login"
              ? "Login to continue to your account"
              : mode === "register"
              ? "Sign up to get started"
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {/* LOGIN FORM */}
          {mode === "login" && (
            <motion.div
              key="login"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <form
                onSubmit={loginForm.handleSubmit(onLogin)}
                className="space-y-3"
              >
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    placeholder="Enter your email"
                    type="email"
                    {...loginForm.register("email")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    placeholder="Enter your password"
                    type="password"
                    {...loginForm.register("password")}
                    className="mt-1"
                  />
                </div>
                <Button className="w-full mt-4" type="submit">
                  Login
                </Button>
              </form>
            </motion.div>
          )}

          {/* REGISTER FORM */}
          {mode === "register" && (
            <motion.div
              key="register"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <form
                onSubmit={registerForm.handleSubmit(onRegister)}
                className="space-y-3"
              >
                <div>
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    placeholder="Full name"
                    {...registerForm.register("name")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    placeholder="Email address"
                    type="email"
                    {...registerForm.register("email")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    placeholder="Optional"
                    {...registerForm.register("address")}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Password</label>
                  <Input
                    placeholder="Choose a password"
                    type="password"
                    {...registerForm.register("password")}
                    className="mt-1"
                  />
                </div>
                <Button className="w-full mt-4" type="submit">
                  Register
                </Button>
              </form>
            </motion.div>
          )}

          {/* OTP VERIFICATION FORM */}
          {mode === "otp" && (
            <motion.div
              key="otp"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              <form
                onSubmit={otpForm.handleSubmit(onVerifyOTP)}
                className="flex flex-col items-center space-y-4"
              >
                <div className="flex space-x-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <Input
                      key={i}
                      maxLength={1}
                      className="w-10 h-10 text-center text-lg font-semibold"
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/, "");
                        if (!val) return;
                        const otp = otpForm.getValues("otp") || "";
                        const updated =
                          otp.substring(0, i) + val + otp.substring(i + 1);
                        otpForm.setValue("otp", updated.slice(0, 6));
                        if (e.target.nextElementSibling) {
                          (
                            e.target.nextElementSibling as HTMLInputElement
                          ).focus();
                        }
                      }}
                    />
                  ))}
                </div>
                <Button className="w-full mt-4" type="submit">
                  Verify OTP
                </Button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {message && (
          <p className="text-sm text-center mt-4 text-muted-foreground">
            {message}
          </p>
        )}

        {mode !== "otp" && (
          <div className="mt-5 text-center text-sm">
            {mode === "login" ? (
              <p>
                Don’t have an account?{" "}
                <button
                  onClick={() => setMode("register")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Register
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Login
                </button>
              </p>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
