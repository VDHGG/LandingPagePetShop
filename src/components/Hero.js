"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-background to-accent/20 pt-20 pb-24 md:pt-32 md:pb-32 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex-1 text-center md:text-left z-10"
        >
          <div className="inline-block px-4 py-2 bg-white dark:bg-surface rounded-full shadow-sm text-primary font-bold text-sm mb-6 animate-fade-in">
            🐾 Hơn 5,000 khách hàng tin tưởng
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-6 tracking-tight">
            Thế Giới Thú Cưng <br className="hidden md:block"/>
            <span className="text-primary">Trong Tầm Tay</span>
          </h1>
          <p className="text-xl text-foreground/70 mb-10 max-w-xl mx-auto md:mx-0 leading-relaxed">
            Nơi kết nối tình yêu thương giữa bạn và những người bạn bốn chân. Chăm sóc tận tâm, bảo hành sức khỏe trọn đời.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button className="w-full sm:w-auto px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-lg transition-transform active:scale-95 shadow-md hover:shadow-lg">
              Đón Bé Về Nhà
            </button>
            <button className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-surface hover:bg-gray-50 dark:hover:bg-gray-800 text-foreground border border-border rounded-full font-bold text-lg transition-all shadow-sm">
              Tìm Hiểu Thêm
            </button>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex-1 relative z-10 w-full max-w-lg mx-auto"
        >
          {/* Main Hero Image */}
          <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white dark:border-surface aspect-[4/5] md:aspect-square bg-white dark:bg-surface">
            <Image 
              src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800&auto=format&fit=crop" 
              alt="Chó dễ thương" 
              fill
              className="object-cover"
            />
          </div>
          {/* Floating badge */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, type: "spring" }}
            className="absolute -bottom-6 -left-6 bg-white dark:bg-surface p-4 rounded-3xl shadow-xl border border-border flex items-center gap-4 animate-bounce-slow"
          >
            <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-2xl">
              ✨
            </div>
            <div>
              <div className="text-sm font-bold text-foreground">Sức khỏe</div>
              <div className="text-xs text-foreground/60">Bảo hành 365 ngày</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decorative background shapes */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/3 w-96 h-96 bg-secondary/30 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent -z-10"></div>
    </section>
  );
}
