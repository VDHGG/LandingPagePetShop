import petsData from "../data/pets.json";
import Hero from "../components/Hero";
import PetMatchmaker from "../components/PetMatchmaker";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <main className="flex-grow pt-20">
          <Hero />
          <PetMatchmaker />
          
          <div id="products" className="bg-white dark:bg-background">
            <ProductList pets={petsData} />
          </div>

          {/* Testimonial / Social Proof feature */}
          <section className="py-16 px-4 bg-accent/20">
            <div className="max-w-7xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8 text-foreground">Hơn 5000+ Khách Hàng Hài Lòng</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1,2,3].map((i) => (
                  <div key={i} className="bg-white dark:bg-surface p-6 rounded-3xl shadow-sm">
                    <div className="flex justify-center text-yellow-400 mb-4">⭐⭐⭐⭐⭐</div>
                    <p className="text-foreground/80 italic mb-4">"Bé cún về nhà rất ngoan và khỏe mạnh, được nhân viên tư vấn cực kỳ nhiệt tình luôn!"</p>
                    <p className="font-bold">- Nguyễn Văn A</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
    </main>
  );
}
