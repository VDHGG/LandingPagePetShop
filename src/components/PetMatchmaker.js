"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import petsData from "../data/pets.json";
import { useCart } from "../context/CartContext";

const questions = [
  {
    id: 1,
    text: "Không gian sống của bạn thế nào?",
    options: [
      { text: "Chung cư bé bé xinh xinh", value: { space: "apartment" } },
      { text: "Nhà đất rộng rãi có sân", value: { space: "house" } }
    ]
  },
  {
    id: 2,
    text: "Mỗi ngày bạn rảnh rỗi thế nào?",
    options: [
      { text: "Bận ngập đầu, đi làm suốt", value: { activity: "low" } },
      { text: "Khá rảnh, muốn có người chơi cùng", value: { activity: "high" } },
      { text: "Bình thường", value: { activity: "medium" } }
    ]
  }
];

export default function PetMatchmaker() {
  const [step, setStep] = useState(0); // 0: intro, 1..q.length: questions, end: result
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const { addToCart } = useCart();

  const handleStart = () => setStep(1);

  const handleAnswer = (val) => {
    const newAnswers = { ...answers, ...val };
    setAnswers(newAnswers);

    if (step < questions.length) {
      setStep(step + 1);
    } else {
      // Tính toán kết quả
      const match = petsData.find(p => 
        (p.space_needed === newAnswers.space || newAnswers.space === "house") && // nhà rộng nuôi gì cũng được
        (p.activity_level === newAnswers.activity || newAnswers.activity === "medium")
      ) || petsData[0]; // fallback
      
      setResult(match);
      setStep(questions.length + 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto">
      <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/20 shadow-inner relative overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/30 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative z-10 min-h-[300px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div
                key="intro"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="max-w-xl"
              >
                <div className="text-6xl mb-6 animate-bounce">💖</div>
                <h2 className="text-4xl font-extrabold mb-4">Bé nào sinh ra dành cho bạn?</h2>
                <p className="text-lg text-foreground/70 mb-8">
                  Chỉ với 2 câu hỏi ngắn, chúng mình sẽ tìm ra "định mệnh" hoàn hảo nhất cho phong cách sống của bạn!
                </p>
                <button 
                  onClick={handleStart}
                  className="px-10 py-4 bg-primary hover:bg-primary-hover text-white rounded-full font-bold text-xl shadow-lg transition-transform active:scale-95"
                >
                  Khám Phá Ngay
                </button>
              </motion.div>
            )}

            {step > 0 && step <= questions.length && (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="w-full max-w-2xl"
              >
                <div className="text-sm font-bold text-primary mb-4 uppercase tracking-widest">
                  Câu hỏi {step} / {questions.length}
                </div>
                <h3 className="text-3xl font-bold mb-10 leading-relaxed">
                  {questions[step - 1].text}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {questions[step - 1].options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleAnswer(opt.value)}
                      className="p-6 bg-white dark:bg-surface border-2 border-transparent hover:border-primary rounded-2xl shadow-sm hover:shadow-md transition-all font-bold text-lg"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step > questions.length && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-3xl bg-white dark:bg-surface p-8 rounded-[2rem] shadow-2xl flex flex-col md:flex-row gap-8 items-center text-left"
              >
                <div className="w-48 h-48 relative rounded-full overflow-hidden border-4 border-primary shrink-0">
                  <Image src={result.image} alt={result.name} fill className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-bold text-secondary uppercase mb-2">Định mệnh của bạn đây rồi!</div>
                  <h3 className="text-3xl font-bold mb-2">{result.name} <span className="text-xl text-foreground/50 font-normal">({result.breed})</span></h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed text-lg">{result.description}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    <button 
                      onClick={() => addToCart(result)}
                      className="px-8 py-3 bg-primary hover:bg-primary-hover text-white rounded-full font-bold shadow-md transition-transform active:scale-95 flex items-center gap-2"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0M9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0"/>
                      </svg>
                      Đón Bé Ngay
                    </button>
                    <button 
                      onClick={handleReset}
                      className="px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full font-bold transition-colors"
                    >
                      Chơi Lại
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
