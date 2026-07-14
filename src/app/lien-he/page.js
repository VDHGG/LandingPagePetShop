"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="flex-grow pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-extrabold text-foreground mb-6">Liên Hệ <span className="text-primary">PetShop</span></h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về việc chăm sóc và đón thú cưng.
              </p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Contact Info */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex-1 bg-white dark:bg-surface p-8 md:p-12 rounded-[3rem] shadow-sm border border-border/50"
              >
                <h3 className="text-3xl font-bold mb-8">Thông tin liên hệ</h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Địa chỉ</p>
                      <p className="text-foreground/70">123 Đường Sáng Tạo, Quận Công Nghệ, TP. HCM</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-secondary/20 text-secondary rounded-full flex items-center justify-center shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Hotline</p>
                      <p className="text-foreground/70">1900 1234 (Miễn phí cước)</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-accent/30 text-accent-foreground rounded-full flex items-center justify-center shrink-0">
                      <Mail className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Email</p>
                      <p className="text-foreground/70">hello@petshop.vn</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 text-gray-500 rounded-full flex items-center justify-center shrink-0">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-bold text-lg">Giờ làm việc</p>
                      <p className="text-foreground/70">08:00 - 22:00 (Tất cả các ngày trong tuần)</p>
                    </div>
                  </div>
                </div>

                {/* Mock Map */}
                <div className="mt-10 h-64 bg-gray-200 rounded-3xl overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="Bản đồ" />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-white dark:bg-surface px-4 py-2 rounded-full font-bold shadow-lg text-primary flex items-center gap-2">
                      <MapPin className="w-4 h-4" /> Xem trên Google Maps
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="flex-1 bg-white dark:bg-surface p-8 md:p-12 rounded-[3rem] shadow-xl border border-border"
              >
                <h3 className="text-3xl font-bold mb-2">Gửi tin nhắn</h3>
                <p className="text-foreground/60 mb-8">Chúng tôi sẽ phản hồi bạn trong vòng 24 giờ làm việc.</p>
                
                <form className="space-y-6" onSubmit={e => { e.preventDefault(); alert('Cảm ơn bạn đã liên hệ!'); }}>
                  <div>
                    <label className="block font-bold mb-2 text-sm">Họ và Tên</label>
                    <input type="text" required placeholder="Nguyễn Văn A" className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-background border-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface transition-all" />
                  </div>
                  
                  <div>
                    <label className="block font-bold mb-2 text-sm">Số điện thoại</label>
                    <input type="tel" required placeholder="0909 xxx xxx" className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-background border-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface transition-all" />
                  </div>

                  <div>
                    <label className="block font-bold mb-2 text-sm">Nội dung cần tư vấn</label>
                    <textarea required placeholder="Tôi muốn hỏi về..." rows="4" className="w-full px-5 py-4 rounded-2xl bg-gray-50 dark:bg-background border-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-surface transition-all resize-none"></textarea>
                  </div>

                  <button type="submit" className="w-full py-4 bg-primary hover:bg-primary-hover text-white rounded-2xl font-bold text-lg transition-colors shadow-lg">
                    Gửi Yêu Cầu
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
    </main>
  );
}
