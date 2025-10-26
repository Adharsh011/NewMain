import BannerCarousel from "../components/home/BannerCarousel";
import CategoryCarousel from "../components/home/CategoryCarousel";
import TrendingProducts from "../components/home/TrendingProducts";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
      {/* Banners */}
      <BannerCarousel />

      {/* About / Intro */}
      <section className="py-10 text-center">
        <h2 className="text-3xl font-semibold text-blue-700 mb-3">
          Welcome to Buddies Buy
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover a world of electronics, fashion, and lifestyle products —
          all from trusted vendors and verified brands.
        </p>
      </section>

      {/* Category Sections */}
      <CategoryCarousel category="Electronics" />
      <CategoryCarousel category="Clothing" />

      {/* Trending */}
      <TrendingProducts />
    </div>
  );
}
