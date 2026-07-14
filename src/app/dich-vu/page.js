"use client";

import { motion } from "framer-motion";
import { Scissors, Hotel, HeartPulse, Truck } from "lucide-react";

const services = [
  {
    icon: <Scissors className="w-10 h-10 text-primary" />,
    title: "Spa & Cắt Tỉa",
    desc: "Làm đẹp cho thú cưng với các combo tắm gội, massage và tạo kiểu lông chuyên nghiệp nhất. Đảm bảo bé cưng luôn thơm tho và lộng lẫy."
  },
  {
    icon: <Hotel className="w-10 h-10 text-secondary" />,
    title: "Khách Sạn Thú Cưng",
    desc: "Trông giữ thú cưng khi bạn đi vắng. Phòng ốc sạch sẽ, có điều hòa 24/7 và chế độ ăn uống chuẩn khoa học."
  },
  {
    icon: <HeartPulse className="w-10 h-10 text-red-400" />,
    title: "Khám Sức Khỏe",
    desc: "Đội ngũ bác sĩ thú y giàu kinh nghiệm, xét nghiệm và tiêm phòng đầy đủ các bệnh lý phổ biến."
  }
];

export default function ServicesPage() {
  return (
    <main className="flex-grow pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header section */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-16"
            >
              <h1 className="text-5xl font-extrabold text-foreground mb-6">Dịch Vụ & <span className="text-primary">Chính Sách</span></h1>
              <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
                Chúng tôi không chỉ cung cấp thú cưng mà còn mang đến hệ sinh thái chăm sóc toàn diện nhất.
              </p>
            </motion.div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
              {services.map((svc, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-surface p-8 rounded-3xl shadow-sm border border-border/50 text-center flex flex-col items-center"
                >
                  <div className="w-20 h-20 bg-gray-50 dark:bg-background rounded-full flex items-center justify-center mb-6">
                    {svc.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{svc.title}</h3>
                  <p className="text-foreground/70 leading-relaxed">{svc.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Policies Section */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-primary/5 rounded-[3rem] p-8 md:p-16 border border-primary/20 flex flex-col md:flex-row gap-12 items-center"
            >
              <div className="flex-1">
                <h2 className="text-4xl font-bold mb-8">Cam kết của PetShop</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-white dark:bg-surface p-3 rounded-full shadow-sm text-primary">
                      <HeartPulse className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Bảo hành sức khỏe 365 ngày</h4>
                      <p className="text-foreground/70">Cam kết bảo hành tất cả các bệnh truyền nhiễm nguy hiểm. Hoàn tiền 100% nếu có vấn đề về gen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-white dark:bg-surface p-3 rounded-full shadow-sm text-primary">
                      <Truck className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Vận chuyển an toàn toàn quốc</h4>
                      <p className="text-foreground/70">Sử dụng lồng chuyên dụng, có nhân viên chăm sóc đi kèm trên các chuyến bay hoặc xe khách đường dài.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-96 rounded-3xl overflow-hidden shadow-xl">
                <img src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800&auto=format&fit=crop" className="w-full h-full object-cover" alt="Chăm sóc chó" />
              </div>
            </motion.div>

          </div>
    </main>
  );
}
