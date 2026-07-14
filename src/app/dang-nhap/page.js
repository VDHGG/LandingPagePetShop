"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
        router.push("/");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-grow pt-32 pb-20 px-4 flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="bg-white dark:bg-surface p-8 rounded-3xl shadow-2xl border border-border">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🐾</div>
            <h1 className="text-3xl font-bold text-foreground">Đăng Nhập</h1>
            <p className="text-foreground/60 mt-2">Mừng bạn quay trở lại PetShop!</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Email</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none bg-transparent"
                placeholder="admin@gmail.com"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-foreground mb-2">Mật khẩu</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-border focus:ring-2 focus:ring-primary/50 focus:outline-none bg-transparent"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <motion.div 
                initial={{ x: -10 }} 
                animate={{ x: [0, -10, 10, -10, 10, 0] }} 
                transition={{ duration: 0.4 }}
                className="text-red-500 text-sm font-bold text-center"
              >
                {error}
              </motion.div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-bold text-lg shadow-md transition-transform active:scale-[0.98] disabled:opacity-70"
            >
              {isLoading ? "Đang xử lý..." : "Đăng Nhập"}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-foreground/70">
            Chưa có tài khoản? <Link href="/dang-ky" className="text-primary font-bold hover:underline">Đăng ký ngay</Link>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
