"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductList({ pets }) {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["Tất cả", ...new Set(pets.map(p => p.species))];
  
  const filteredPets = pets.filter(pet => {
    const matchesCategory = activeCategory === "Tất cả" || pet.species === activeCategory;
    const matchesSearch = pet.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pet.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-16 px-4 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl font-bold text-foreground mb-4">Các Bé Đang Tìm Nhà</h2>
        <p className="text-lg text-foreground/70">Những người bạn nhỏ đáng yêu đang chờ bạn đón về</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row justify-between items-center gap-6 mb-10"
      >
        {/* Categories */}
        <div className="flex flex-wrap gap-3">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-bold transition-all ${
                activeCategory === cat 
                  ? "bg-secondary text-foreground shadow-md scale-105" 
                  : "bg-white dark:bg-surface border border-border text-foreground hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <input 
            type="text" 
            placeholder="Tìm kiếm thú cưng..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 pl-12 rounded-full border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 shadow-sm"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
          </svg>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div layout className="min-h-[400px]">
      {filteredPets.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-surface rounded-3xl">
          <div className="text-4xl mb-4">😿</div>
          <h3 className="text-2xl font-bold mb-2">Không tìm thấy thú cưng</h3>
          <p className="text-gray-500">Thử tìm với từ khóa khác hoặc chọn danh mục khác nhé.</p>
        </div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
        >
          {filteredPets.map((pet, index) => (
            <motion.div 
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              key={pet.id} 
              className="bg-white dark:bg-surface rounded-3xl overflow-hidden shadow-sm border border-border/50 hover:shadow-2xl transition-shadow duration-300 group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image 
                  src={pet.image} 
                  alt={pet.name} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white/90 dark:bg-surface/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full text-primary shadow-sm">
                  {pet.age}
                </div>
              </div>
              
              <div className="p-6">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{pet.breed}</div>
                <h3 className="text-2xl font-bold mb-2">{pet.name}</h3>
                <p className="text-sm text-foreground/70 line-clamp-2 mb-4 h-10">
                  {pet.description}
                </p>
                
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xl font-bold text-primary">{pet.price.toLocaleString("vi-VN")} đ</span>
                  <button 
                    onClick={() => addToCart(pet)}
                    className="w-10 h-10 rounded-full bg-accent hover:bg-primary text-foreground hover:text-white flex items-center justify-center transition-colors shadow-sm"
                    title="Thêm vào giỏ hàng"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
      </motion.div>
    </section>
  );
}
