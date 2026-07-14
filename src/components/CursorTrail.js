"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CursorTrail() {
  const [trails, setTrails] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Giới hạn tần suất sinh dấu chân (cứ mỗi 50px di chuyển hoặc 100ms)
      const now = Date.now();
      const lastTrail = trails[trails.length - 1];
      
      if (!lastTrail || now - lastTrail.id > 50) {
        setTrails(prev => {
          const newTrails = [...prev, { x: e.clientX, y: e.clientY, id: now }];
          // Giới hạn số lượng dấu chân hiển thị cùng lúc để không giật lag
          if (newTrails.length > 20) {
            newTrails.shift();
          }
          return newTrails;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [trails]);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <AnimatePresence>
        {trails.map(trail => (
          <motion.div
            key={trail.id}
            initial={{ opacity: 0.8, scale: 0.5 }}
            animate={{ opacity: 0, scale: 1.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute text-primary text-xl"
            style={{ left: trail.x - 10, top: trail.y - 10 }}
          >
            🐾
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
