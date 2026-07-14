"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Moon, Sun, User, LogOut } from "lucide-react";

export default function Header() {
  const { cart, setIsCartOpen } = useCart();
  const { user, logout, isAuthLoaded } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-surface/80 backdrop-blur-md border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 text-primary group">
          <span className="text-3xl group-hover:animate-bounce">🐾</span>
          <span className="text-2xl font-extrabold tracking-tight">
            PetShop
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="font-bold hover:text-primary transition-colors">Trang Chủ</Link>
          <Link href="/#products" className="font-bold hover:text-primary transition-colors">Thú Cưng</Link>
          <Link href="/dich-vu" className="font-bold hover:text-primary transition-colors">Dịch Vụ</Link>
          <Link href="/lien-he" className="font-bold hover:text-primary transition-colors">Liên Hệ</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3 md:gap-4">
          
          {/* Auth Menu */}
          {isAuthLoaded && (
            <div className="hidden sm:flex items-center gap-3 mr-2">
              {user ? (
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Xin chào</span>
                    <span className="text-sm font-bold text-primary">{user.name}</span>
                  </div>
                  <button 
                    onClick={logout}
                    className="p-2 text-foreground/50 hover:text-primary hover:bg-primary/10 rounded-full transition-all"
                    title="Đăng xuất"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href="/dang-nhap" className="text-sm font-bold hover:text-primary transition-colors px-3 py-2">
                    Đăng Nhập
                  </Link>
                  <Link href="/dang-ky" className="text-sm font-bold bg-primary hover:bg-primary-hover text-white px-4 py-2 rounded-full transition-colors shadow-sm">
                    Đăng Ký
                  </Link>
                </div>
              )}
            </div>
          )}

          <button 
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-3 bg-white dark:bg-surface border border-border rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
            aria-label="Đổi giao diện"
          >
            {mounted && (theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            {!mounted && <div className="w-5 h-5"></div>}
          </button>

          <button 
            className="relative p-3 bg-white dark:bg-surface border border-border rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors shadow-sm"
            onClick={() => setIsCartOpen(true)}
            aria-label="Mở giỏ hàng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
