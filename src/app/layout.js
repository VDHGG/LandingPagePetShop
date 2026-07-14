import { Quicksand } from "next/font/google";
import "./globals.css";
import Chatbot from "../components/Chatbot";
import CursorTrail from "../components/CursorTrail";
import Header from "../components/Header";
import Cart from "../components/Cart";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../components/ThemeProvider";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "Pet Shop - Hệ Thống Nhân Giống Thú Cưng",
  description: "Bán thú cưng online đa dạng: Chó, Mèo, Chim, Bò sát...",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${quicksand.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <CartProvider>
          <Header />
          {children}
          {/* Footer chung */}
          <footer className="bg-foreground text-white py-12 px-4 mt-auto">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">🐾</span>
                  <span className="text-xl font-bold">PetShop</span>
                </div>
                <p className="text-gray-400">Đồng hành cùng thú cưng của bạn mỗi ngày.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Liên Hệ</h3>
                <p className="text-gray-400">📞 1900 1234</p>
                <p className="text-gray-400">📧 hello@petshop.vn</p>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-4">Chính Sách</h3>
                <p className="text-gray-400 cursor-pointer hover:text-white">Bảo hành sức khỏe</p>
                <p className="text-gray-400 cursor-pointer hover:text-white">Vận chuyển</p>
              </div>
            </div>
          </footer>
          <Cart />
            </CartProvider>
          </AuthProvider>
        <Chatbot />
        <CursorTrail />
        </ThemeProvider>
      </body>
    </html>
  );
}
