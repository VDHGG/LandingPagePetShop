"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Checkout Form, 3: Success
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isCartOpen) {
    if (step !== 1) setTimeout(() => setStep(1), 300); // Reset after close animation
    return null;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!formData.name || !formData.phone || !formData.address) {
      setError("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          cart,
          total: cartTotal
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStep(3);
        clearCart();
      } else {
        setError(data.error || "Có lỗi xảy ra, vui lòng thử lại.");
      }
    } catch (err) {
      setError("Mất kết nối mạng. Vui lòng thử lại.");
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      ></div>

      {/* Cart Panel */}
      <div className="relative w-full max-w-md h-full bg-surface shadow-2xl flex flex-col animate-slide-in">
        <div className="p-6 border-b border-border flex justify-between items-center bg-primary text-white">
          <h2 className="text-2xl font-bold">
            {step === 1 ? "Giỏ Hàng Của Bạn" : step === 2 ? "Thông Tin Đặt Hàng" : "Thành Công"}
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Đóng giỏ hàng"
          >
            ✕
          </button>
        </div>

        {step === 1 && (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50/50 dark:bg-background/50">
              {cart.length === 0 ? (
                <div className="text-center text-foreground/60 mt-10">
                  <p className="text-lg">Giỏ hàng đang trống.</p>
                  <p className="text-sm mt-2">Hãy đón một bé thú cưng về nhà nhé!</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white dark:bg-surface rounded-xl shadow-sm border border-border">
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover rounded-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-primary font-semibold">{item.price.toLocaleString("vi-VN")} đ</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-11 h-11 rounded-full bg-border flex items-center justify-center hover:bg-gray-200"
                          aria-label="Giảm số lượng"
                        >-</button>
                        <span className="font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-11 h-11 rounded-full bg-border flex items-center justify-center hover:bg-gray-200"
                          aria-label="Tăng số lượng"
                        >+</button>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 self-start p-2"
                      aria-label="Xóa khỏi giỏ hàng"
                    >✕</button>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-border bg-white dark:bg-surface">
                <div className="flex justify-between items-center mb-6 text-xl font-bold">
                  <span>Tổng cộng:</span>
                  <span className="text-primary">{cartTotal.toLocaleString("vi-VN")} đ</span>
                </div>
                <button 
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-lg font-bold transition-transform active:scale-95 shadow-md hover:shadow-lg"
                  onClick={() => setStep(2)}
                >
                  Thanh Toán Ngay
                </button>
              </div>
            )}
          </>
        )}

        {step === 2 && (
          <div className="flex-1 flex flex-col p-6 bg-white dark:bg-surface overflow-y-auto">
            <button 
              onClick={() => setStep(1)}
              className="text-primary font-bold text-sm flex items-center gap-1 mb-6 hover:underline w-fit"
            >
              ← Quay lại giỏ hàng
            </button>
            <p className="text-foreground/80 mb-6">Vui lòng điền thông tin để chúng tôi liên hệ giao thú cưng cho bạn.</p>
            
            <form onSubmit={handleCheckout} className="flex-1 flex flex-col">
              <div className="space-y-4 flex-1">
                <div>
                  <label htmlFor="customerName" className="block text-sm font-bold mb-1">Họ và tên *</label>
                  <input 
                    id="customerName"
                    type="text" 
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="Nhập tên của bạn"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="customerPhone" className="block text-sm font-bold mb-1">Số điện thoại *</label>
                  <input 
                    id="customerPhone"
                    type="tel" 
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label htmlFor="customerAddress" className="block text-sm font-bold mb-1">Địa chỉ giao hàng *</label>
                  <textarea 
                    id="customerAddress"
                    required
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                    placeholder="Nhập địa chỉ nhận hàng"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  ></textarea>
                </div>
                {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
              </div>

              <div className="mt-8 border-t border-border pt-6">
                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                  <span>Cần thanh toán:</span>
                  <span className="text-primary">{cartTotal.toLocaleString("vi-VN")} đ</span>
                </div>
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-xl text-lg font-bold transition-transform active:scale-95 shadow-md disabled:opacity-50 flex justify-center items-center gap-2"
                >
                  {isLoading ? "Đang xử lý..." : "Xác Nhận Đặt Hàng"}
                </button>
              </div>
            </form>
          </div>
        )}

        {step === 3 && (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-white dark:bg-surface">
            <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-sm">
              ✓
            </div>
            <h3 className="text-3xl font-bold mb-4">Đặt hàng thành công!</h3>
            <p className="text-foreground/70 mb-8 text-lg">
              Cảm ơn bạn đã tin tưởng. Đội ngũ PetShop sẽ gọi lại cho bạn trong ít phút để xác nhận đơn hàng nhé.
            </p>
            <button 
              onClick={() => {
                setStep(1);
                setIsCartOpen(false);
              }}
              className="px-8 py-3 bg-gray-100 hover:bg-gray-200 rounded-full font-bold transition-colors"
            >
              Tiếp tục xem thú cưng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
